import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import "../globals.css";

interface ProjectCardProps {
  title: string;
  estimatedBudget: string;
  allocatedBudget: string;
  spentBudget: string;
  physicalProgress: number;
  financialProgress: number;
  startDate: string;
  Department: string;
  endDate: string;
  onPress: () => void;
}

const ProjectCard = ({
  title,
  estimatedBudget,
  allocatedBudget,
  spentBudget,
  physicalProgress,
  financialProgress,
  startDate,
  endDate,
  Department,
  onPress,
}: ProjectCardProps) => {
  const getPhysicalColor = (value: number) => {
    if (value >= 75) return "#4CAF50";
    if (value >= 50) return "#FF9800";
    return "#E23D69";
  };


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
          <Text style={{ fontSize: 13, color: "#666", marginLeft: 6 }}>Budget</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>Estimated</Text>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#1E6FD9" }}>
              {estimatedBudget}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>Allocated</Text>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#2E7D32" }}>
              {allocatedBudget}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>Spent</Text>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#E23D69" }}>
              {spentBudget}
            </Text>
          </View>
        </View>
      </View>

      {/* Timeline Section */}
      <View style={{ marginBottom: 16 }}>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
          <View>
            <Text style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>Start Date</Text>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#333" }}>{startDate}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>End Date</Text>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#333" }}>{endDate}</Text>
          </View>
        </View>
      </View>

      {/* Physical Progress */}
      <View style={{ marginBottom: 8 }}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}
        >
          <Text style={{ fontSize: 13, color: "#666" }}>Physical Progress</Text>
          <Text style={{ fontSize: 16, fontWeight: "700", color: getPhysicalColor(physicalProgress) }}>
            {physicalProgress}%
          </Text>
        </View>
        <View style={{ height: 8, backgroundColor: "#E0E0E0", borderRadius: 4, overflow: "hidden", marginBottom: 8 }}>
          <View
            style={{
              height: "100%",
              width: `${physicalProgress}%`,
              backgroundColor: getPhysicalColor(physicalProgress),
              borderRadius: 4,
            }}
          />
        </View>
      </View>

      {/* Financial Progress */}


      {/* View Details */}
      <View
        style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", marginTop: 12 }}
      >
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
      estimatedBudget: "Rs. 211.93 Billion",
      allocatedBudget: "Rs. 22.55 Billion",
      spentBudget: "Rs. 8.07 Billion",
      physicalProgress: 43.6,
      financialProgress: 44.72,
      startDate: "May 14, 2021",
      endDate: "April 2027",
      Department: "The Nepali Army"
    },
    {
      id: 2,
      title: "Melamchi Water Supply Project",
      estimatedBudget: "$464 Million",
      allocatedBudget: "Rs. 5.81 Billion",
      spentBudget: "Rs. 5.0 Billion +",
      physicalProgress: 100,
      financialProgress: 74,
      startDate: "Nov 1998",
      endDate: "April 2021",
      Department: "Melamchi Water Supply Development Board (MWSDB)"
    },
    {
      id: 3,
      title: "Pokhara International Airport",
      estimatedBudget: "US$180 Million",
      allocatedBudget: "US$215.96 Million",
      spentBudget: "Rs 26.5 Billion.",
      physicalProgress: 100,
      financialProgress: 53.2,
      startDate: "Apr 2016",
      endDate: "March 2022",
      Department: "Civil Aviation Authority of Nepal (CAAN) "
    },
    {
      id: 4,
      title: "Pokhara International Airport",
      estimatedBudget: "US$180 Million",
      allocatedBudget: "US$215.96 Million",
      spentBudget: "Rs 26.5 Billion.",
      physicalProgress: 100,
      financialProgress: 53.2,
      startDate: "Apr 2016",
      endDate: "March 2022",
      Department: "Civil Aviation Authority of Nepal (CAAN) "
    },
    {
      id: 5,
      title: "Pokhara International Airport",
      estimatedBudget: "US$180 Million",
      allocatedBudget: "US$215.96 Million",
      spentBudget: "Rs 26.5 Billion.",
      physicalProgress: 100,
      financialProgress: 53.2,
      startDate: "Apr 2016",
      endDate: "March 2022",
      Department: "Civil Aviation Authority of Nepal (CAAN) "
    },
    {
      id: 6,
      title: "Pokhara International Airport",
      estimatedBudget: "US$180 Million",
      allocatedBudget: "US$215.96 Million",
      spentBudget: "Rs 26.5 Billion.",
      physicalProgress: 100,
      financialProgress: 53.2,
      startDate: "Apr 2016",
      endDate: "March 2022",
      Department: "Civil Aviation Authority of Nepal (CAAN) "
    },
    {
      id: 7,
      title: "Pokhara International Airport",
      estimatedBudget: "US$180 Million",
      allocatedBudget: "US$215.96 Million",
      spentBudget: "Rs 26.5 Billion.",
      physicalProgress: 100,
      financialProgress: 53.2,
      startDate: "Apr 2016",
      endDate: "March 2022",
      Department: "Civil Aviation Authority of Nepal (CAAN) "
    },
    {
      id: 8,
      title: "Pokhara International Airport",
      estimatedBudget: "US$180 Million",
      allocatedBudget: "US$215.96 Million",
      spentBudget: "Rs 26.5 Billion.",
      physicalProgress: 100,
      financialProgress: 53.2,
      startDate: "Apr 2016",
      endDate: "March 2022",
      Department: "Civil Aviation Authority of Nepal (CAAN) "
    },
  ];

  const handleProjectPress = (project: typeof projects[0]) => {
    router.push({
      pathname: "/project-details",
      params: { ...project },
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
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#FFFFFF", marginBottom: 8 }}>
          Projects
        </Text>
        <Text style={{ fontSize: 15, color: "#B0B0B0" }}>
          Track progress of major infrastructure projects
        </Text>
      </View>

      {/* Project Cards */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 100 }}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            estimatedBudget={project.estimatedBudget}
            allocatedBudget={project.allocatedBudget}
            spentBudget={project.spentBudget}
            physicalProgress={project.physicalProgress}
            financialProgress={project.financialProgress}
            startDate={project.startDate}
            endDate={project.endDate}
            Department={project.Department}
            onPress={() => handleProjectPress(project)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
