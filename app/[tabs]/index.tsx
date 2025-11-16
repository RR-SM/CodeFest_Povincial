import { Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import "../globals.css";

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/bg.png")}
        style={{
          flex: 1,
          paddingTop: 100,
        }}
        resizeMode="cover"
      >
        {/* Overlay for better text readability */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        />

        {/* Content */}
        <View
          style={{
            zIndex: 1,
            paddingHorizontal: 20,
            alignItems: "center",
            maxWidth: 600,
          }}
        >
          {/* Title */}
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: "#FFFFFF",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Making Nepal's{" "}
            <Text style={{ color: "#4A90E2" }}>Public</Text>
            {"\n"}
            <Text style={{ color: "#E23D69" }}>Spending</Text> Transparent
          </Text>

          {/* Subtitle */}
          <Text
            style={{
              fontSize: 16,
              color: "#E0E0E0",
              textAlign: "center",
              marginBottom: 30,
              lineHeight: 24,
            }}
          >
            Track budgets, monitor tenders, follow projects, and verify
            documents with AI and blockchain technology
          </Text>

          {/* Search Bar */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              backgroundColor: "#FFFFFF",
              borderRadius: 8,
              overflow: "hidden",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <TextInput
              placeholder="Search budgets, tenders, or projects..."
              placeholderTextColor="#999999"
              style={{
                flex: 1,
                paddingVertical: 16,
                paddingHorizontal: 10,
                fontSize: 16,
                color: "#333333",
              }}
            />
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#1E6FD9",
                paddingHorizontal: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="search" size={20} color="#FFFFFF" />
              <Text
                style={{
                  display: "flex",
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: "600",
                  marginLeft: 8,
                }}
              >
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
