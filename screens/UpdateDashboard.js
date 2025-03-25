import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UpdateDashboard = ({ navigation, route}) => {
  const { userType, userId } = route.params; 

  
  const [clubName, setClubName] = useState('Tech Club');
  const [clubDescription, setClubDescription] = useState('');
  const [members, setMembers] = useState('');
  const [mentors, setMentors] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [posts, setPosts] = useState([]);
  
  
  // Fetch Club Details
  const fetchClubDetails = async (userId) => {
    try {
      const doc = await firestore().collection('Clubs').doc(userId).get();
      if (doc.exists) {
        const data = doc.data();
        setClubDescription(data.description || '');
        setMembers(data.members || '');
        setMentors(data.mentors || '');
        setPhoneNo(data.phoneNo || '');
        setEmail(data.email || '');
        setInstagram(data.instagram || '');
        setLinkedin(data.linkedin || '');
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching club details:', error);
    }
  };

  // Update Club Details
  const updateClubDetails = async () => {
    if (!userId) {
      Alert.alert('Error', 'Club ID not found!');
      return;
    }

    try {
      await firestore().collection('Clubs').doc(userId).update({
        name: clubName,
        description: clubDescription,
        members,
        mentors,
        phoneNo,
        email,
        instagram,
        linkedin,
        posts,
      });

      Alert.alert('Success', 'Club details updated successfully!');
    } catch (error) {
      console.error('Error updating club details:', error);
      Alert.alert('Error', 'Failed to update details.');
    }
  };

  // Delete Post
  const deletePost = async (postIndex) => {
    const updatedPosts = posts.filter((_, index) => index !== postIndex);

    try {
      await firestore().collection('Clubs').doc(clubID).update({
        posts: updatedPosts,
      });

      setPosts(updatedPosts);
      Alert.alert('Success', 'Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      Alert.alert('Error', 'Failed to delete post.');
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

        <Text style={styles.label}>Email ID</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

        <Text style={styles.label}>Instagram ID</Text>
        <TextInput style={styles.input} value={instagram} onChangeText={setInstagram} />

        <Text style={styles.label}>LinkedIn ID</Text>
        <TextInput style={styles.input} value={linkedin} onChangeText={setLinkedin} />
      </View>

      {/* Existing Posts */}
      <View style={styles.section}>
        <Text style={styles.label}>Existing Posts</Text>
        {posts.map((post, index) => (
          <View key={index} style={styles.post}>
            <Text style={styles.postText}>{post}</Text>
            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('AddNotice', { post, index, clubID })}
              >
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => deletePost(index)}>
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
