import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
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
  image: string;
  onPress: () => void;
}

type Project = Omit<ProjectCardProps, "onPress"> & { id: number };

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
  image,
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
        borderRadius: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 6,
      }}
    >
      <ImageBackground
        source={{ uri: image }}
        imageStyle={{ borderRadius: 20 }}
        style={{
          overflow: "hidden",
          borderRadius: 20,
        }}
      >
        <LinearGradient
          colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0.75)", "#FFFFFF"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={{ padding: 20 }}
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
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default function Projects() {
  const router = useRouter();

  const projects = useMemo<Project[]>(
    () => [
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
        Department: "The Nepali Army",
        image: "https://republicaimg.nagariknewscdn.com/shared/web/uploads/media/z8syEGP59L1KkOGpeBwbEdVToIiCO00Utel0nUlM.jpg",
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
        Department: "Melamchi Water Supply Development Board (MWSDB)",
        image:
          "https://imgs.search.brave.com/3Nyj3La35t5x8QDqtV-AfGAPSuuA04Lh_vdNCSohVeg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMtYXBpLmthdGht/YW5kdXBvc3QuY29t/L3RodW1iLnBocD9z/cmM9aHR0cHM6Ly9h/c3NldHMtY2RuLmth/dGhtYW5kdXBvc3Qu/Y29tL3VwbG9hZHMv/c291cmNlL25ld3Mv/MjAyMi9uZXdzL21l/bGFtY2hpLTE2NzA2/Mzk0MTUucG5nJnc9/OTAwJmhlaWdodD02/MDE",
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
        Department: "Civil Aviation Authority of Nepal (CAAN) ",
        image: "https://imgs.search.brave.com/yJENKCqV8QX7dHaXZe7A-VSyJXIYC8LMkCi8jSh9IqY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aS1zY21wLmNvbS9z/aXRlcy9kZWZhdWx0/L2ZpbGVzL3N0eWxl/cy8xMDIweDY4MC9w/dWJsaWMvZDgvaW1h/Z2VzL2NhbnZhcy8y/MDI1LzAzLzA3L2Vk/MzA4Y2Q3LTA0ZWQt/NGIzZC1iNzlmLTM5/MGUyNDljY2Y5OV82/MWI2ZjQ3OS5qcGc_/aXRvaz1veTBIZFg3/byZ2PTE3NDEzNDY3/NDg",
      },
      {
        id: 4,
        title: "Koshi River Bridge Modernization",
        estimatedBudget: "Rs. 15 Billion",
        allocatedBudget: "Rs. 9.2 Billion",
        spentBudget: "Rs. 4.7 Billion",
        physicalProgress: 61,
        financialProgress: 49,
        startDate: "Jan 2022",
        endDate: "Dec 2025",
        Department: "Department of Roads",
        image: "https://imgs.search.brave.com/sZN7wfeTS5S-6r36_yIREXQlVXSNHomqxrP8JABZtiQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/czN3YWFzLmdvdi5p/bi9zMzY3ZjdmYjg3/M2VhZjI5NTI2YTEx/YTliN2FjMzNiZmFj/L3VwbG9hZHMvYmZp/X3RodW1iLzIwMTgw/MzEyNTQtb2x3OTg4/bHdiYmZha256dnAx/MzFhMmI2MTJ2cDZh/NG54N3VxZzBuaDU2/LmpwZw",
      },
    ],
    []
  );

  const [searchQuery, setSearchQuery] = useState("");
  const lastScrollOffset = useRef(0);

  const filteredProjects = useMemo(() => {
    const value = searchQuery.trim().toLowerCase();
    if (!value) return projects;
    return projects.filter((project) => project.title.toLowerCase().includes(value));
  }, [projects, searchQuery]);

  const suggestions = useMemo(() => {
    const value = searchQuery.trim().toLowerCase();
    if (!value) return [];
    return projects.filter((project) => project.title.toLowerCase().includes(value)).slice(0, 5);
  }, [projects, searchQuery]);

  const handleProjectPress = (project: Project) => {
    router.push({
      pathname: "/project-details",
      params: { ...project },
    });
  };

  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    lastScrollOffset.current = currentOffset;
    // Search bar always visible - removed hide logic
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F7FA" }}>
      {/* Modern Header with Gradient */}
      <LinearGradient
        colors={["#1E3A8A", "#3B82F6", "#60A5FA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 60,
          paddingBottom: 24,
          paddingHorizontal: 24,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          shadowColor: "#1E3A8A",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 8,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 36, fontWeight: "800", color: "#FFFFFF", letterSpacing: -0.5 }}>
              Projects
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
              <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: "#60A5FA", marginRight: 8 }} />
              <Text style={{ fontSize: 14, color: "#E0E7FF", fontWeight: "500" }}>
                {filteredProjects.length} Active Infrastructure Projects
              </Text>
            </View>
          </View>
          <View style={{ 
            backgroundColor: "rgba(255,255,255,0.2)", 
            borderRadius: 16, 
            padding: 12,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.3)"
          }}>
            <Ionicons name="construct" size={28} color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>

      {/* Floating Search Bar */}
      <View style={{ 
          paddingHorizontal: 24, 
          marginTop: -32,
          marginBottom: 20,
          zIndex: 100,
          position: "relative"
        }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              paddingHorizontal: 18,
              paddingVertical: 16,
              elevation: 12,
              shadowColor: "#1E3A8A",
              shadowOpacity: 0.2,
              shadowRadius: 24,
              shadowOffset: { width: 0, height: 10 },
              borderWidth: 1.5,
              borderColor: "rgba(59, 130, 246, 0.15)",
            }}
          >
            <View style={{
              backgroundColor: "#EFF6FF",
              borderRadius: 12,
              padding: 8,
              marginRight: 12
            }}>
              <Ionicons name="search" size={20} color="#3B82F6" />
            </View>
            <TextInput
              placeholder="Search infrastructure projects..."
              placeholderTextColor="#94A3B8"
              style={{
                flex: 1,
                color: "#0F172A",
                fontSize: 15,
                fontWeight: "500",
                paddingVertical: 4,
              }}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                onPress={() => setSearchQuery("")}
                style={{
                  backgroundColor: "#F1F5F9",
                  borderRadius: 10,
                  padding: 6,
                  marginLeft: 8
                }}
              >
                <Ionicons name="close" size={18} color="#64748B" />
              </TouchableOpacity>
            )}
          </View>

          {/* Search Suggestions Dropdown */}
          {searchQuery.length > 0 && (
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                marginTop: 12,
                paddingVertical: 8,
                elevation: 10,
                shadowColor: "#1E3A8A",
                shadowOpacity: 0.15,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 6 },
                borderWidth: 1,
                borderColor: "#E2E8F0",
                maxHeight: 300,
              }}
            >
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={suggestion.id}
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      flexDirection: "row",
                      alignItems: "center",
                      borderBottomWidth: index === suggestions.length - 1 ? 0 : 1,
                      borderBottomColor: "#F1F5F9",
                    }}
                    onPress={() => setSearchQuery(suggestion.title)}
                  >
                    <View style={{
                      backgroundColor: "#EFF6FF",
                      borderRadius: 8,
                      padding: 6,
                      marginRight: 12
                    }}>
                      <Ionicons name="document-text" size={16} color="#3B82F6" />
                    </View>
                    <Text style={{ color: "#0F172A", fontSize: 14, fontWeight: "500", flex: 1 }}>
                      {suggestion.title}
                    </Text>
                    <Ionicons name="arrow-forward" size={16} color="#94A3B8" />
                  </TouchableOpacity>
                ))
              ) : (
                <View style={{ paddingVertical: 16, paddingHorizontal: 16, alignItems: "center" }}>
                  <Ionicons name="search-outline" size={32} color="#CBD5E1" style={{ marginBottom: 8 }} />
                  <Text style={{ color: "#64748B", fontSize: 14, fontWeight: "500" }}>
                    No matching projects found
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>

      {/* Project Cards */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 0, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
        removeClippedSubviews={true}
      >
        {filteredProjects.map((project) => (
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
            image={project.image}
            onPress={() => handleProjectPress(project)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
