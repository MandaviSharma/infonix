import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const AboutUs = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.goBack()}>
          <Text style={styles.backSymbol}>{'←'}</Text>
        </TouchableOpacity>
        <View style={styles.clubInfo}>
          <View style={styles.logoPlaceholder}>
            <Image
              source={{ uri: 'https://your-club-logo-url.com' }} // Replace with actual logo URL
              style={styles.clubLogo}
            />
          </View>
          <View style={styles.clubDetails}>
            <Text style={styles.clubName}>Tech Club</Text>
            <Text style={styles.clubDescription}>Innovating the future with technology.</Text>
          </View>
        </View>
      </View>

      {/* About Us Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <Text style={styles.sectionText}>
          Tech Club is dedicated to exploring the latest in technological innovations and encouraging the next
          generation of tech leaders. We offer a platform for learning, sharing, and collaborating on tech
          projects and innovations.
        </Text>
      </View>

      {/* Mentors Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mentors</Text>
        <Text style={styles.sectionText}>1. Dr. John Doe - Senior Tech Expert</Text>
        <Text style={styles.sectionText}>2. Prof. Jane Smith - Technology Educator</Text>
      </View>

      {/* Members Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Members</Text>
        <Text style={styles.sectionText}>1. Alice Brown</Text>
        <Text style={styles.sectionText}>2. Bob Green</Text>
        <Text style={styles.sectionText}>3. Charlie White</Text>
        <Text style={styles.sectionText}>4. David Black</Text>
      </View>

      {/* Club Events Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <Text style={styles.sectionText}>- Hackathon 2025: Innovating for a Better Future</Text>
        <Text style={styles.sectionText}>- Tech Talk Series: The Future of AI</Text>
      </View>

      {/* Contact Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.sectionText}>Email: contact@techclub.com</Text>
        <Text style={styles.sectionText}>Phone: +1234567890</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 0 },

  // Top Bar Styles
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#007bff',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  backIconContainer: {
    marginRight: 15,
  },
  backSymbol: {
    fontSize: 24,
    color: '#fff',
  },
  clubInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginRight: 10,
  },
  clubLogo: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  clubDetails: {
    flex: 1,
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

  // Section Styles
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: '#212529',
    marginBottom: 8,
  },
});

export default AboutUs;
