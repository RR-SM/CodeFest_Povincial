import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useTheme } from "./contexts/ThemeContext";
import { useUser } from "./contexts/UserContext";

import "./globals.css";

type Comment = {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
};

export default function ProjectDetails() {
  const { theme } = useTheme();
  const { isLoggedIn } = useUser();
  const router = useRouter();
  const params = useLocalSearchParams();

  const {
    title,
    estimatedBudget,
    allocatedBudget,
    spentBudget,
    physicalProgress,
    financialProgress,
    startDate,
    endDate,
    Department,
  } = params;

  const physicalNum = parseFloat(Array.isArray(physicalProgress) ? physicalProgress[0] : physicalProgress);
  const financialNum = parseFloat(Array.isArray(financialProgress) ? financialProgress[0] : financialProgress);

  // Combined progress data for chart
  const progressData = [
    { month: "Jan", physical: 10, financial: 8 },
    { month: "Feb", physical: 18, financial: 15 },
    { month: "Mar", physical: 25, financial: 20 },
    { month: "Apr", physical: 32, financial: 30 },
    { month: "May", physical: 40, financial: 35 },
    { month: "Jun", physical: 48, financial: 41 },
    { month: "Jul", physical: 55, financial: 48 },
    { month: "Aug", physical: 62, financial: 55 },
    { month: "Sep", physical: physicalNum, financial: financialNum },
  ];

  const getPhysicalColor = (value: number) => {
    if (value >= 75) return "#2E7D32";
    if (value >= 50) return "#F57C00";
    return "#E23D69";
  };

  const getFinancialColor = (value: number) => {
    if (value >= 75) return "#6A1B9A";
    if (value >= 50) return "#8E24AA";
    return "#CE93D8";
  };

  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Suman T.",
      text: "Impressive progress so far. Hoping they maintain transparency on the remaining budget!",
      timestamp: new Date(),
    },
    {
      id: "2",
      author: "Riya P.",
      text: "Visited the site last month – the local workforce seemed motivated.",
      timestamp: new Date(),
    },
  ]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isPicking, setIsPicking] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<'comment' | 'photo' | null>(null);

  const handleAddComment = () => {
    if (!isLoggedIn) {
      setPendingAction('comment');
      setShowAuthModal(true);
      return;
    }
    const trimmed = commentInput.trim();
    if (!trimmed) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      author: "You",
      text: trimmed,
      timestamp: new Date(),
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentInput("");
  };

  const proceedWithComment = () => {
    const trimmed = commentInput.trim();
    if (!trimmed) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      author: "Guest User",
      text: trimmed,
      timestamp: new Date(),
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentInput("");
  };

  const handlePickPhoto = async () => {
    if (!isLoggedIn) {
      setPendingAction('photo');
      setShowAuthModal(true);
      return;
    }
    await pickPhoto();
  };

  const pickPhoto = async () => {
    if (isPicking) return;
    setIsPicking(true);
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        alert("Media library permission is required to upload photos.");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.6,
        allowsMultipleSelection: false,
      });
      if (!result.canceled && result.assets?.length) {
        setPhotos((prev) => [result.assets[0].uri, ...prev]);
      }
    } finally {
      setIsPicking(false);
    }
  };

  const handleMaybeLater = () => {
    setShowAuthModal(false);
    // Execute the pending action
    if (pendingAction === 'comment') {
      proceedWithComment();
    } else if (pendingAction === 'photo') {
      pickPhoto();
    }
    setPendingAction(null);
  };

  const readableDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);

  const CommentCard = ({ comment }: { comment: Comment }) => (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: 14,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}
    >
      <Text style={{ fontWeight: "600", color: theme.colors.text, marginBottom: 4 }}>{comment.author}</Text>
      <Text style={{ color: theme.colors.textSecondary, lineHeight: 20, marginBottom: 6 }}>{comment.text}</Text>
      <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>{readableDate(comment.timestamp)}</Text>
    </View>
  );

  const PhotoGrid = () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {photos.map((uri) => (
        <Image
          key={uri}
          source={{ uri }}
          style={{
            width: "30%",
            aspectRatio: 1,
            borderRadius: 12,
            marginRight: 10,
            marginBottom: 10,
            backgroundColor: theme.colors.border,
          }}
        />
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: theme.colors.primary,
          paddingTop: 60,
          paddingBottom: 24,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          <Text style={{ color: "#FFFFFF", fontSize: 16, marginLeft: 8 }}>Back to Projects</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#FFFFFF" }}>{title}</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 24, paddingBottom: 100 }}
        nestedScrollEnabled={true}
        removeClippedSubviews={true}
        scrollEventThrottle={16}
      >
        {/* Main Info Card */}
        <View
          style={{
            backgroundColor: theme.colors.card,
            borderRadius: 16,
            padding: 15,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: theme.isDark ? 0.3 : 0.08,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          {/* Budget Section */}
          <View style={{ marginBottom: 20 }}>
  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
    <Ionicons name="cash-outline" size={20} color="#1E6FD9" />
    <Text style={{ fontSize: 14, color: theme.colors.textSecondary, marginLeft: 8 }}>Budget</Text>
  </View>

  <View style={{ flexDirection: "row", marginTop: 8, justifyContent: "space-between" }}>
    <View style={{ alignItems: "center", flex: 1 }}>
      <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginBottom: 2 }}>Estimated</Text>
      <Text style={{ fontSize: 16, fontWeight: "600", color: "#1E6FD9" }}>
        {estimatedBudget}
      </Text>
    </View>

    <View style={{ alignItems: "center", flex: 1 }}>
      <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginBottom: 2 }}>Allocated</Text>
      <Text style={{ fontSize: 16, fontWeight: "600", color: "#2E7D32" }}>
        {allocatedBudget}
      </Text>
    </View>

    <View style={{ alignItems: "center", flex: 1 }}>
      <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginBottom: 2 }}>Spent</Text>
      <Text style={{ fontSize: 16, fontWeight: "600", color: "#E23D69" }}>
        {spentBudget}
      </Text>
    </View>
  </View>
