import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

const TabIcon = ({ focused, children, label }: { focused: boolean; children: React.ReactNode; label: string }) => {
  if (focused) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LinearGradient
          colors={["#6366F1", "#8B5CF6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: 28,
            shadowColor: "#6366F1",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          {children}
        </LinearGradient>
        <Text
          style={{
            fontSize: 7,
            fontWeight: "700",
            color: "#6366F1",
            marginTop: 4,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {label}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          marginHorizontal: 0,
          marginBottom: 0,
          paddingTop: 8,
          paddingBottom: 20,
          height: 65,
          position: "absolute",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 20,
          paddingHorizontal: 16,
        },
      }}
    >
      <Tabs.Screen
        name="budget"
        options={{
          title: "Budget",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Budget">
              <MaterialCommunityIcons name="cash-multiple" size={24} color={focused ? "#FFFFFF" : "#9CA3AF"} />
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
            <TabIcon focused={focused} label="Projects">
              <Ionicons name="construct" size={24} color={focused ? "#FFFFFF" : "#9CA3AF"} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Home">
              <Ionicons name="home" size={24} color={focused ? "#FFFFFF" : "#9CA3AF"} />
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
            <TabIcon focused={focused} label="Tenders">
              <Ionicons name="document-text" size={24} color={focused ? "#FFFFFF" : "#9CA3AF"} />
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
            <TabIcon focused={focused} label="Settings">
              <Ionicons name="settings" size={24} color={focused ? "#FFFFFF" : "#9CA3AF"} />
            </TabIcon>
          ),
        }}
      />
    </Tabs>
  );
}
