import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import { CHAT_ENDPOINT } from "../../constants/api";

type ChatApiResponse = {
    reply: string;
};

export default function Chat() {
    const [message, setMessage] = useState("");
    const [reply, setReply] = useState("No response yet.");
    const [error, setError] = useState("");
    const [isSending, setIsSending] = useState(false);

    async function sendMessage() {
        const trimmedMessage = message.trim();
        if (!trimmedMessage) {
            setError("Please type a message first.");
            return;
        }

        try {
            setIsSending(true);
            setError("");

            const response = await fetch(CHAT_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: trimmedMessage }),
            });

            if (!response.ok) {
                const rawText = await response.text();
                throw new Error(`HTTP ${response.status}: ${rawText || "Request failed"}`);
            }

            const data = (await response.json()) as ChatApiResponse;
            setReply(data.reply ?? "No reply field found in response.");
            setMessage("");
        } catch (err) {
            const messageText = err instanceof Error ? err.message : "Unknown network error";
            setError(`Failed to send message: ${messageText}`);
        } finally {
            setIsSending(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chat</Text>

            <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
                autoCapitalize="none"
            />

            <Button title={isSending ? "Sending..." : "Send"} onPress={sendMessage} disabled={isSending} />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Text style={styles.replyLabel}>Backend reply:</Text>
            <Text style={styles.replyText}>{reply}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12,
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
    },
    input: {
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    error: {
        color: "#dc2626",
    },
    replyLabel: {
        marginTop: 6,
        fontWeight: "600",
    },
    replyText: {
        fontSize: 16,
    },
});


