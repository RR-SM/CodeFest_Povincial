import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "./contexts/ThemeContext";

export default function TransparencyReports() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'audit' | 'corruption' | 'success'>('all');

  const reports = [
    {
      id: 1,
      title: "Auditor General's Report FY 2079/80",
      category: "audit",
      date: "2023",
      severity: "high",
      icon: "document-text",
      color: "#EF4444",
      summary: "Annual audit revealed ₹12.5 billion in irregular spending across 45 government projects, highlighting procurement irregularities and budget mismanagement.",
      findings: [
        "₹8.2B in procurement violations",
        "23 projects with cost overruns exceeding 50%",
        "Delayed project completion affecting 15 districts",
        "Lack of proper documentation in 67% of reviewed projects"
      ],
      impact: "High Priority - Requires immediate action",
      source: "Office of the Auditor General",
      link: "https://www.oagnep.gov.np"
    },
    {
      id: 2,
      title: "Wide Body Aircraft Procurement Case",
      category: "corruption",
      date: "2022",
      severity: "critical",
      icon: "alert-circle",
      color: "#DC2626",
      summary: "Investigation into Nepal Airlines' wide-body aircraft purchase revealed corruption allegations involving ₹4.3 billion, leading to CIAA investigation.",
      findings: [
        "Alleged commission payments of ₹450M",
        "Procurement process irregularities",
        "Conflict of interest in decision-making",
        "Multiple officials under investigation"
      ],
      impact: "Critical - Legal proceedings ongoing",
      source: "Commission for Investigation of Abuse of Authority (CIAA)",
      link: "https://www.ciaa.gov.np"
    },
    {
      id: 3,
      title: "Melamchi Water Supply Project Audit",
      category: "audit",
      date: "2023",
      severity: "high",
      icon: "water",
      color: "#F59E0B",
      summary: "₹35 billion mega-project faced multiple delays and cost escalations. Audit revealed management issues and contractor disputes.",
      findings: [
        "Project cost increased from ₹25B to ₹35B",
        "15-year delay in completion",
        "Quality concerns in construction",
        "Inadequate risk management"
      ],
      impact: "High - Affecting Kathmandu water supply",
      source: "Ministry of Water Supply",
      link: "https://www.mows.gov.np"
    },
    {
      id: 4,
      title: "COVID-19 Medical Equipment Procurement Scandal",
      category: "corruption",
      date: "2020",
      severity: "critical",
      icon: "medical",
      color: "#DC2626",
      summary: "Irregularities in emergency medical equipment procurement during pandemic, including overpricing and substandard supplies worth ₹2.5 billion.",
      findings: [
        "Equipment purchased at 3-5x market price",
        "Substandard PPE and testing kits",
        "Favoritism in supplier selection",
        "₹800M in questionable transactions"
      ],
      impact: "Critical - Public health compromised",
      source: "CIAA & Parliamentary Committee",
      link: "https://www.ciaa.gov.np"
    },
    {
      id: 5,
      title: "Digital Nepal Framework Implementation Success",
      category: "success",
      date: "2023",
      severity: "positive",
      icon: "checkmark-circle",
      color: "#10B981",
      summary: "Successful implementation of e-governance initiatives reduced corruption in 12 government services, saving citizens ₹1.2B annually in bribes.",
      findings: [
        "92% reduction in processing time",
        "Zero-contact service delivery",
        "₹1.2B saved in informal payments",
        "Citizen satisfaction increased to 87%"
      ],
      impact: "Positive - Model for other services",
      source: "Ministry of Communication and IT",
      link: "https://www.mocit.gov.np"
    },
    {
      id: 6,
      title: "Constituency Development Fund Misuse",
      category: "corruption",
      date: "2022",
      severity: "high",
      icon: "cash",
      color: "#EF4444",
      summary: "Investigation revealed misuse of ₹3.8 billion in constituency development funds by 45 lawmakers, with projects existing only on paper.",
      findings: [
        "67% of projects incomplete or non-existent",
        "₹2.1B unaccounted expenditure",
        "Fake invoices and ghost contractors",
        "45 lawmakers under investigation"
      ],
      impact: "High - Undermines local development",
      source: "CIAA & Local Audit Reports",
      link: "https://www.ciaa.gov.np"
    },
    {
      id: 7,
      title: "Public Procurement Monitoring Portal Launch",
      category: "success",
      date: "2023",
      severity: "positive",
      icon: "eye",
      color: "#10B981",
      summary: "Launch of real-time procurement monitoring system increased transparency, reduced bid-rigging, and saved ₹5.6B in first year.",
      findings: [
        "100% online tender publication",
        "Real-time bid monitoring",
        "₹5.6B saved through competitive bidding",
        "Complaint resolution time reduced by 70%"
      ],
      impact: "Positive - Transforming procurement",
      source: "Public Procurement Monitoring Office",
      link: "https://www.ppmo.gov.np"
    },
    {
      id: 8,
      title: "Bheri-Babai Diversion Project Irregularities",
      category: "audit",
      date: "2023",
      severity: "high",
      icon: "construct",
      color: "#F59E0B",
      summary: "₹18 billion irrigation project audit revealed contractor collusion, substandard work, and environmental violations.",
      findings: [
        "₹4.2B in cost overruns",
        "Substandard construction materials used",
        "Environmental clearance violations",
        "Contractor-official collusion suspected"
      ],
      impact: "High - Project sustainability at risk",
      source: "Auditor General's Office",
      link: "https://www.oagnep.gov.np"
    }
  ];

  const categories = [
    { id: 'all', label: 'All', icon: 'list', count: reports.length },
    { id: 'audit', label: 'Audits', icon: 'document-text', count: reports.filter(r => r.category === 'audit').length },
    { id: 'corruption', label: 'Corruption', icon: 'alert-circle', count: reports.filter(r => r.category === 'corruption').length },
    { id: 'success', label: 'Success', icon: 'checkmark-circle', count: reports.filter(r => r.category === 'success').length },
  ];

  const filteredReports = selectedCategory === 'all'
    ? reports
    : reports.filter(r => r.category === selectedCategory);

  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      alert("Unable to open link");
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <LinearGradient
        colors={["#DC2626", "#EF4444", "#F87171"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 60,
          paddingBottom: 24,
          paddingHorizontal: 24,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          shadowColor: "#DC2626",
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
              Transparency Reports
            </Text>
            <Text style={{ fontSize: 16, color: "#FEE2E2", fontWeight: "500" }}>
              Audit Findings & Accountability Cases
            </Text>
          </View>
          <View style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius: 16,
            padding: 12,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.2)"
          }}>
            <Ionicons name="shield-checkmark" size={28} color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>

      {/* Category Filter - FIXED: reduced margins */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 50, marginTop: 12 }}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 10, alignItems: 'center' }}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => setSelectedCategory(cat.id as any)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: selectedCategory === cat.id ? "#3B82F6" : theme.colors.card,
              paddingHorizontal: 15,
              paddingVertical: 4,
              height: 38,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: selectedCategory === cat.id ? "#3B82F6" : theme.colors.border,
              shadowColor: selectedCategory === cat.id ? "#3B82F6" : "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: selectedCategory === cat.id ? 0.3 : 0.05,
              shadowRadius: 4,
              elevation: selectedCategory === cat.id ? 4 : 2,
            }}
          >
            <View style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: selectedCategory === cat.id ? "rgba(255,255,255,0.2)" : cat.id === "all" ? "#3B82F615" : cat.id === "audit" ? "#F59E0B15" : cat.id === "corruption" ? "#DC262615" : "#10B98115",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 5,
            }}>
              <Ionicons
                name={cat.icon as any}
                size={14}
                color={selectedCategory === cat.id ? "#FFFFFF" : cat.id === "all" ? "#3B82F6" : cat.id === "audit" ? "#F59E0B" : cat.id === "corruption" ? "#DC2626" : "#10B981"}
              />
            </View>
            <Text style={{
              fontSize: 16,
              fontWeight: "600",
              color: selectedCategory === cat.id ? "#FFFFFF" : theme.colors.text
            }}>
              {cat.label}
            </Text>
            <View style={{
              backgroundColor: selectedCategory === cat.id ? "rgba(255,255,255,0.25)" : theme.colors.surface,
              paddingHorizontal: 5,
              paddingVertical: 1,
              borderRadius: 6,
              marginLeft: 5,
            }}>
              <Text style={{
                fontSize: 14,
                fontWeight: "700",
                color: selectedCategory === cat.id ? "#FFFFFF" : theme.colors.textSecondary
              }}>
                {cat.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Main Content ScrollView - FIXED: removed extra top padding */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingTop: 12, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Overview */}
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
          <View style={{
            flex: 1,
            backgroundColor: "#DC262615",
            borderRadius: 12,
            padding: 14,
            borderWidth: 1,
            borderColor: "#DC262625",
          }}>
            <Ionicons name="alert-circle" size={20} color="#DC2626" style={{ marginBottom: 6 }} />
            <Text style={{ fontSize: 20, fontWeight: "800", color: "#DC2626", marginBottom: 2 }}>
              {reports.filter(r => r.category === "corruption").length}
            </Text>
            <Text style={{ fontSize: 12, color: theme.colors.textSecondary, fontWeight: "600" }}>
              Corruption Cases
            </Text>
          </View>
          <View style={{
            flex: 1,
            backgroundColor: "#F59E0B15",
            borderRadius: 12,
            padding: 14,
            borderWidth: 1,
            borderColor: "#F59E0B25",
          }}>
            <Ionicons name="document-text" size={20} color="#F59E0B" style={{ marginBottom: 6 }} />
            <Text style={{ fontSize: 20, fontWeight: "800", color: "#F59E0B", marginBottom: 2 }}>
              {reports.filter(r => r.category === "audit").length}
            </Text>
            <Text style={{ fontSize: 12, color: theme.colors.textSecondary, fontWeight: "600" }}>
              Audit Reports
            </Text>
          </View>
          <View style={{
            flex: 1,
            backgroundColor: "#10B98115",
            borderRadius: 12,
            padding: 14,
            borderWidth: 1,
            borderColor: "#10B98125",
          }}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" style={{ marginBottom: 6 }} />
            <Text style={{ fontSize: 20, fontWeight: "800", color: "#10B981", marginBottom: 2 }}>
              {reports.filter(r => r.category === "success").length}
            </Text>
            <Text style={{ fontSize: 12, color: theme.colors.textSecondary, fontWeight: "600" }}>
              Success Stories
            </Text>
          </View>
        </View>

        {/* Report Cards */}
        {filteredReports.map((report) => (
          <TouchableOpacity
            key={report.id}
            activeOpacity={0.7}
            onPress={() => openLink(report.link)}
            style={{
              backgroundColor: theme.colors.card,
              borderRadius: 20,
              marginBottom: 16,
              overflow: "hidden",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: theme.isDark ? 0.3 : 0.1,
              shadowRadius: 12,
              elevation: 5,
            }}
          >
            {/* Color Header Bar */}
            <LinearGradient
              colors={[report.color, report.color + "CC"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingHorizontal: 18,
                paddingVertical: 14,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: "rgba(255,255,255,0.25)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Ionicons name={report.icon as any} size={18} color="#FFFFFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.9)", fontWeight: "600", marginBottom: 2 }}>
                    {report.category === "audit" ? "AUDIT REPORT" : report.category === "corruption" ? "CORRUPTION CASE" : "SUCCESS STORY"}
                  </Text>
                  <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: "500" }}>
                    {report.date}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.8)" />
            </LinearGradient>

            {/* Content */}
            <View style={{ padding: 18 }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: theme.colors.text, marginBottom: 10, lineHeight: 22 }}>
                {report.title}
              </Text>
              <Text style={{ fontSize: 13, color: theme.colors.textSecondary, lineHeight: 20, marginBottom: 14 }}>
                {report.summary}
              </Text>
              <View style={{
                backgroundColor: theme.colors.surface,
                borderRadius: 12,
                padding: 12,
                marginBottom: 12,
              }}>
                <Text style={{ fontSize: 12, fontWeight: "700", color: theme.colors.text, marginBottom: 8 }}>
                  Key Findings
                </Text>
                {report.findings.slice(0, 2).map((finding, idx) => (
                  <View key={idx} style={{ flexDirection: "row", marginBottom: 5 }}>
                    <Text style={{ color: report.color, marginRight: 6, fontSize: 12 }}>•</Text>
                    <Text style={{ flex: 1, fontSize: 12, color: theme.colors.textSecondary, lineHeight: 18 }}>
                      {finding}
                    </Text>
                  </View>
                ))}
                {report.findings.length > 2 && (
                  <Text style={{ fontSize: 11, color: theme.colors.primary, fontWeight: "600", marginTop: 4 }}>
                    +{report.findings.length - 2} more findings
                  </Text>
                )}
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{
                  backgroundColor: report.color + "15",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 8,
                  flex: 1,
                  marginRight: 10,
                }}>
                  <Text style={{ fontSize: 11, fontWeight: "600", color: report.color }}>
                    {report.impact}
                  </Text>
                </View>
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: theme.colors.primary + "15",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 8,
                }}>
                  <Ionicons name="open-outline" size={14} color={theme.colors.primary} />
                  <Text style={{ fontSize: 11, fontWeight: "600", color: theme.colors.primary, marginLeft: 4 }}>
                    View Report
                  </Text>
                </View>
              </View>
              <Text style={{ fontSize: 10, color: theme.colors.textSecondary, marginTop: 10, fontStyle: "italic" }}>
                Source: {report.source}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Disclaimer */}
        <View style={{
          backgroundColor: theme.colors.card,
          borderRadius: 16,
          padding: 16,
          borderLeftWidth: 4,
          borderLeftColor: "#3B82F6",
          marginTop: 8,
        }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <Ionicons name="information-circle" size={18} color="#3B82F6" style={{ marginRight: 10, marginTop: 2 }} />
            <Text style={{ flex: 1, fontSize: 12, color: theme.colors.textSecondary, lineHeight: 18 }}>
              <Text style={{ fontWeight: "700", color: theme.colors.text }}>Transparency Notice: </Text>
              All information is compiled from official government sources, audit reports, and public records to promote accountability in governance.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
