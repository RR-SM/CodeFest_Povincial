import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabIcon = ({ focused, children }: { focused: boolean; children: React.ReactNode }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 72,
        height: 50,
        borderRadius: 50,
        backgroundColor: focused ? "rgba(255, 255, 255, 0.2)" : "transparent",
      }}
    >
      {children}
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          height: 56,
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 15,
          paddingTop: 8,
          marginBottom: 30,
          height: 56,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
          paddingHorizontal: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused}>
              <Ionicons name="home" size={20} color={focused ? "#FFFFFF" : "#8E8E93"} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: "Budgets",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused}>
              <FontAwesome5 name="money-bill" size={20} color={focused ? "#FFFFFF" : "#8E8E93"} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: "Projects",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused}>
              <AntDesign name="fund-projection-screen" size={20} color={focused ? "#FFFFFF" : "#8E8E93"} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="tenders"
        options={{
          title: "Tenders",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused}>
              <FontAwesome name="user" size={20} color={focused ? "#FFFFFF" : "#8E8E93"} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused}>
              <Ionicons name="settings" size={20} color={focused ? "#FFFFFF" : "#8E8E93"} />
            </TabIcon>
          ),
        }}
      />
    </Tabs>
  );
}
