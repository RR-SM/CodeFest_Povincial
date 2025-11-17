import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import { Alert, Dimensions, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';

const Budgets = () => {
  const screenWidth = Dimensions.get('window').width;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [viewMode, setViewMode] = useState('overview');

  const departments = [
    { id: 'health', name: 'Health & Sanitation', allocated: 45000000, spent: 32500000, committed: 8000000, color: '#ef4444' },
    { id: 'education', name: 'Education', allocated: 38000000, spent: 28000000, committed: 6500000, color: '#3b82f6' },
    { id: 'infrastructure', name: 'Infrastructure', allocated: 52000000, spent: 38000000, committed: 10000000, color: '#f59e0b' },
    { id: 'security', name: 'Public Safety', allocated: 28000000, spent: 22000000, committed: 4000000, color: '#8b5cf6' },
    { id: 'social', name: 'Social Welfare', allocated: 18000000, spent: 14000000, committed: 2500000, color: '#10b981' },
    { id: 'housing', name: 'Housing & Urban Dev', allocated: 22000000, spent: 16000000, committed: 4000000, color: '#ec4899' }
  ];

  const projects = [
    { id: 1, name: 'City Hospital Expansion', dept: 'health', budget: 12000000, spent: 8500000, status: 'In Progress', completion: 65 },
    { id: 2, name: 'Primary School Construction', dept: 'education', budget: 8500000, spent: 7200000, status: 'In Progress', completion: 85 },
    { id: 3, name: 'Highway Reconstruction Phase 2', dept: 'infrastructure', budget: 18000000, spent: 15000000, status: 'In Progress', completion: 75 },
    { id: 4, name: 'Police Equipment Modernization', dept: 'security', budget: 6000000, spent: 5800000, status: 'Near Completion', completion: 95 },
    { id: 5, name: 'Community Health Centers', dept: 'health', budget: 5500000, spent: 3200000, status: 'In Progress', completion: 45 },
    { id: 6, name: 'Teacher Training Program', dept: 'education', budget: 3200000, spent: 2800000, status: 'In Progress', completion: 88 },
    { id: 7, name: 'Bridge Construction Project', dept: 'infrastructure', budget: 9500000, spent: 4200000, status: 'In Progress', completion: 35 },
    { id: 8, name: 'Elderly Care Facilities', dept: 'social', budget: 4800000, spent: 4100000, status: 'In Progress', completion: 78 }
  ];

  const totalBudget = departments.reduce((sum, d) => sum + d.allocated, 0);
  const totalSpent = departments.reduce((sum, d) => sum + d.spent, 0);
  const totalCommitted = departments.reduce((sum, d) => sum + d.committed, 0);
  const available = totalBudget - totalSpent - totalCommitted;

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'all' || p.dept === selectedDept;
    return matchesSearch && matchesDept;
  });

  const pieChartData = departments.map(d => ({
    name: d.name.split(' ')[0],
    population: d.allocated,
    color: d.color,
    legendFontColor: '#333',
    legendFontSize: 12
  }));

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [12, 14.5, 16.2, 15.8, 17.2, 16.8],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ['Spending (Millions)']
  };

  const barChartData = {
    labels: departments.map(d => d.name.split(' ')[0].substring(0, 4)),
    datasets: [
      {
        data: departments.map(d => d.spent / 1000000)
      }
    ]
  };

  const formatCurrency = (amount: number) => {
    return `$${(amount / 1000000).toFixed(1)}M`;
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Completed': return { backgroundColor: '#dcfce7', color: '#166534' };
      case 'In Progress': return { backgroundColor: '#dbeafe', color: '#1e40af' };
      case 'Near Completion': return { backgroundColor: '#fef3c7', color: '#92400e' };
      case 'Delayed': return { backgroundColor: '#fee2e2', color: '#991b1b' };
      default: return { backgroundColor: '#f3f4f6', color: '#374151' };
    }
  };

  const exportToCsv = async () => {
    try {
      // Create CSV content
      let csvContent = 'Government Budget Report - Fiscal Year 2025\n\n';

      // Budget Overview
      csvContent += 'Budget Overview\n';
      csvContent += 'Category,Amount (USD)\n';
      csvContent += `Total Budget,${totalBudget}\n`;
      csvContent += `Total Spent,${totalSpent}\n`;
      csvContent += `Total Committed,${totalCommitted}\n`;
      csvContent += `Available,${available}\n\n`;

      // Department Budget Details
      csvContent += 'Department Budget Details\n';
      csvContent += 'Department,Allocated (USD),Spent (USD),Committed (USD),Available (USD),Utilization %\n';
      departments.forEach(dept => {
        const availableDept = dept.allocated - dept.spent - dept.committed;
        const utilization = ((dept.spent + dept.committed) / dept.allocated * 100).toFixed(1);
        csvContent += `"${dept.name}",${dept.allocated},${dept.spent},${dept.committed},${availableDept},${utilization}%\n`;
      });

      csvContent += '\n';

      // Project Details
      csvContent += 'Project Details\n';
      csvContent += 'Project Name,Department,Budget (USD),Spent (USD),Remaining (USD),Status,Completion %\n';
      projects.forEach(project => {
        const dept = departments.find(d => d.id === project.dept);
        const remaining = project.budget - project.spent;
        csvContent += `"${project.name}","${dept?.name || 'Unknown'}",${project.budget},${project.spent},${remaining},"${project.status}",${project.completion}%\n`;
      });

      // Create CSV file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `government_budget_report_${timestamp}.csv`;

      if (Platform.OS === 'web') {
        // For web platform, trigger download
        const csvDataUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
        const link = document.createElement('a');
        link.href = csvDataUri;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        Alert.alert(
          'Export Successful',
          'Budget report has been downloaded to your computer.',
          [{ text: 'OK' }]
        );
      } else {
        // For mobile platforms, create file and share it
        try {
          // Write file to app's document directory
          const file = new FileSystem.File(FileSystem.Paths.document, fileName);
          await file.write(csvContent);

          // Check if sharing is available
          if (await Sharing.isAvailableAsync()) {
            Alert.alert(
              'Export Ready',
              `Budget report "${fileName}" has been created successfully.`,
              [
                {
                  text: 'Share & Save',
                  onPress: async () => {
                    await Sharing.shareAsync(file.uri, {
                      mimeType: 'text/csv',
                      dialogTitle: 'Save Budget Report to Downloads',
                    });
                  }
                },
                {
                  text: 'View Summary',
                  onPress: () => {
                    const summary = `Government Budget Summary (${new Date().toLocaleDateString()})\n` +
                      `Total Budget: ${formatCurrency(totalBudget)}\n` +
                      `Total Spent: ${formatCurrency(totalSpent)} (${((totalSpent/totalBudget)*100).toFixed(1)}%)\n` +
                      `Available: ${formatCurrency(available)} (${((available/totalBudget)*100).toFixed(1)}%)\n` +
                      `\nDepartments: ${departments.length}\n` +
                      `Active Projects: ${projects.length}`;

                    Alert.alert('Budget Summary', summary, [{ text: 'OK' }]);
                  }
                },
                { text: 'Cancel' }
              ]
            );
          } else {
            Alert.alert(
              'File Created',
              `Budget report "${fileName}" has been created in the app directory.\n\nNote: Sharing is not available on this platform.`,
              [{ text: 'OK' }]
            );
          }

        } catch (mobileError) {
          console.error('Mobile file creation error:', mobileError);

          // Final fallback: show summary and log CSV
          Alert.alert(
            'Export Alternative',
            'Unable to create file. The report data has been logged to console for development purposes.',
            [
              {
                text: 'View Summary',
                onPress: () => {
                  const summary = `Government Budget Summary (${new Date().toLocaleDateString()})\n` +
                    `Total Budget: ${formatCurrency(totalBudget)}\n` +
                    `Total Spent: ${formatCurrency(totalSpent)} (${((totalSpent/totalBudget)*100).toFixed(1)}%)\n` +
                    `Available: ${formatCurrency(available)} (${((available/totalBudget)*100).toFixed(1)}%)\n` +
                    `\nDepartments: ${departments.length}\n` +
                    `Active Projects: ${projects.length}`;

                  Alert.alert('Budget Summary', summary, [{ text: 'OK' }]);
                }
              },
              { text: 'OK' }
            ]
          );

          // Log the CSV content for development
          console.log('CSV Content:', csvContent);
        }
      }

    } catch (error) {
      console.error('Export error:', error);
      Alert.alert(
        'Export Failed',
        'There was an error exporting the budget report. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };  const StatCard = ({ title, value, subtitle, bgColor }: {
    title: string;
    value: string;
    subtitle?: string;
    bgColor?: string;
  }) => (
    <View style={[styles.statCard, { backgroundColor: bgColor || '#fff' }]}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Government Budget Tracker</Text>
        <Text style={styles.headerSubtitle}>Fiscal Year 2025 - Public Transparency Portal</Text>
        <TouchableOpacity style={styles.exportButton} onPress={exportToCsv}>
          <Text style={styles.exportButtonText}>📥 Export Report</Text>
        </TouchableOpacity>
      </View>

      {/* Budget Overview Cards */}
      <View style={styles.statsContainer}>
        <StatCard
          title="Total Budget"
          value={formatCurrency(totalBudget)}
          bgColor="#eff6ff" subtitle={undefined}        />
        <StatCard
          title="Total Spent"
          value={formatCurrency(totalSpent)}
          subtitle={`${((totalSpent/totalBudget)*100).toFixed(1)}%`}
          bgColor="#dcfce7"
        />
        <StatCard
          title="Committed"
          value={formatCurrency(totalCommitted)}
          subtitle="Pending"
          bgColor="#fef3c7"
        />
        <StatCard
          title="Available"
          value={formatCurrency(available)}
          subtitle={`${((available/totalBudget)*100).toFixed(1)}%`}
          bgColor="#f3e8ff"
        />
      </View>

      {/* View Mode Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, viewMode === 'overview' && styles.activeTab]}
          onPress={() => setViewMode('overview')}
        >
          <Text style={[styles.tabText, viewMode === 'overview' && styles.activeTabText]}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, viewMode === 'departments' && styles.activeTab]}
          onPress={() => setViewMode('departments')}
        >
          <Text style={[styles.tabText, viewMode === 'departments' && styles.activeTabText]}>Departments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, viewMode === 'projects' && styles.activeTab]}
          onPress={() => setViewMode('projects')}
        >
          <Text style={[styles.tabText, viewMode === 'projects' && styles.activeTabText]}>Projects</Text>
        </TouchableOpacity>
      </View>

      {/* Overview Tab */}
      {viewMode === 'overview' && (
        <View style={styles.content}>
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Budget Allocation by Department</Text>
            <PieChart
              data={pieChartData}
              width={screenWidth - 60}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Monthly Spending Trend</Text>
            <LineChart
              data={lineChartData}
              width={screenWidth - 60}
              height={220}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#3b82f6'
                }
              }}
              bezier
              style={styles.chart}
            />
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Department Spending Comparison</Text>
            <BarChart
              data={barChartData}
              width={screenWidth - 60}
              height={220}
              yAxisLabel="$"
              yAxisSuffix="M"
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: { borderRadius: 16 }
              }}
              style={styles.chart}
            />
          </View>
        </View>
      )}

      {/* Departments Tab */}
      {viewMode === 'departments' && (
        <View style={styles.content}>
          {departments.map((dept) => {
            const spentPercent = (dept.spent / dept.allocated) * 100;
            const committedPercent = (dept.committed / dept.allocated) * 100;
            const availablePercent = 100 - spentPercent - committedPercent;

            return (
              <View key={dept.id} style={styles.deptCard}>
                <View style={[styles.deptIcon, { backgroundColor: dept.color + '20' }]}>
                  <Text style={[styles.deptIconText, { color: dept.color }]}>
                    {dept.name.substring(0, 2).toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.deptName}>{dept.name}</Text>

                <View style={styles.deptStats}>
                  <View style={styles.deptStatRow}>
                    <Text style={styles.deptStatLabel}>Total Allocated</Text>
                    <Text style={styles.deptStatValue}>{formatCurrency(dept.allocated)}</Text>
                  </View>
                  <View style={styles.deptStatRow}>
                    <Text style={styles.deptStatLabel}>Spent</Text>
                    <Text style={[styles.deptStatValue, { color: '#10b981' }]}>{formatCurrency(dept.spent)}</Text>
                  </View>
                  <View style={styles.deptStatRow}>
                    <Text style={styles.deptStatLabel}>Committed</Text>
                    <Text style={[styles.deptStatValue, { color: '#f59e0b' }]}>{formatCurrency(dept.committed)}</Text>
                  </View>
                  <View style={styles.deptStatRow}>
                    <Text style={styles.deptStatLabel}>Available</Text>
                    <Text style={[styles.deptStatValue, { color: '#3b82f6' }]}>
                      {formatCurrency(dept.allocated - dept.spent - dept.committed)}
                    </Text>
                  </View>
                </View>

                <Text style={styles.utilizationLabel}>Budget Utilization: {(spentPercent + committedPercent).toFixed(1)}%</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${spentPercent}%`, backgroundColor: '#10b981' }]} />
                  <View style={[styles.progressFill, { width: `${committedPercent}%`, backgroundColor: '#f59e0b' }]} />
                </View>
                <View style={styles.legendContainer}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#10b981' }]} />
                    <Text style={styles.legendText}>Spent {spentPercent.toFixed(0)}%</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#f59e0b' }]} />
                    <Text style={styles.legendText}>Committed {committedPercent.toFixed(0)}%</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#d1d5db' }]} />
                    <Text style={styles.legendText}>Available {availablePercent.toFixed(0)}%</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}

      {/* Projects Tab */}
      {viewMode === 'projects' && (
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search projects..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
              <TouchableOpacity
                style={[styles.filterButton, selectedDept === 'all' && styles.filterButtonActive]}
                onPress={() => setSelectedDept('all')}
              >
                <Text style={[styles.filterButtonText, selectedDept === 'all' && styles.filterButtonTextActive]}>
                  All
                </Text>
              </TouchableOpacity>
              {departments.map(d => (
                <TouchableOpacity
                  key={d.id}
                  style={[styles.filterButton, selectedDept === d.id && styles.filterButtonActive]}
                  onPress={() => setSelectedDept(d.id)}
                >
                  <Text style={[styles.filterButtonText, selectedDept === d.id && styles.filterButtonTextActive]}>
                    {d.name.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {filteredProjects.map(project => {
            const dept = departments.find(d => d.id === project.dept);
            const remaining = project.budget - project.spent;
            const statusStyle = getStatusStyle(project.status);

            if (!dept) return null;

            return (
              <View key={project.id} style={styles.projectCard}>
                <View style={[styles.projectIcon, { backgroundColor: dept.color + '20' }]}>
                  <Text style={[styles.projectIconText, { color: dept.color }]}>
                    {dept.name.substring(0, 2).toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectDept}>{dept.name}</Text>

                <View style={styles.projectStats}>
                  <View style={styles.projectStat}>
                    <Text style={styles.projectStatLabel}>Budget</Text>
                    <Text style={styles.projectStatValue}>{formatCurrency(project.budget)}</Text>
                  </View>
                  <View style={styles.projectStat}>
                    <Text style={styles.projectStatLabel}>Spent</Text>
                    <Text style={[styles.projectStatValue, { color: '#10b981' }]}>{formatCurrency(project.spent)}</Text>
                  </View>
                  <View style={styles.projectStat}>
                    <Text style={styles.projectStatLabel}>Remaining</Text>
                    <Text style={[styles.projectStatValue, { color: '#3b82f6' }]}>{formatCurrency(remaining)}</Text>
                  </View>
                </View>

                <View style={styles.projectProgress}>
                  <View style={[styles.statusBadge, statusStyle]}>
                    <Text style={[styles.statusBadgeText, { color: statusStyle.color }]}>{project.status}</Text>
                  </View>
                  <Text style={styles.completionText}>{project.completion}%</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${project.completion}%`, backgroundColor: '#3b82f6' }]} />
                </View>
                <Text style={styles.completionLabel}>Project Completion</Text>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    marginBottom: 70,
  },
  header: {
    backgroundColor: '#2563eb',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#bfdbfe',
    marginTop: 4,
  },
  exportButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  exportButtonText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statTitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  statSubtitle: {
    fontSize: 12,
    color: '#10b981',
    marginTop: 4,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 4,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#2563eb',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  chart: {
    borderRadius: 12,
  },
  deptCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  deptIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  deptIconText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deptName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  deptStats: {
    marginBottom: 16,
  },
  deptStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  deptStatLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  deptStatValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  utilizationLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#6b7280',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 12,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  projectIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  projectIconText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  projectDept: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  projectStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  projectStat: {
    flex: 1,
  },
  projectStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  projectStatValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  projectProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  completionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  completionLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
});

export default Budgets;
