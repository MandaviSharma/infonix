//ClubDashboard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ClubDashboard = ({ route, navigation }) => {
  const { clubName } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.icon}>
          <Text>☰</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>{clubName}</Text>
        <TouchableOpacity onPress={() => { /* handle other options */ }} style={styles.icon}>
          <Text>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Club Posts */}
      <View style={styles.postsSection}>
        <Text style={styles.sectionTitle}>Latest Posts</Text>
        <View style={styles.post}>
          <Text>Post 1</Text>
        </View>
        <View style={styles.post}>
          <Text>Post 2</Text>
        </View>
        <View style={styles.post}>
          <Text>Post 3</Text>
        </View>
      </View>

      {/* Add Notice Button */}
      <View style={styles.actionsSection}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('AddNotice', { clubName })}
        >
          <Text style={styles.actionText}>Add a Notice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>View Ratings & Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Update Dashboard</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#4CAF50' },
  icon: { padding: 5 },
  logo: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  postsSection: { marginTop: 20, padding: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  post: { backgroundColor: '#f0f0f0', padding: 15, marginBottom: 10, borderRadius: 10 },
  actionsSection: { marginTop: 20, padding: 10 },
  actionButton: { backgroundColor: '#4CAF50', padding: 15, marginBottom: 10, borderRadius: 10 },
  actionText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});

export default ClubDashboard;
