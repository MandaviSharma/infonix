import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ProfileEditScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [studentID, setStudentID] = useState('');

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email);
        const userId = user.uid;

        try {
          const doc = await firestore().collection('Students').doc(userId).get();
          if (doc.exists) {
            const userData = doc.data();
            setName(userData.name || '');
            setContact(userData.contact || '');
            setCourse(userData.course || '');
            setStudentID(userData.studentID || '');
            setProfilePic(userData.profilePic || null);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    });

    return unsubscribe;
  }, []);

  const pickImage = () => {
    const options = { mediaType: 'photo', quality: 1 };
    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      }
      if (response.errorMessage) {
        console.log('Image Picker Error: ', response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setProfilePic(uri);
        try {
          await AsyncStorage.setItem('profilePic', uri);
        } catch (error) {
          console.error('Error saving profile picture:', error);
        }
      }
    });
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;

      try {
        const docRef = firestore().collection('Students').doc(userId);
        const docSnapshot = await docRef.get();

        const data = {
          name,
          contact,
          email,
          course,
          studentID,
          profilePic,
        };

        if (docSnapshot.exists) {
          await docRef.update(data);
        } else {
          await docRef.set(data);
        }

        await AsyncStorage.multiSet([
          ['name', name],
          ['contact', contact],
          ['course', course],
          ['studentID', studentID],
        ]);
        if (profilePic) await AsyncStorage.setItem('profilePic', profilePic);

        Alert.alert('Success', 'Profile updated successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } catch (error) {
        Alert.alert('Error', 'Failed to update profile. Please try again.');
        console.error('Error updating profile:', error);
      }
    } else {
      Alert.alert('Error', 'No user is logged in.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: profilePic || 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.imageText}>Tap to change profile picture</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Contact</Text>
        <TextInput
          style={styles.input}
          value={contact}
          onChangeText={setContact}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Course</Text>
        <TextInput style={styles.input} value={course} onChangeText={setCourse} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Student ID</Text>
        <TextInput style={styles.input} value={studentID} onChangeText={setStudentID} />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#0D47A1' },
  imageContainer: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#1976D2' },
  imageText: { fontSize: 14, color: '#1976D2', marginTop: 5 },
  section: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#1976D2' },
  input: { borderWidth: 1, borderColor: '#90CAF9', padding: 10, borderRadius: 5, backgroundColor: '#FFFFFF' },
  saveButton: { backgroundColor: '#1976D2', padding: 15, borderRadius: 5, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ProfileEditScreen;
