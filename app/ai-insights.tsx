import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "./contexts/ThemeContext";

export default function AIInsights() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"anomalies" | "predictions" | "recommendations">("anomalies");

  const anomalies = [
    {
      id: 1,
      project: "Kathmandu-Terai Fast Track",
      type: "Budget Overrun Risk",
      severity: "high",
      confidence: 87,
      description: "AI detected spending pattern indicates 45% probability of budget overrun by Q3 2025",
      indicators: [
        "Spending rate 23% above planned trajectory",
        "Similar projects historically exceeded budget by 38%",
        "Current burn rate: ₹1.2B/month vs planned ₹850M/month"
      ],
      recommendation: "Implement stricter budget controls and review contractor payments",
      color: "#EF4444"
    },
    {
      id: 2,
      project: "Pokhara Lekhnath Water Supply",
      type: "Delay Pattern Detected",
      severity: "medium",
      confidence: 72,
      description: "Project showing signs of systematic delays similar to 12 other water projects",
      indicators: [
        "Physical progress 18% behind schedule",
        "Weather-adjusted timeline shows structural delays",
        "Contractor performance below industry average"
      ],
      recommendation: "Consider contractor performance review and timeline adjustment",
      color: "#F59E0B"
    },
    {
      id: 3,
      project: "Upper Karnali Hydropower",
      type: "Procurement Irregularity",
      severity: "critical",
      confidence: 91,
      description: "Unusual procurement patterns detected in equipment purchases",
      indicators: [
        "3 purchases from same vendor at 34% above market rate",
        "Vendor registration date coincides with tender announcement",
        "Similar pattern flagged in 2 corruption cases"
      ],
      recommendation: "Immediate audit recommended - Forward to CIAA",
      color: "#DC2626"
    },
    {
      id: 4,
      project: "Jiri to Ridi Road Expansion",
      type: "Quality Concern",
      severity: "medium",
      confidence: 68,
      description: "Material quality indicators below standard based on citizen reports",
      indicators: [
        "15 citizen reports of substandard materials",
        "Contractor has 2 previous quality violations",
        "Lab test results 12% below specification"
      ],
      recommendation: "Schedule independent quality inspection",
      color: "#F59E0B"
    }
  ];

  const predictions = [
    {
      project: "Melamchi Water Supply Phase 2",
      prediction: "Completion Date",
      current: "Dec 2025",
      predicted: "June 2026",
      confidence: 78,
      reason: "Based on current progress rate and historical data from similar projects"
    },
    {
      project: "Tribhuvan Airport Expansion",
      prediction: "Final Budget",
      current: "₹23.5B",
      predicted: "₹28.2B",
      confidence: 82,
      reason: "Material cost inflation and typical cost overrun patterns in airport projects"
    },
    {
      project: "Chitwan-Bharatpur Railway",
      prediction: "Risk Assessment",
      current: "Medium Risk",
      predicted: "High Risk",
      confidence: 75,
      reason: "Land acquisition delays and contractor capacity concerns"
    }
  ];

  const recommendations = [
    {
      title: "Implement Real-time Monitoring",
      projects: 8,
      impact: "High",
      description: "Deploy IoT sensors on high-risk projects for continuous quality monitoring",
      savings: "Potential ₹2.5B in prevented overruns"
    },
    {
      title: "Contractor Performance Database",
      projects: 15,
      impact: "High",
      description: "Create ML-powered contractor rating system based on historical performance",
      savings: "Reduce delays by estimated 25%"
    },
    {
      title: "Automated Compliance Checks",
      projects: 24,
      impact: "Medium",
      description: "Use AI to automatically flag procurement irregularities in real-time",
      savings: "Prevent estimated ₹1.8B in corruption"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "critical": return "#DC2626";
      case "high": return "#EF4444";
      case "medium": return "#F59E0B";
      default: return "#10B981";
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <LinearGradient
        colors={["#6366F1", "#8B5CF6", "#A855F7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 60,
          paddingBottom: 24,
          paddingHorizontal: 24,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
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
              AI Insights
            </Text>
            <Text style={{ fontSize: 16, color: "#EDE9FE", fontWeight: "500" }}>
              Powered by Machine Learning
            </Text>
          </View>
          <View style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius: 16,
            padding: 12,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.2)"
          }}>
            <Ionicons name="sparkles" size={28} color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 50, marginTop: 12 }}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 10, alignItems: 'center' }}
      >
        {[
          { id: "anomalies", label: "Anomalies", icon: "warning", count: anomalies.length },
          { id: "predictions", label: "Predictions", icon: "trending-up", count: predictions.length },
          { id: "recommendations", label: "Recommendations", icon: "bulb", count: recommendations.length },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setSelectedTab(tab.id as any)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: selectedTab === tab.id ? "#6366F1" : theme.colors.card,
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: selectedTab === tab.id ? "#6366F1" : theme.colors.border,
            }}
          >
            <Ionicons
              name={tab.icon as any}
              size={16}
              color={selectedTab === tab.id ? "#FFFFFF" : "#6366F1"}
            />
            <Text style={{
              marginLeft: 6,
              fontSize: 15,
              fontWeight: "600",
              color: selectedTab === tab.id ? "#FFFFFF" : theme.colors.text
            }}>
              {tab.label}
            </Text>
            <View style={{
              backgroundColor: selectedTab === tab.id ? "rgba(255,255,255,0.25)" : "#6366F115",
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 8,
              marginLeft: 6,
            }}>
              <Text style={{
                fontSize: 13,
                fontWeight: "700",
                color: selectedTab === tab.id ? "#FFFFFF" : "#6366F1"
              }}>
                {tab.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Anomalies Tab */}
        {selectedTab === "anomalies" && anomalies.map((anomaly) => (
          <View
            key={anomaly.id}
            style={{
              backgroundColor: theme.colors.card,
              borderRadius: 16,
              padding: 18,
              marginBottom: 16,
              borderLeftWidth: 4,
              borderLeftColor: anomaly.color,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            {/* Header */}
            <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 12 }}>
              <View style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: anomaly.color + "15",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}>
                <Ionicons name="warning" size={18} color={anomaly.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: theme.colors.text, marginBottom: 4 }}>
                  {anomaly.type}
                </Text>
                <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                  {anomaly.project}
                </Text>
              </View>
              <View style={{
                backgroundColor: anomaly.color + "15",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 8,
              }}>
                <Text style={{ fontSize: 11, fontWeight: "700", color: anomaly.color }}>
                  {anomaly.confidence}% AI
                </Text>
              </View>
            </View>

            {/* Description */}
            <Text style={{ fontSize: 13, color: theme.colors.text, lineHeight: 20, marginBottom: 12 }}>
              {anomaly.description}
            </Text>

            {/* Indicators */}
            <Text style={{ fontSize: 12, fontWeight: "700", color: theme.colors.text, marginBottom: 8 }}>
              Key Indicators:
            </Text>
            {anomaly.indicators.map((indicator, idx) => (
              <View key={idx} style={{ flexDirection: "row", marginBottom: 6 }}>
                <Text style={{ color: anomaly.color, marginRight: 8, fontSize: 12 }}>•</Text>
                <Text style={{ flex: 1, fontSize: 12, color: theme.colors.textSecondary, lineHeight: 18 }}>
                  {indicator}
                </Text>
              </View>
            ))}

            {/* Recommendation */}
            <View style={{
              backgroundColor: "#EFF6FF",
              borderRadius: 10,
              padding: 12,
              marginTop: 12,
              borderLeftWidth: 3,
              borderLeftColor: "#3B82F6",
            }}>
              <Text style={{ fontSize: 11, fontWeight: "700", color: "#1E40AF", marginBottom: 4 }}>
                AI RECOMMENDATION
              </Text>
              <Text style={{ fontSize: 12, color: "#1E40AF", lineHeight: 18 }}>
                {anomaly.recommendation}
              </Text>
            </View>
          </View>
        ))}

        {/* Predictions Tab */}
        {selectedTab === "predictions" && predictions.map((pred, index) => (
          <View
            key={index}
            style={{
              backgroundColor: theme.colors.card,
              borderRadius: 16,
              padding: 18,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: theme.colors.text, marginBottom: 12 }}>
              {pred.project}
            </Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 11, color: theme.colors.textSecondary, marginBottom: 4 }}>
                  Current {pred.prediction}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "700", color: "#6B7280" }}>
                  {pred.current}
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color="#6366F1" style={{ marginHorizontal: 12, marginTop: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 11, color: theme.colors.textSecondary, marginBottom: 4 }}>
                  AI Predicted
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "700", color: "#6366F1" }}>
                  {pred.predicted}
                </Text>
              </View>
            </View>

            <View style={{
              backgroundColor: "#F3F4F6",
              borderRadius: 10,
              padding: 12,
            }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                <Ionicons name="analytics" size={14} color="#6366F1" />
                <Text style={{ fontSize: 11, fontWeight: "700", color: "#6366F1", marginLeft: 6 }}>
                  {pred.confidence}% CONFIDENCE
                </Text>
              </View>
              <Text style={{ fontSize: 12, color: theme.colors.textSecondary, lineHeight: 18 }}>
                {pred.reason}
              </Text>
            </View>
          </View>
        ))}

        {/* Recommendations Tab */}
        {selectedTab === "recommendations" && recommendations.map((rec, index) => (
          <View
            key={index}
            style={{
              backgroundColor: theme.colors.card,
              borderRadius: 16,
              padding: 18,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 12 }}>
              <View style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: "#10B98115",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}>
                <Ionicons name="bulb" size={18} color="#10B981" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: theme.colors.text, marginBottom: 4 }}>
                  {rec.title}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Text style={{ fontSize: 11, color: theme.colors.textSecondary }}>
                    {rec.projects} projects
                  </Text>
                  <View style={{
                    backgroundColor: rec.impact === "High" ? "#10B98115" : "#F59E0B15",
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 6,
                  }}>
                    <Text style={{
                      fontSize: 10,
                      fontWeight: "700",
                      color: rec.impact === "High" ? "#10B981" : "#F59E0B"
                    }}>
                      {rec.impact} Impact
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <Text style={{ fontSize: 13, color: theme.colors.text, lineHeight: 20, marginBottom: 12 }}>
              {rec.description}
            </Text>

            <View style={{
              backgroundColor: "#ECFDF5",
              borderRadius: 10,
              padding: 12,
            }}>
              <Text style={{ fontSize: 12, fontWeight: "700", color: "#059669" }}>
                💰 {rec.savings}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