</View>

          {/* Timeline */}
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <Ionicons name="calendar-outline" size={20} color="#666" />
              <Text style={{ fontSize: 14, color: theme.colors.textSecondary, marginLeft: 8 }}>Project Timeline</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginBottom: 4 }}>Start Date</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: theme.colors.text }}>{startDate}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginBottom: 4 }}>End Date</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: theme.colors.text }}>{endDate}</Text>
              </View>
            </View>
          </View>

          {/* Progress Bars */}
          <View>
            {/* Physical */}
            <View style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                <Text style={{ fontSize: 14, color: theme.colors.textSecondary }}>Physical Progress</Text>
                <Text style={{ fontSize: 16, fontWeight: "700", color: getPhysicalColor(physicalNum) }}>
                  {physicalNum}%
                </Text>
              </View>
              <View style={{ height: 8, backgroundColor: theme.colors.border, borderRadius: 4, overflow: "hidden" }}>
                <View
                  style={{
                    width: `${physicalNum}%`,
                    height: "100%",
                    backgroundColor: getPhysicalColor(physicalNum),
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>

            {/* Financial */}
            <View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                <Text style={{ fontSize: 14, color: theme.colors.textSecondary }}>Financial Progress</Text>
                <Text style={{ fontSize: 16, fontWeight: "700", color: getFinancialColor(financialNum) }}>
                  {financialNum}%
                </Text>
              </View>
              <View style={{ height: 8, backgroundColor: theme.colors.border, borderRadius: 4, overflow: "hidden" }}>
                <View
                  style={{
                    width: `${financialNum}%`,
                    height: "100%",
                    backgroundColor: getFinancialColor(financialNum),
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Progress Chart */}
        <View
          style={{
            backgroundColor: theme.colors.card,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: theme.isDark ? 0.3 : 0.08,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <Ionicons name="stats-chart" size={20} color={theme.colors.primary} />
            <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.colors.text, marginLeft: 8 }}>
              Progress Over Time
            </Text>
          </View>
          <LineChart
            data={{
              labels: progressData.map((item) => item.month),
              datasets: [
                { data: progressData.map((item) => item.physical), color: () => "#1E6FD9", strokeWidth: 3 },
                { data: progressData.map((item) => item.financial), color: () => "#F57C00", strokeWidth: 3 },
              ],
              legend: ["Physical Progress", "Financial Progress"],
            }}
            width={Dimensions.get("window").width - 60}
            height={260}
            yAxisSuffix="%"
            chartConfig={{
              backgroundColor: theme.colors.card,
              backgroundGradientFrom: theme.colors.card,
              backgroundGradientTo: theme.colors.card,
              decimalPlaces: 0,
              color: (opacity = 1) => theme.isDark ? `rgba(248, 250, 252, ${opacity})` : `rgba(0,0,0,${opacity})`,
              labelColor: (opacity = 1) => theme.isDark ? `rgba(248, 250, 252, ${opacity})` : `rgba(0,0,0,${opacity})`,
              propsForDots: { r: "5" },
            }}
            bezier
            style={{ borderRadius: 16, marginLeft: -8 }}
          />
        </View>

        {/* Additional Details */}
        <View
          style={{
            backgroundColor: theme.colors.card,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: theme.isDark ? 0.3 : 0.08,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <Ionicons name="information-circle" size={20} color={theme.colors.primary} />
            <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.colors.text, marginLeft: 8 }}>
              Additional Details
            </Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: theme.colors.textSecondary, marginBottom: 4 }}>Project Type</Text>
            <Text style={{ fontSize: 15, color: theme.colors.text, fontWeight: "500" }}>Infrastructure Development</Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: theme.colors.textSecondary, marginBottom: 4 }}>Implementing Agency</Text>
            <Text style={{ fontSize: 15, color: theme.colors.text, fontWeight: "500" }}>
              {Department}
            </Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: theme.colors.textSecondary, marginBottom: 4 }}>Status</Text>
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 12,
                backgroundColor: physicalNum === 100 ?
                  (theme.isDark ? theme.colors.success + "20" : "#E8F5E9") :
                  (theme.isDark ? theme.colors.warning + "20" : "#FFF3E0"),
                alignSelf: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: physicalNum === 100 ?
                    (theme.isDark ? theme.colors.success : "#2E7D32") :
                    (theme.isDark ? theme.colors.warning : "#F57C00"),
                }}
              >
                {physicalNum === 100 ? "Completed" : "In Progress"}
              </Text>
            </View>
          </View>

          <View>
            <Text style={{ fontSize: 13, color: theme.colors.textSecondary, marginBottom: 4 }}>Description</Text>
            <Text style={{ fontSize: 15, color: theme.colors.text, lineHeight: 22 }}>
              This project aims to improve transportation infrastructure and connectivity,
              facilitating economic growth and regional development. The project includes
              construction of roads, bridges, and related facilities.
            </Text>
          </View>
        </View>

        {/* Community Comments */}
        <View
          style={{
            backgroundColor: theme.colors.card,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: theme.isDark ? 0.3 : 0.08,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <Ionicons name="chatbubble-ellipses" size={20} color={theme.colors.primary} />
            <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.colors.text, marginLeft: 8 }}>
              Community Feedback
            </Text>
          </View>

          <TextInput
            placeholder="Share updates, concerns, or appreciation…"
            placeholderTextColor={theme.colors.textSecondary}
            multiline
            value={commentInput}
            onChangeText={setCommentInput}
            onFocus={() => {
              if (!isLoggedIn) {
                setShowAuthModal(true);
              }
            }}
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 14,
              padding: 12,
              fontSize: 14,
              color: theme.colors.text,
              marginBottom: 10,
              minHeight: 80,
              textAlignVertical: "top",
            }}
          />

          <TouchableOpacity
            onPress={handleAddComment}
            disabled={!commentInput.trim().length}
            style={{
              alignSelf: "flex-end",
              backgroundColor: commentInput.trim() ? theme.colors.primary : theme.colors.textSecondary,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 999,
            }}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>Post Comment</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 18 }}>
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </View>
        </View>

        {/* Photo Uploads */}
        <View
          style={{
            backgroundColor: theme.colors.card,
            borderRadius: 16,
            padding: 20,
            marginBottom: 32,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: theme.isDark ? 0.3 : 0.08,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <Ionicons name="camera" size={20} color={theme.colors.primary} />
            <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.colors.text, marginLeft: 8 }}>
              Field Photos
            </Text>
          </View>

          <TouchableOpacity
            onPress={handlePickPhoto}
            disabled={isPicking}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: theme.colors.primary + "40",
              borderStyle: "dashed",
              borderRadius: 16,
              paddingVertical: 18,
              marginBottom: 16,
              backgroundColor: theme.isDark ? theme.colors.surface : "#F8FAFF",
            }}
          >
            <Ionicons name="cloud-upload" size={22} color="#1E6FD9" />
            <Text style={{ marginLeft: 10, color: "#1E6FD9", fontWeight: "600" }}>
              {isPicking ? "Opening gallery…" : "Upload progress photo"}
            </Text>
          </TouchableOpacity>

          {photos.length === 0 ? (
            <Text style={{ color: "#6B7280", fontSize: 14 }}>
              No community photos yet. Be the first to share on-site progress snaps.
            </Text>
          ) : (
            <PhotoGrid />
          )}
        </View>
      </ScrollView>

      {/* Authentication Modal */}
      <Modal
        visible={showAuthModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAuthModal(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.6)",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPress={() => setShowAuthModal(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: theme.colors.card,
              borderRadius: 24,
              padding: 32,
              width: "85%",
              maxWidth: 400,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 10,
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={{ alignItems: "center", marginBottom: 24 }}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: theme.colors.primary + "15",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <Ionicons name="lock-closed" size={32} color={theme.colors.primary} />
              </View>
              <Text style={{ fontSize: 24, fontWeight: "700", color: theme.colors.text, marginBottom: 8 }}>
                Sign In Required
              </Text>
              <Text style={{ fontSize: 14, color: theme.colors.textSecondary, textAlign: "center", lineHeight: 20 }}>
                Create an account or sign in to continue and participate in community discussions
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: "center",
                marginBottom: 12,
              }}
              onPress={() => {
                setShowAuthModal(false);
                router.push("/signup");
              }}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}>
                Create Account
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: "center",
                marginBottom: 12,
                borderWidth: 1,
                borderColor: theme.colors.border,
              }}
              onPress={() => {
                setShowAuthModal(false);
                router.push("/signin");
              }}
            >
              <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "600" }}>
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                paddingVertical: 12,
                alignItems: "center",
              }}
              onPress={handleMaybeLater}
            >
              <Text style={{ color: theme.colors.textSecondary, fontSize: 14, fontWeight: "500" }}>
                Maybe Later
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
