import React, { useEffect, useState } from 'react';
import { View, Text, Image,TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UpdateDashboard = ({ navigation, route}) => {
  const { userType, userId } = route.params;

  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const [members, setMembers] = useState('');
  const [mentors, setMentors] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  
  // Fetch Club Details on Component Mount
  useEffect(() => {
    if (userId) {
      fetchClubDetails(userId);
    }
  }, [userId]);

  const fetchClubDetails = async (userId) => {
    try {
      console.log("Fetching data for club ID:", userId);
      const doc = await firestore().collection('Clubs').doc(userId).get();
      
      if (doc.exists) {
        const data = doc.data();
        console.log("Fetched Data:", data);
        
        setClubName(data.Club_name || '');
        setClubDescription(data.description || '');
        setMembers(data.members || '');
        setMentors(data.mentors || '');
        setPhoneNo(data.phoneNo || '');
        setEmail(data.email || '');
        setInstagram(data.instagram || '');
        setLinkedin(data.linkedin || '');
       
      } else {
        console.warn("No club found with this ID in Firestore.");
      }
    } catch (error) {
      console.error("Error fetching club details:", error);
    }
  };
  

  const updateClubDetails = async () => {
    if (!userId) {
      Alert.alert('Error', 'Club ID not found!');
      return;
    }

    try {
      await firestore().collection('Clubs').doc(userId).update({
        Club_name: clubName,
        description: clubDescription,
        members,
        mentors,
        phoneNo,
        email,
        instagram,
        linkedin,
      });

      Alert.alert('Success', 'Club details updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }, // Navigate back after update
      ]);
    } catch (error) {
      console.error('Error updating club details:', error);
      Alert.alert('Error', 'Failed to update details.');
    }
  };

  
  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
          <Text style={styles.backSymbol}>{'←'}</Text>
        </TouchableOpacity>
        <View style={styles.clubInfo}>
          <Image
                      source={require('../assets/club_logo.jpg')}
                      style={styles.clubLogo}
                      resizeMode="contain"
                    />
          <View style={styles.logoPlaceholder} />
          <Text style={styles.clubName}>{clubName}</Text>
        </View>
     </View>

      {/* About Us Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Club Name</Text>
        <TextInput style={styles.input} value={clubName} onChangeText={setClubName} />

        <Text style={styles.label}>Club Description</Text>
        <TextInput style={styles.input} value={clubDescription} onChangeText={setClubDescription} multiline />

        <Text style={styles.label}>Members</Text>
        <TextInput style={styles.input} value={members} onChangeText={setMembers} multiline />

        <Text style={styles.label}>Mentors</Text>
        <TextInput style={styles.input} value={mentors} onChangeText={setMentors} multiline />
      </View>

      {/* Contact Info Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phoneNo} onChangeText={setPhoneNo} keyboardType="phone-pad" />

       
        <Text style={styles.label}>Instagram ID</Text>
        <TextInput style={styles.input} value={instagram} onChangeText={setInstagram} />

        <Text style={styles.label}>LinkedIn ID</Text>
        <TextInput style={styles.input} value={linkedin} onChangeText={setLinkedin} />
      </View>


      {/* Update Button */}
      <TouchableOpacity style={styles.button} onPress={updateClubDetails}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 15 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#007bff',
    elevation: 3,
  },
  backIconContainer: { marginRight: 15 },
  backSymbol: { fontSize: 24, color: '#fff' },
  clubInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  logoPlaceholder: { width: 40, height: 40, backgroundColor: '#fff', borderRadius: 50, marginRight: 10 },
  clubName: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  section: { marginBottom: 25 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#212529', marginBottom: 8 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 15, fontSize: 14 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default UpdateDashboard;
