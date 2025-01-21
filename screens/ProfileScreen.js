import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Switch } from 'react-native';

const ProfileViewScreen = ({ navigation }) => {
  // Sample student profile data
  const student = {
    name: 'John Doe',
    contact: '123-456-7890',
    profilePic: 'https://via.placeholder.com/100',
    notificationsEnabled: true,
    eventStats: { participated: 5, upcoming: 2 },
    registeredEvents: [
      { id: 1, name: 'Tech Conference', status: 'Confirmed' },
      { id: 2, name: 'Coding Hackathon', status: 'Pending' },
      { id: 3, name: 'AI Workshop', status: 'Completed' }
    ]
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: student.profilePic }} style={styles.profileImage} />
        <Text style={styles.profileName}>{student.name}</Text>
      </View>

      {/* Personal Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <Text style={styles.infoText}>Name: {student.name}</Text>
        <Text style={styles.infoText}>Contact: {student.contact}</Text>
      </View>

      {/* Event Registrations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Event Registrations</Text>
        {student.registeredEvents.map(event => (
          <View key={event.id} style={styles.eventItem}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventStatus}>{event.status}</Text>
          </View>
        ))}
      </View>

      {/* Notification Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <View style={styles.notificationRow}>
          <Text style={styles.notificationText}>Enable Notifications</Text>
          <Switch value={student.notificationsEnabled} disabled={true} />
        </View>
      </View>

      {/* Profile Analytics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Analytics</Text>
        <Text style={styles.infoText}>Participated Events: {student.eventStats.participated}</Text>
        <Text style={styles.infoText}>Upcoming Events: {student.eventStats.upcoming}</Text>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('ProfileEdit')}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  profileHeader: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  profileName: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  infoText: { fontSize: 16, color: '#333', marginBottom: 5 },
  eventItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#f8f8f8', borderRadius: 5, marginBottom: 5 },
  eventName: { fontSize: 16 },
  eventStatus: { fontSize: 14, fontStyle: 'italic' },
  notificationRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  notificationText: { fontSize: 16 },
  editButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 5, alignItems: 'center' },
  editButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ProfileViewScreen;
