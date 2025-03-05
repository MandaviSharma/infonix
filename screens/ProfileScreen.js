import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({
    name: 'Your Name',
    course: 'Not Set',
    phoneNo: 'Not Set',
    email: 'Not Set',
    studentId: 'Not Set',
    profilePic: 'https://via.placeholder.com/100',
  });

  const auth = getAuth();

  // Function to load profile data from Firestore
  const loadProfileData = async (userId) => {
    try {
      const userDoc = await firestore().collection('Students').doc(userId).get();
      if (userDoc.exists) {
        setProfile({
          name: userDoc.data().name || 'Your Name',
          course: userDoc.data().course || 'Not Set',
          phoneNo: userDoc.data().contact || 'Not Set',
          email: userDoc.data().email || 'Not Set',
          studentId: userDoc.data().studentID || 'Not Set',
          profilePic: userDoc.data().profilePic || 'https://via.placeholder.com/100',
        });
      } else {
        Alert.alert('Profile Not Found', 'No profile data available.');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      Alert.alert('Error', 'Failed to load profile.');
    }
  };

  // Listen for auth state and fetch user data
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          loadProfileData(user.uid);
        } else {
          Alert.alert('Error', 'User not logged in.');
        }
      });

      return () => unsubscribe();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {/* Profile Image and Name */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: profile.profilePic }} style={styles.profileImage} />
        <Text style={styles.profileName}>{profile.name}</Text>
      </View>

      {/* Personal Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <Text style={styles.infoText}>Course: {profile.course}</Text>
        <Text style={styles.infoText}>Contact: {profile.phoneNo}</Text>
        <Text style={styles.infoText}>Email: {profile.email}</Text>
        <Text style={styles.infoText}>Student ID: {profile.studentId}</Text>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('ProfileEdit')}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD', padding: 20 },
  profileHeader: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: '#1976D2' },
  profileName: { fontSize: 22, fontWeight: 'bold', marginTop: 10, color: '#0D47A1' },
  section: { marginBottom: 20, backgroundColor: '#BBDEFB', padding: 15, borderRadius: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#0D47A1' },
  infoText: { fontSize: 16, color: '#0D47A1', marginBottom: 5 },
  editButton: { backgroundColor: '#1976D2', padding: 15, borderRadius: 5, alignItems: 'center' },
  editButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ProfileScreen;
