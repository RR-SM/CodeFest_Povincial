import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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
  const [showSearchBar, setShowSearchBar] = useState(true);
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
    const diff = currentOffset - lastScrollOffset.current;

    if (searchQuery.length > 0 || currentOffset < 30) {
      if (!showSearchBar) setShowSearchBar(true);
    } else if (diff > 10 && currentOffset > 30) {
      if (showSearchBar) setShowSearchBar(false);
    } else if (diff < -10) {
      if (!showSearchBar) setShowSearchBar(true);
    }

    lastScrollOffset.current = currentOffset;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: "#0F0D23",
          paddingTop: 60,
          paddingBottom: 28,
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

      {showSearchBar && (
        <View style={{ paddingHorizontal: 20, paddingBottom: 12, paddingTop: 16, backgroundColor: "#F8F9FA" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 14,
              paddingHorizontal: 16,
              paddingVertical: 10,
              elevation: 3,
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
            }}
          >
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              placeholder="Search projects by name..."
              placeholderTextColor="#9CA3AF"
              style={{
                flex: 1,
                marginLeft: 10,
                color: "#111827",
                fontSize: 15,
                paddingVertical: 6,
              }}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>

          {searchQuery.length > 0 && (
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                marginTop: 10,
                paddingVertical: 8,
                paddingHorizontal: 12,
                elevation: 2,
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
              }}
            >
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={suggestion.id}
                    style={{
                      paddingVertical: 6,
                      borderBottomWidth: index === suggestions.length - 1 ? 0 : StyleSheet.hairlineWidth,
                      borderBottomColor: "#E5E7EB",
                    }}
                    onPress={() => setSearchQuery(suggestion.title)}
                  >
                    <Text style={{ color: "#0F172A", fontSize: 14 }}>{suggestion.title}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={{ color: "#6B7280", fontSize: 13 }}>No matching projects yet.</Text>
              )}
            </View>
          )}
        </View>
      )}

      {/* Project Cards */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: showSearchBar ? 0 : 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
