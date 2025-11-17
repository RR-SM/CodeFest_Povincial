import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

const Tenders = () => {
  return (
    <View style={styles.screen}>
      {/* Header (match Projects screen style) */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Tender Tracking</Text>
        <Text style={styles.headerSubtitle}>
          Monitor all government tenders with AI-powered anomaly detection
        </Text>
      </View>

      {/* Body */}
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Search */}
        <View style={styles.searchRow}>
          <TextInput
            placeholder="Search tenders by title, authority, or company..."
            placeholderTextColor="#8E9BB3"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Open Tenders</Text>
            <Text style={styles.statValue}>1</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Awarded Tenders</Text>
            <Text style={[styles.statValue, styles.statPositive]}>2</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Tender Value</Text>
            <Text style={styles.statValue}>NPR 8.80B</Text>
          </View>
        </View>

        {/* Tender card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>
              Construction of Kathmandu Ring Road Expansion
            </Text>
            <View style={styles.badgeAwarded}>
              <Text style={styles.badgeAwardedText}>Awarded</Text>
            </View>
          </View>

          <Text style={styles.cardSubtitle}>
            25km road expansion project with 6-lane highway
          </Text>
          <Text style={styles.cardMeta}>Department of Roads</Text>

          {/* Budget / Contract */}
          <View style={styles.rowSpaceBetween}>
            <View>
              <Text style={styles.smallLabel}>Budget</Text>
              <Text style={styles.budgetValue}>NPR 5.00B</Text>
            </View>
            <View>
              <Text style={styles.smallLabel}>Contract</Text>
              <Text style={styles.contractValue}>NPR 4.80B</Text>
            </View>
          </View>

          {/* Bidding companies & winner */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Bidding Companies</Text>
            <View style={styles.chipRow}>
              <View style={styles.chip}>
                <Text style={styles.chipText}>Nepal Construction Co.</Text>
              </View>
              <View style={styles.chip}>
                <Text style={styles.chipText}>Himalayan Builders</Text>
              </View>
              <View style={styles.chip}>
                <Text style={styles.chipText}>Everest Infrastructure</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Winning Company</Text>
            <View style={[styles.chip, styles.winnerChip]}>
              <Text style={[styles.chipText, styles.winnerChipText]}>
                Nepal Construction Co.
              </Text>
            </View>
          </View>

          {/* Footer actions */}
          <View style={[styles.rowSpaceBetween, styles.footerRow]}>
            <View>
              <Text style={styles.deadlineLabel}>Deadline</Text>
              <Text style={styles.deadlineValue}>12/31/2024</Text>
            </View>
            <View style={styles.footerButtons}>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>AI Analysis</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>View Project</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerBar: {
    backgroundColor: '#0F0D23',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#B0B0B0',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchButton: {
    backgroundColor: '#1D4ED8',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginRight: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  statPositive: {
    color: '#059669',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginRight: 8,
  },
  badgeAwarded: {
    backgroundColor: '#DCFCE7',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeAwardedText: {
    color: '#15803D',
    fontSize: 11,
    fontWeight: '600',
  },
  cardSubtitle: {
    marginTop: 8,
    fontSize: 13,
    color: '#4B5563',
  },
  cardMeta: {
    marginTop: 6,
    fontSize: 12,
    color: '#6B7280',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  smallLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 2,
  },
  budgetValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  contractValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#DC2626',
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
})

export default Tenders
