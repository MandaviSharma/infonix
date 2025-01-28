import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ClubProfileScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Club Info Section */}
      <View style={styles.clubInfo}>
        <View style={styles.logoPlaceholder} />
        <View style={styles.clubDetails}>
          <Text style={styles.clubName}>Tech Club</Text>
          <Text style={styles.clubDescription}>Innovating the future with technology.</Text>
        </View>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AboutUs')}>
          <Text style={styles.navText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ContactUs')}>
          <Text style={styles.navText}>Contact Us</Text>
        </TouchableOpacity>
      </View>

      {/* Notices Section */}
      <View style={styles.postsSection}>
        <Text style={styles.sectionTitle}>Latest Posts</Text>
        <View style={styles.post}>
          <Text style={styles.postText}>Post 1</Text>
        </View>
        <View style={styles.post}>
          <Text style={styles.postText}>Post 2</Text>
        </View>
        <View style={styles.post}>
          <Text style={styles.postText}>Post 3</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AddNotice')}>
          <Text style={styles.actionText}>Add a Notice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('UpdateDashboard')}>
          <Text style={styles.actionText}>Update Dashboard</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  clubInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#007bff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logoPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0056b3',
    marginRight: 15,
  },
  clubDetails: {
    flex: 1,
  },
  clubName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  clubDescription: {
    fontSize: 14,
    color: '#fff',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navButton: {
    paddingVertical: 10,
  },
  navText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
  },
  postsSection: {
    marginTop: 20,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  post: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  postText: {
    fontSize: 16,
    color: '#212529',
  },
  actionsSection: {
    marginTop: 20,
    padding: 10,
  },
  actionButton: {
    backgroundColor: '#007bff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ClubProfileScreen;
