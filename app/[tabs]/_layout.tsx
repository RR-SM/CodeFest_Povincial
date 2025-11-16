import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          top: 5,
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 30,
          height: 56,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons focused={focused} name="home" title="Home" size={20} color={focused ? "#FFFFFF" : "#8E8E93"} />
          ),
        }}
      />


      <Tabs.Screen
        name="budget"
        options={{
          title: "Budgets",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5 focused={focused} name="money-bill" size={20} color={focused ? "#FFFFFF" : "#8E8E93"} />

          ),
        }}
      />

      <Tabs.Screen
        name="projects"
        options={{
          title: "Projects",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign color={focused ? "#FFFFFF" : "#8E8E93"} size={20} name="fund-projection-screen" />
          ),
        }}
      />

      <Tabs.Screen
        name="tenders"
        options={{
          title: "Tenders",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome focused={focused} name="user" size={20} color={focused ? "#FFFFFF" : "#8E8E93"} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons focused={focused} name="settings" title="Settings" size={20}  color={focused ? "#FFFFFF" : "#8E8E93"} />
          ),
        }}
      />
    </Tabs>
  );
}
