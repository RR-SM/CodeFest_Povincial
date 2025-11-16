import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import "../globals.css";

interface ProjectCardProps {
  title: string;
  budget: string;
  progress: number;
  startDate: string;
  endDate: string;
  onPress: () => void;
}

const ProjectCard = ({ title, budget, progress, startDate, endDate, onPress }: ProjectCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      {/* Project Title */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#1a1a1a",
          marginBottom: 16,
        }}
      >
        {title}
      </Text>

      {/* Budget Section */}
      <View style={{ marginBottom: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
          <Ionicons name="cash-outline" size={18} color="#1E6FD9" />
          <Text style={{ fontSize: 13, color: "#666", marginLeft: 6 }}>
            Budget Allocated
          </Text>
        </View>
        <Text style={{ fontSize: 22, fontWeight: "700", color: "#1E6FD9" }}>
          {budget}
        </Text>
      </View>

      {/* Timeline Section */}
      <View style={{ marginBottom: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <Ionicons name="calendar-outline" size={18} color="#666" />
          <Text style={{ fontSize: 13, color: "#666", marginLeft: 6 }}>
            Project Timeline
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
          <View>
            <Text style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>Start Date</Text>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#333" }}>
              {startDate}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>End Date</Text>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#333" }}>
              {endDate}
            </Text>
          </View>
        </View>
      </View>

      {/* Progress Section */}
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <Text style={{ fontSize: 13, color: "#666" }}>Progress</Text>
          <Text style={{ fontSize: 16, fontWeight: "700", color: progress >= 75 ? "#2E7D32" : progress >= 50 ? "#F57C00" : "#E23D69" }}>
            {progress}%
          </Text>
        </View>

        {/* Progress Bar */}
        <View
          style={{
            height: 8,
            backgroundColor: "#E0E0E0",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              height: "100%",
              width: `${progress}%`,
              backgroundColor: progress >= 75 ? "#4CAF50" : progress >= 50 ? "#FF9800" : "#E23D69",
              borderRadius: 4,
            }}
          />
        </View>
      </View>

      {/* View Details Arrow */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", marginTop: 12 }}>
        <Text style={{ fontSize: 14, color: "#1E6FD9", fontWeight: "600", marginRight: 4 }}>
          View Details
        </Text>
        <Ionicons name="arrow-forward" size={18} color="#1E6FD9" />
      </View>
    </TouchableOpacity>
  );
};

export default function Projects() {
  const router = useRouter();

  const projects = [
    {
      id: 1,
      title: "Kathmandu-Terai Fast Track",
      budget: "NPR 140 Billion",
      progress: 68,
      startDate: "Jan 2021",
      endDate: "Dec 2025",
    },
    {
      id: 2,
      title: "Melamchi Water Supply Project",
      budget: "NPR 55 Billion",
      progress: 85,
      startDate: "Mar 2020",
      endDate: "Jun 2024",
    },
    {
      id: 3,
      title: "Pokhara International Airport",
      budget: "NPR 23 Billion",
      progress: 100,
      startDate: "Apr 2019",
      endDate: "Jan 2023",
    },
    {
      id: 4,
      title: "Upper Tamakoshi Hydropower",
      budget: "NPR 52 Billion",
      progress: 100,
      startDate: "Feb 2011",
      endDate: "Jul 2021",
    },
    {
      id: 5,
      title: "Gautam Buddha International Airport",
      budget: "NPR 19 Billion",
      progress: 45,
      startDate: "Sep 2019",
      endDate: "Mar 2025",
    },
    {
      id: 6,
      title: "Budhigandaki Hydropower Project",
      budget: "NPR 120 Billion",
      progress: 25,
      startDate: "Jan 2022",
      endDate: "Dec 2028",
    },
  ];

  const handleProjectPress = (project: { id: any; title: any; budget: any; progress: any; startDate: any; endDate: any; }) => {
    router.push({
      pathname: "/project-details",
      params: {
        id: project.id,
        title: project.title,
        budget: project.budget,
        progress: project.progress,
        startDate: project.startDate,
        endDate: project.endDate,
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: "#0F0D23",
          paddingTop: 60,
          paddingBottom: 24,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#FFFFFF",
            marginBottom: 8,
          }}
        >
          Projects
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#B0B0B0",
          }}
        >
          Track progress of major infrastructure projects
        </Text>
      </View>

      {/* Project Cards */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 100,
        }}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            budget={project.budget}
            progress={project.progress}
            startDate={project.startDate}
            endDate={project.endDate}
            onPress={() => handleProjectPress(project)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
