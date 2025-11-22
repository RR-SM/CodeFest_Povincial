import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "./contexts/ThemeContext";

export default function CompareProjects() {
  const { theme } = useTheme();
  const router = useRouter();

  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);

  const projects = [
    {
      id: 1,
      name: "Kathmandu-Terai Fast Track",
      budget: "₹211.93B",
      spent: "₹8.07B",
physical: 43.6,
      financial: 44.72,
      duration: "6 years",
      status: "On Track",
    },
    {
      id: 2,
      name: "Melamchi Water Supply",
      budget: "$464M",
      spent: "$340M+",
      physical: 100,
      financial: 74,
      duration: "23 years",
      status: "Completed",
    },
    {
      id: 3,
      name: "Pokhara International Airport",
      budget: "$215.96M",
      spent: "₹26.5B",
      physical: 100,
      financial: 53.2,
      duration: "6 years",
      status: "Completed",
    },
  ];

  const toggleProject = (id: number) => {
    if (selectedProjects.includes(id)) {
      setSelectedProjects(selectedProjects.filter(p => p !== id));
    } else if (selectedProjects.length < 3) {
      setSelectedProjects([...selectedProjects, id]);
    }
  };

  const selectedProjectsData = projects.filter(p => selectedProjects.includes(p.id));

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <LinearGradient
        colors={["#7C3AED", "#A855F7", "#C084FC"]}
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
              Compare Projects
            </Text>
            <Text style={{ fontSize: 16, color: "#F3E8FF", fontWeight: "500" }}>
              Select up to 3 projects to compare
            </Text>
          </View>
          <View style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius: 16,
            padding: 12,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.2)"
          }}>
            <Ionicons name="git-compare" size={28} color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Project Selection */}
        <Text style={{ fontSize: 18, fontWeight: "700", color: theme.colors.text, marginBottom: 16 }}>
          Select Projects ({selectedProjects.length}/3)
        </Text>

        {projects.map((project) => (
          <TouchableOpacity
            key={project.id}
            onPress={() => toggleProject(project.id)}
            style={{
              backgroundColor: selectedProjects.includes(project.id) ? "#7C3AED15" : theme.colors.card,
              borderRadius: 16,
              padding: 16,
              marginBottom: 12,
              borderWidth: 2,
              borderColor: selectedProjects.includes(project.id) ? "#7C3AED" : theme.colors.border,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: theme.colors.text, marginBottom: 4 }}>
                  {project.name}
                </Text>
                <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                  Budget: {project.budget} • Progress: {project.physical}%
                </Text>
              </View>
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: selectedProjects.includes(project.id) ? "#7C3AED" : theme.colors.border,
                backgroundColor: selectedProjects.includes(project.id) ? "#7C3AED" : "transparent",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {selectedProjects.includes(project.id) && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Comparison Table */}
        {selectedProjectsData.length >= 2 && (
          <>
            <Text style={{ fontSize: 18, fontWeight: "700", color: theme.colors.text, marginTop: 24, marginBottom: 16 }}>
              Comparison
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                {/* Header Row */}
                <View style={{ flexDirection: "row", marginBottom: 12 }}>
                  <View style={{ width: 120, paddingRight: 12 }}>
                    <Text style={{ fontSize: 14, fontWeight: "700", color: theme.colors.text }}>Metric</Text>
                  </View>
                  {selectedProjectsData.map((project) => (
                    <View key={project.id} style={{ width: 140, paddingHorizontal: 8 }}>
                      <Text style={{ fontSize: 12, fontWeight: "700", color: theme.colors.text }} numberOfLines={2}>
                        {project.name}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Data Rows */}
                {[
                  { label: "Budget", key: "budget" },
                  { label: "Spent", key: "spent" },
                  { label: "Physical Progress", key: "physical", suffix: "%" },
                  { label: "Financial Progress", key: "financial", suffix: "%" },
                  { label: "Duration", key: "duration" },
                  { label: "Status", key: "status" },
                ].map((row, index) => (
                  <View
                    key={row.key}
                    style={{
                      flexDirection: "row",
                      backgroundColor: index % 2 === 0 ? theme.colors.surface : theme.colors.card,
                      paddingVertical: 12,
                      borderRadius: 8,
                      marginBottom: 4,
                    }}
                  >
                    <View style={{ width: 120, paddingRight: 12, justifyContent: "center" }}>
                      <Text style={{ fontSize: 13, fontWeight: "600", color: theme.colors.textSecondary }}>
                        {row.label}
                      </Text>
                    </View>
                    {selectedProjectsData.map((project) => (
                      <View key={project.id} style={{ width: 140, paddingHorizontal: 8, justifyContent: "center" }}>
                        <Text style={{ fontSize: 13, fontWeight: "600", color: theme.colors.text }}>
                          {project[row.key as keyof typeof project]}{row.suffix || ""}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* Visual Comparison */}
            <Text style={{ fontSize: 18, fontWeight: "700", color: theme.colors.text, marginTop: 32, marginBottom: 16 }}>
              Progress Comparison
            </Text>

            {selectedProjectsData.map((project) => (
              <View key={project.id} style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: theme.colors.text, marginBottom: 8 }}>
                  {project.name}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                  <Text style={{ fontSize: 12, color: theme.colors.textSecondary, width: 80 }}>Physical</Text>
                  <View style={{ flex: 1, height: 8, backgroundColor: theme.colors.border, borderRadius: 4, overflow: "hidden" }}>
                    <View style={{
                      height: "100%",
                      width: `${project.physical}%`,
                      backgroundColor: "#10B981",
                      borderRadius: 4,
                    }} />
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: "700", color: "#10B981", marginLeft: 8, width: 40, textAlign: "right" }}>
                    {project.physical}%
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 12, color: theme.colors.textSecondary, width: 80 }}>Financial</Text>
                  <View style={{ flex: 1, height: 8, backgroundColor: theme.colors.border, borderRadius: 4, overflow: "hidden" }}>
                    <View style={{
                      height: "100%",
                      width: `${project.financial}%`,
                      backgroundColor: "#F59E0B",
                      borderRadius: 4,
                    }} />
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: "700", color: "#F59E0B", marginLeft: 8, width: 40, textAlign: "right" }}>
                    {project.financial}%
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}

        {selectedProjectsData.length < 2 && (
          <View style={{
            backgroundColor: theme.colors.surface,
            borderRadius: 16,
            padding: 32,
            alignItems: "center",
            marginTop: 24,
          }}>
            <Ionicons name="git-compare-outline" size={48} color={theme.colors.textSecondary} style={{ marginBottom: 16 }} />
            <Text style={{ fontSize: 16, fontWeight: "600", color: theme.colors.text, marginBottom: 8, textAlign: "center" }}>
              Select at least 2 projects
            </Text>
            <Text style={{ fontSize: 14, color: theme.colors.textSecondary, textAlign: "center" }}>
              Choose projects from the list above to see a detailed comparison
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
