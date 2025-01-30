import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const UpdateDashboard = ({ navigation }) => {
  const [clubName, setClubName] = useState('Tech Club');
  const [clubDescription, setClubDescription] = useState('Innovating the future with technology.');
  const [aboutUs, setAboutUs] = useState('This is the about us section.');
  const [contactInfo, setContactInfo] = useState('');
  const [posts, setPosts] = useState(['Post 1', 'Post 2', 'Post 3']);

  return (
    <ScrollView style={styles.container}>
      {/* Updated Top Bar with New Styling */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
          <Text style={styles.backSymbol}>{'←'}</Text>
        </TouchableOpacity>
        <View style={styles.clubInfo}>
          <View style={styles.logoPlaceholder} />
          <View style={styles.clubDetails}>
            <Text style={styles.clubName}>Tech Club</Text>
            <Text style={styles.clubDescription}>Innovating the future with technology.</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}></Text>
        </TouchableOpacity>
      </View>

      {/* Club Info Update Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Club Name</Text>
        <TextInput
          style={styles.input}
          value={clubName}
          onChangeText={setClubName}
          placeholder="Enter Club Name"
        />

        <Text style={styles.label}>Club Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={clubDescription}
          onChangeText={setClubDescription}
          placeholder="Enter Club Description"
          multiline
        />
      </View>

      {/* Existing Posts */}
      <View style={styles.section}>
        <Text style={styles.label}>Existing Posts</Text>
        {posts.map((post, index) => (
          <View key={index} style={styles.post}>
            <Text style={styles.postText}>{post}</Text>
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* About Us & Contact Us */}
      <View style={styles.section}>
        <Text style={styles.label}>Edit About Us</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={aboutUs}
          onChangeText={setAboutUs}
          placeholder="Enter About Us"
          multiline
        />

        <Text style={styles.label}>Edit Contact Info</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={contactInfo}
          onChangeText={setContactInfo}
          placeholder="Enter Contact Info"
          multiline
        />
      </View>

      {/* Final Update Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 15 },

  // Top Bar Styles with New Customization
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#007bff',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  backIconContainer: {
    marginRight: 15, // Space between the back icon and the club info
  },
  backSymbol: {
    fontSize: 24,
    color: '#fff',
  },
  clubInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Ensures the club details take up remaining space
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginRight: 10,
  },
  clubDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  clubName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  clubDescription: {
    fontSize: 12,
    color: '#fff',
  },
  settingsButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 20,
    color: '#fff',
  },

  // Other Section Styles
  section: { marginBottom: 25 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#212529', marginBottom: 8 },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    fontSize: 14,
  },
  textArea: { height: 100 },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  post: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
  },
  postText: { fontSize: 14, color: '#212529' },
  postActions: { flexDirection: 'row', marginTop: 10 },
  actionButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  actionButtonText: { color: '#fff', fontSize: 14 },
});

export default UpdateDashboard;
