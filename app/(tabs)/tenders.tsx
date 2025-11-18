import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useMemo, useRef, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

const Tenders = () => {
  const tenders = [
    {
      id: 'ring-road',
      title: 'Construction of Kathmandu Ring Road Expansion',
      description: '25km road expansion project with 6-lane highway',
      authority: 'Department of Roads',
      status: 'Awarded',
      budgetDisplay: 'NPR 5.00B',
      contractDisplay: 'NPR 4.80B',
      contractValue: 4.8,
      spentBudget: 'NPR 2.20B',
      biddingCompanies: [
        'Nepal Construction Co.',
        'Himalayan Builders',
        'Everest Infrastructure',
      ],
      winningCompany: 'Nepal Construction Co.',
      deadline: '12/31/2024',
      startDate: '1/15/2024',
      endDate: '12/31/2025',
      physicalProgress: '45',
      financialProgress: '40',
    },
    {
      id: 'mid-hill',
      title: 'Mid-Hill Smart Highway PPP Phase II',
      description: '62km smart highway with adaptive tolling and IoT monitoring',
      authority: 'Infrastructure Investment Board Nepal',
      status: 'Open',
      budgetDisplay: 'NPR 6.10B',
      contractDisplay: 'NPR 4.00B',
      contractValue: 4.0,
      spentBudget: 'NPR 0.65B',
      biddingCompanies: [
        'Himalayan Express JV',
        'Biratnagar Infrastructure',
        'South Asia Mobility',
      ],
      winningCompany: null,
      deadline: '03/30/2025',
      startDate: '4/1/2025',
      endDate: '10/15/2027',
      physicalProgress: '12',
      financialProgress: '8',
    },
    {
      id: 'kathmandu-metro',
      title: 'Kathmandu Valley Metro Feasibility PPP',
      description: '42km elevated metro with smart stations and automated ticketing',
      authority: 'Investment Board Nepal',
      status: 'Planning',
      budgetDisplay: 'NPR 8.40B',
      contractDisplay: 'NPR 1.10B (Phase I)',
      contractValue: 1.1,
      spentBudget: 'NPR 0.18B',
      biddingCompanies: ['TransNepal Metro JV', 'Kathmandu Mobility Group', 'SE Asia Rail Holdings'],
      winningCompany: null,
      deadline: '08/30/2025',
      startDate: '9/1/2025',
      endDate: '12/31/2029',
      physicalProgress: '4',
      financialProgress: '3',
    },
    {
      id: 'karnali-hydro',
      title: 'Upper Karnali Hydropower Project Development',
      description: '300MW hydropower generation facility with dam construction',
      authority: 'Nepal Electricity Authority (NEA)',
      status: 'Open',
      budgetDisplay: 'NPR 18.50B',
      contractDisplay: 'NPR 17.20B',
      contractValue: 17.2,
      spentBudget: 'NPR 3.45B',
      biddingCompanies: [
        'Sinohydro Corporation',
        'Voith Hydro AG',
        'Nepal Hydro Power Ltd',
        'South Asian Energy Solutions',
      ],
      winningCompany: null,
      deadline: '01/15/2025',
      startDate: '3/1/2025',
      endDate: '12/31/2029',
      physicalProgress: '28',
      financialProgress: '18',
    },
    {
      id: 'tribhuvan-expansion',
      title: 'Tribhuvan International Airport Terminal Expansion',
      description: 'New terminal construction and runway extension project',
      authority: 'Civil Aviation Authority of Nepal (CAAN)',
      status: 'Awarded',
      budgetDisplay: 'NPR 8.70B',
      contractDisplay: 'NPR 8.20B',
      contractValue: 8.2,
      spentBudget: 'NPR 4.10B',
      biddingCompanies: [
        'Turkish Airport Operations',
        'GMR Group India',
        'Nepal Airport Services Ltd',
      ],
      winningCompany: 'Turkish Airport Operations',
      deadline: '11/30/2024',
      startDate: '2/15/2024',
      endDate: '6/30/2026',
      physicalProgress: '52',
      financialProgress: '48',
    },
    {
      id: 'pokhara-airport',
      title: 'Pokhara International Airport Development',
      description: 'New international airport with cargo handling facilities',
      authority: 'Civil Aviation Authority of Nepal (CAAN)',
      status: 'Awarded',
      budgetDisplay: 'NPR 12.00B',
      contractDisplay: 'NPR 11.50B',
      contractValue: 11.5,
      spentBudget: 'NPR 6.75B',
      biddingCompanies: [
        'Asian Construction JV',
        'Alpine Engineering',
        'Himalayan Aviation Services',
      ],
      winningCompany: 'Asian Construction JV',
      deadline: '10/31/2024',
      startDate: '1/1/2023',
      endDate: '3/31/2025',
      physicalProgress: '100',
      financialProgress: '53',
    },
    {
      id: 'kukl-supply',
      title: 'Kathmandu Valley Water Supply Improvement Project',
      description: 'Water treatment plant upgrade and distribution network extension',
      authority: 'Kathmandu Upatyaka Khanepani Limited (KUKL)',
      status: 'Open',
      budgetDisplay: 'NPR 15.80B',
      contractDisplay: 'NPR 14.50B',
      contractValue: 14.5,
      spentBudget: 'NPR 2.90B',
      biddingCompanies: [
        'Danfoss Xylem Nepal',
        'Aqua Solutions International',
        'Water Tech Nepal Ltd',
        'Suez Water Technologies',
      ],
      winningCompany: null,
      deadline: '02/20/2025',
      startDate: '4/1/2025',
      endDate: '12/31/2027',
      physicalProgress: '18',
      financialProgress: '12',
    },
    {
      id: 'chitwan-railway',
      title: 'Chitwan-Bharatpur Railway Line Construction',
      description: 'New 34km railway line connecting Chitwan and Bharatpur regions',
      authority: 'Nepal Railways',
      status: 'Awarded',
      budgetDisplay: 'NPR 12.30B',
      contractDisplay: 'NPR 11.80B',
      contractValue: 11.8,
      spentBudget: 'NPR 3.54B',
      biddingCompanies: [
        'Indian Railways Construction Co.',
        'Bombardier Transportation',
        'Rail Nepal Ltd',
      ],
      winningCompany: 'Indian Railways Construction Co.',
      deadline: '12/15/2024',
      startDate: '3/1/2024',
      endDate: '12/31/2026',
      physicalProgress: '29',
      financialProgress: '25',
    },
    {
      id: 'jiri-ridi-road',
      title: 'Jiri to Ridi Road Widening and Resurfacing',
      description: '42km highway widening project with modern safety features',
      authority: 'Department of Roads',
      status: 'Open',
      budgetDisplay: 'NPR 5.60B',
      contractDisplay: 'NPR 5.20B',
      contractValue: 5.2,
      spentBudget: 'NPR 1.56B',
      biddingCompanies: [
        'GD Builders Nepal',
        'Himalayan Construction Ltd',
        'Mountain Works International',
        'Alpine Infrastructure',
      ],
      winningCompany: null,
      deadline: '01/05/2025',
      startDate: '2/15/2025',
      endDate: '8/31/2026',
      physicalProgress: '38',
      financialProgress: '28',
    },
    {
      id: 'pokhara-water',
      title: 'Pokhara-Lekhnath Water Supply Extension Project',
      description: 'Water supply system expansion covering 50,000 new households',
      authority: 'Pokhara Metropolitan City',
      status: 'Awarded',
      budgetDisplay: 'NPR 4.20B',
      contractDisplay: 'NPR 3.90B',
      contractValue: 3.9,
      spentBudget: 'NPR 1.95B',
      biddingCompanies: [
        'Pani Solutions Nepal',
        'Water Nepal Ltd',
        'Hydro Services International',
      ],
      winningCompany: 'Pani Solutions Nepal',
      deadline: '11/20/2024',
      startDate: '12/1/2023',
      endDate: '11/30/2025',
      physicalProgress: '65',
      financialProgress: '58',
    },
    {
      id: 'koshi-bridge',
      title: 'Koshi River Bridge Modernization Project',
      description: 'Bridge reconstruction with earthquake-resistant design standards',
      authority: 'Department of Roads',
      status: 'Open',
      budgetDisplay: 'NPR 8.50B',
      contractDisplay: 'NPR 7.80B',
      contractValue: 7.8,
      spentBudget: 'NPR 1.56B',
      biddingCompanies: [
        'Bridge Construction Nepal',
        'Structural Solutions Ltd',
        'Civil Works International',
        'Engineering Innovations',
      ],
      winningCompany: null,
      deadline: '04/15/2025',
      startDate: '5/15/2025',
      endDate: '2/28/2027',
      physicalProgress: '18',
      financialProgress: '15',
    },
    {
      id: 'kathmandu-fast-track',
      title: 'Kathmandu-Terai Fast Track Highway Project',
      description: '76km 4-lane expressway with modern toll collection system',
      authority: 'The Nepali Army Infrastructure',
      status: 'Planning',
      budgetDisplay: 'NPR 211.93B',
      contractDisplay: 'NPR 22.55B',
      contractValue: 22.55,
      spentBudget: 'NPR 8.07B',
      biddingCompanies: [
        'Chinese State Construction',
        'Indian Highways Limited',
        'Nepali Road Authority',
      ],
      winningCompany: null,
      deadline: '05/30/2025',
      startDate: '7/1/2025',
      endDate: '4/30/2027',
      physicalProgress: '43',
      financialProgress: '44',
    },
    {
      id: 'melamchi-completion',
      title: 'Melamchi Water Supply Project - Final Phase',
      description: 'Project completion including pipeline installation and testing',
      authority: 'Melamchi Water Supply Development Board',
      status: 'Awarded',
      budgetDisplay: 'NPR 5.81B',
      contractDisplay: 'NPR 5.50B',
      contractValue: 5.5,
      spentBudget: 'NPR 5.00B',
      biddingCompanies: [
        'Melamchi Contractors Ltd',
        'Water Infrastructure Nepal',
        'Pipeline Solutions',
      ],
      winningCompany: 'Melamchi Contractors Ltd',
      deadline: '09/30/2024',
      startDate: '11/1/2023',
      endDate: '4/30/2025',
      physicalProgress: '100',
      financialProgress: '74',
    },
  ]

  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchBar, setShowSearchBar] = useState(true)
  const lastScrollOffset = useRef(0)

  const filteredTenders = useMemo(() => {
    const value = searchQuery.trim().toLowerCase()
    if (!value) return tenders
    return tenders.filter((tender) => tender.title.toLowerCase().includes(value))
  }, [tenders, searchQuery])

  const suggestions = useMemo(() => {
    const value = searchQuery.trim().toLowerCase()
    if (!value) return []
    return tenders.filter((tender) => tender.title.toLowerCase().includes(value)).slice(0, 5)
  }, [tenders, searchQuery])

  const openCount = filteredTenders.filter((tender) => tender.status === 'Open').length
  const awardedCount = filteredTenders.filter((tender) => tender.status === 'Awarded').length
  const planningCount = filteredTenders.filter((tender) => tender.status === 'Planning').length
  const totalContractValue = filteredTenders.reduce((sum, tender) => sum + tender.contractValue, 0)
  const totalValueDisplay = `NPR ${totalContractValue.toFixed(2)}B`

  const handleViewProject = (tender: (typeof tenders)[0]) => {
    router.push({
      pathname: '/project-details',
      params: {
        title: tender.title,
        estimatedBudget: tender.budgetDisplay,
        allocatedBudget: tender.contractDisplay,
        spentBudget: tender.spentBudget,
        physicalProgress: tender.physicalProgress,
        financialProgress: tender.financialProgress,
        startDate: tender.startDate,
        endDate: tender.endDate,
        Department: tender.authority,
      },
    })
  }

  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y
    const diff = currentOffset - lastScrollOffset.current

    if (searchQuery.length > 0 || currentOffset < 30) {
      if (!showSearchBar) setShowSearchBar(true)
    } else if (diff > 10 && currentOffset > 30) {
      if (showSearchBar) setShowSearchBar(false)
    } else if (diff < -10) {
      if (!showSearchBar) setShowSearchBar(true)
    }

    lastScrollOffset.current = currentOffset
  }

  return (
    <View style={styles.screen}>
      {/* Modern Header with Gradient */}
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
          shadowColor: "#7C3AED",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 8,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 36, fontWeight: "800", color: "#FFFFFF", letterSpacing: -0.5 }}>
              Tenders
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
              <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: "#E9D5FF", marginRight: 8 }} />
              <Text style={{ fontSize: 14, color: "#E9D5FF", fontWeight: "500" }}>
                {filteredTenders.length} Active Government Tenders
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
            <Ionicons name="document-text" size={28} color="#FFFFFF" />
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
            shadowColor: "#7C3AED",
            shadowOpacity: 0.2,
            shadowRadius: 24,
            shadowOffset: { width: 0, height: 10 },
            borderWidth: 1.5,
            borderColor: "rgba(124, 58, 237, 0.15)",
          }}
        >
          <View style={{
            backgroundColor: "#F5F3FF",
            borderRadius: 12,
            padding: 8,
            marginRight: 12
          }}>
            <Ionicons name="search" size={20} color="#7C3AED" />
          </View>
          <TextInput
            placeholder="Search government tenders..."
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
              shadowColor: "#7C3AED",
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
                    backgroundColor: "#F5F3FF",
                    borderRadius: 8,
                    padding: 6,
                    marginRight: 12
                  }}>
                    <Ionicons name="document-text" size={16} color="#7C3AED" />
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
                  No matching tenders found
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Body */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingTop: 0 }]}
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
        removeClippedSubviews={true}
      >
        {/* Modern Stats Cards */}
        <View style={styles.statsRow}>
          <LinearGradient
            colors={["#3B82F6", "#2563EB"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statCard}
          >
            <Ionicons name="folder-open" size={24} color="#FFFFFF" style={{ marginBottom: 8 }} />
            <Text style={styles.statValue}>{openCount}</Text>
            <Text style={styles.statLabel}>Open</Text>
          </LinearGradient>
          
          <LinearGradient
            colors={["#10B981", "#059669"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statCard}
          >
            <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" style={{ marginBottom: 8 }} />
            <Text style={styles.statValue}>{awardedCount}</Text>
            <Text style={styles.statLabel}>Awarded</Text>
          </LinearGradient>
          
          <LinearGradient
            colors={["#F59E0B", "#D97706"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statCard}
          >
            <Ionicons name="calendar" size={24} color="#FFFFFF" style={{ marginBottom: 8 }} />
            <Text style={styles.statValue}>{planningCount}</Text>
            <Text style={styles.statLabel}>Planning</Text>
          </LinearGradient>
        </View>

        {/* Total Value Card */}
        <LinearGradient
          colors={["#8B5CF6", "#7C3AED"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
            elevation: 6,
            shadowColor: '#7C3AED',
            shadowOpacity: 0.25,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 13, color: '#E9D5FF', fontWeight: '600', marginBottom: 6 }}>
                Total Contract Value
              </Text>
              <Text style={{ fontSize: 28, fontWeight: '800', color: '#FFFFFF' }}>
                {totalValueDisplay}
              </Text>
            </View>
            <View style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 16,
              padding: 12,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.3)'
            }}>
              <Ionicons name="cash" size={32} color="#FFFFFF" />
            </View>
          </View>
        </LinearGradient>

        {/* Modern Tender Cards */}
        {filteredTenders.map((tender) => (
          <View key={tender.id} style={styles.card}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={styles.cardTitle}>{tender.title}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
                  <Ionicons name="business" size={14} color="#64748B" />
                  <Text style={styles.cardMeta}>{tender.authority}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.badgeBase,
                  tender.status === 'Awarded' ? styles.badgeAwarded : 
                  tender.status === 'Open' ? styles.badgeOpen : styles.badgePlanning,
                ]}
              >
                <Ionicons 
                  name={tender.status === 'Awarded' ? 'checkmark-circle' : 
                        tender.status === 'Open' ? 'time' : 'calendar'} 
                  size={14} 
                  color={tender.status === 'Awarded' ? '#059669' : 
                         tender.status === 'Open' ? '#2563EB' : '#D97706'} 
                  style={{ marginRight: 4 }}
                />
                <Text
                  style={[
                    styles.badgeText,
                    tender.status === 'Awarded' ? styles.badgeAwardedText :
                    tender.status === 'Open' ? styles.badgeOpenText : styles.badgePlanningText,
                  ]}
                >
                  {tender.status}
                </Text>
              </View>
            </View>

            <Text style={styles.cardSubtitle}>{tender.description}</Text>

            {/* Budget / Contract Section */}
            <View style={styles.budgetSection}>
              <View style={styles.budgetItem}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                  <Ionicons name="wallet" size={16} color="#3B82F6" />
                  <Text style={styles.smallLabel}>Budget</Text>
                </View>
                <Text style={styles.budgetValue}>{tender.budgetDisplay}</Text>
              </View>
              <View style={styles.budgetDivider} />
              <View style={styles.budgetItem}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                  <Ionicons name="document-text" size={16} color="#8B5CF6" />
                  <Text style={styles.smallLabel}>Contract</Text>
                </View>
                <Text style={styles.contractValue}>{tender.contractDisplay}</Text>
              </View>
              <View style={styles.budgetDivider} />
              <View style={styles.budgetItem}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                  <Ionicons name="trending-up" size={16} color="#EF4444" />
                  <Text style={styles.smallLabel}>Spent</Text>
                </View>
                <Text style={[styles.budgetValue, { color: '#EF4444' }]}>{tender.spentBudget}</Text>
              </View>
            </View>

            {/* Bidding Companies */}
            {tender.biddingCompanies.length > 0 && (
              <View style={styles.section}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                  <Ionicons name="people" size={16} color="#64748B" />
                  <Text style={styles.sectionLabel}>Bidding Companies</Text>
                </View>
                <View style={styles.chipRow}>
                  {tender.biddingCompanies.map((company) => (
                    <View key={company} style={styles.chip}>
                      <Text style={styles.chipText}>{company}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Winner Status */}
            {tender.winningCompany && (
              <View style={styles.winnerSection}>
                <Ionicons name="trophy" size={18} color="#F59E0B" style={{ marginRight: 8 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.winnerLabel}>Winning Company</Text>
                  <Text style={styles.winnerText}>{tender.winningCompany}</Text>
                </View>
              </View>
            )}

            {/* Footer */}
            <View style={[styles.footerRow, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="calendar" size={16} color="#64748B" style={{ marginRight: 6 }} />
                <View>
                  <Text style={styles.deadlineLabel}>Deadline</Text>
                  <Text style={styles.deadlineValue}>{tender.deadline}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.primaryButton, { flexDirection: 'row', alignItems: 'center' }]}
                onPress={() => handleViewProject(tender)}
              >
                <Text style={styles.primaryButtonText}>View Details</Text>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 100,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  statLabel: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
    opacity: 0.9,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  badgeBase: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 24,
  },
  badgeAwarded: {
    backgroundColor: '#DCFCE7',
  },
  badgeOpen: {
    backgroundColor: '#DBEAFE',
  },
  badgePlanning: {
    backgroundColor: '#FEF3C7',
  },
  badgeAwardedText: {
    color: '#15803D',
    fontSize: 11,
    fontWeight: '600',
  },
  badgeOpenText: {
    color: '#1D4ED8',
    fontSize: 11,
    fontWeight: '600',
  },
  badgePlanningText: {
    color: '#92400E',
    fontSize: 11,
    fontWeight: '600',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardMeta: {
    fontSize: 13,
    color: '#64748B',
    marginLeft: 6,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  smallLabel: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 6,
    fontWeight: '500',
  },
  budgetValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 4,
  },
  contractValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7C3AED',
    marginTop: 4,
  },
  section: {
    marginTop: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 11,
    color: '#4B5563',
  },
  winnerChip: {
    backgroundColor: '#16A34A',
  },
  winnerChipText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  pendingChip: {
    backgroundColor: '#E0E7FF',
  },
  pendingChipText: {
    color: '#312E81',
    fontWeight: '600',
  },
  footerRow: {
    marginTop: 20,
  },
  deadlineLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  deadlineValue: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  footerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginRight: 8,
  },
  secondaryButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111827',
  },
  primaryButton: {
    borderRadius: 999,
    backgroundColor: '#1D4ED8',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  primaryButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  budgetSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
  },
  budgetItem: {
    flex: 1,
  },
  budgetDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },
  winnerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  winnerLabel: {
    fontSize: 11,
    color: '#92400E',
    fontWeight: '600',
  },
  winnerText: {
    fontSize: 14,
    color: '#78350F',
    fontWeight: '700',
    marginTop: 2,
  },
})

export default Tenders