import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "./contexts/ThemeContext";

export default function LegalFramework() {
  const { theme } = useTheme();
  const router = useRouter();

  const frameworks = [
    {
      title: "Right to Information Act, 2007",
      year: "2064 BS",
      icon: "document-text",
      color: "#3B82F6",
      description: "Guarantees citizens' right to access information held by public bodies, promoting transparency and accountability in governance.",
      keyPoints: [
        "Citizens' right to request information from public bodies",
        "Mandatory disclosure of government information",
        "Time-bound response mechanism (15 days)",
        "Appeals process for denied requests"
      ],
      link: "https://www.lawcommission.gov.np"
    },
    {
      title: "Nepal Open Data Policy, 2072",
      year: "2015 AD",
      icon: "cloud-upload",
      color: "#10B981",
      description: "Framework for making government data publicly available in open, machine-readable formats to enhance transparency and citizen participation.",
      keyPoints: [
        "Open by default principle for government data",
        "Machine-readable data formats",
        "Free access to public datasets",
        "Regular data updates and maintenance"
      ],
      link: "https://www.moha.gov.np"
    },
    {
      title: "Public Procurement Act, 2063",
      year: "2007 BS",
      icon: "receipt",
      color: "#F59E0B",
      description: "Regulates government procurement processes ensuring transparency, competition, and value for money in public spending.",
      keyPoints: [
        "Competitive bidding requirements",
        "Transparent tender processes",
        "Public disclosure of contracts",
        "Anti-corruption measures"
      ],
      link: "https://www.ppmo.gov.np"
    },
    {
      title: "Good Governance Act, 2064",
      year: "2008 BS",
      icon: "shield-checkmark",
      color: "#8B5CF6",
      description: "Establishes principles and mechanisms for good governance, accountability, and transparency in public administration.",
      keyPoints: [
        "Code of conduct for public officials",
        "Accountability mechanisms",
        "Citizen charter requirements",
        "Grievance redressal systems"
      ],
      link: "https://www.lawcommission.gov.np"
    },
    {
      title: "Local Government Operation Act, 2074",
      year: "2017 BS",
      icon: "business",
      color: "#EF4444",
      description: "Defines the structure, functions, and financial management of local governments, promoting decentralized governance.",
      keyPoints: [
        "Local government autonomy",
        "Budget transparency requirements",
        "Public participation mechanisms",
        "Performance monitoring systems"
      ],
      link: "https://www.mofaga.gov.np"
    },
    {
      title: "Constitution of Nepal, 2072",
      year: "2015 BS",
      icon: "book",
      color: "#EC4899",
      description: "Supreme law guaranteeing fundamental rights including right to information and participation in governance.",
      keyPoints: [
        "Right to information (Article 27)",
        "Right to participate in governance",
        "Transparency as constitutional principle",
        "Accountability of public officials"
      ],
      link: "https://www.lawcommission.gov.np"
    }
  ];

  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      alert("Unable to open link");
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <LinearGradient
        colors={["#7C3AED", "#8B5CF6", "#A855F7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 60,
          paddingBottom: 24,
          paddingHorizontal: 24,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          shadowColor: "#7C3AED",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          <Text style={{ color: "#FFFFFF", fontSize: 16, marginLeft: 8 }}>Back</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 32, fontWeight: "800", color: "#FFFFFF", marginBottom: 8 }}>
              Legal Framework
            </Text>
            <Text style={{ fontSize: 16, color: "#E9D5FF", fontWeight: "500" }}>
              Policies & Acts Governing Transparency
            </Text>
          </View>
          <View style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius: 16,
            padding: 12,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.2)"
          }}>
            <Ionicons name="library" size={28} color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Introduction */}
        <View style={{
          backgroundColor: theme.colors.card,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: theme.isDark ? 0.3 : 0.08,
          shadowRadius: 12,
          elevation: 4,
        }}>
          <Text style={{ fontSize: 16, color: theme.colors.text, lineHeight: 24, marginBottom: 12 }}>
            This portal operates under Nepal's legal framework for transparency, accountability, and citizen participation in governance.
          </Text>
          <Text style={{ fontSize: 14, color: theme.colors.textSecondary, lineHeight: 22 }}>
            The following acts and policies mandate public disclosure of government information and ensure your right to access data about public spending and projects.
          </Text>
        </View>

        {/* Framework Cards */}
        {frameworks.map((framework, index) => (
          <View
            key={index}
            style={{
              backgroundColor: theme.colors.card,
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: theme.isDark ? 0.3 : 0.08,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            {/* Header */}
            <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 16 }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: framework.color + "15",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Ionicons name={framework.icon as any} size={24} color={framework.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: "700", color: theme.colors.text, marginBottom: 4 }}>
                  {framework.title}
                </Text>
                <Text style={{ fontSize: 13, color: theme.colors.textSecondary }}>
                  {framework.year}
                </Text>
              </View>
            </View>

            {/* Description */}
            <Text style={{ fontSize: 14, color: theme.colors.text, lineHeight: 22, marginBottom: 16 }}>
              {framework.description}
            </Text>

            {/* Key Points */}
            <Text style={{ fontSize: 14, fontWeight: "600", color: theme.colors.text, marginBottom: 12 }}>
              Key Provisions:
            </Text>
            {framework.keyPoints.map((point, idx) => (
              <View key={idx} style={{ flexDirection: "row", marginBottom: 8 }}>
                <View style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: framework.color,
                  marginTop: 6,
                  marginRight: 10,
                }} />
                <Text style={{ flex: 1, fontSize: 13, color: theme.colors.textSecondary, lineHeight: 20 }}>
                  {point}
                </Text>
              </View>
            ))}

            {/* Learn More Button */}
            <TouchableOpacity
              onPress={() => openLink(framework.link)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: framework.color + "15",
                borderRadius: 12,
                paddingVertical: 12,
                marginTop: 16,
              }}
            >
              <Ionicons name="open-outline" size={18} color={framework.color} />
              <Text style={{ fontSize: 14, fontWeight: "600", color: framework.color, marginLeft: 8 }}>
                Learn More
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Footer Note */}
        <View style={{
          backgroundColor: theme.colors.surface,
          borderRadius: 12,
          padding: 16,
          borderLeftWidth: 4,
          borderLeftColor: "#3B82F6",
        }}>
          <Text style={{ fontSize: 13, color: theme.colors.textSecondary, lineHeight: 20 }}>
            <Text style={{ fontWeight: "600", color: theme.colors.text }}>Note: </Text>
            This portal is committed to upholding these legal frameworks and ensuring your constitutional right to information and transparent governance.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
