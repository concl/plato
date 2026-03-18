import { Platform } from "react-native";

const DEFAULT_LOCAL_API_BASE_URL =
    Platform.OS === "android" ? "http://10.0.2.2:8000" : "http://localhost:8000";

export const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_BASE_URL?.trim() || DEFAULT_LOCAL_API_BASE_URL;

export const CHAT_ENDPOINT = `${API_BASE_URL}/api/v1/chat`;
