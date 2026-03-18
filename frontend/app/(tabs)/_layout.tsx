import { Tabs } from "expo-router";

export default function TabsLayout() {
	return (
		<Tabs
			initialRouteName="home"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen name="index" options={{ href: null }} />
			<Tabs.Screen name="home" options={{ title: "Home" }} />
			<Tabs.Screen name="chat" options={{ title: "Chat" }} />
		</Tabs>
	);
}
