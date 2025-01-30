import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';

const ContactUs = ({ navigation }) => { // Accessing navigation prop here
  const handlePhoneCall = () => {
    Linking.openURL('tel:+1234567890'); // Replace with actual contact number
  };

  const handleEmail = () => {
    Linking.openURL('mailto:contact@techclub.com'); // Replace with actual email
  };

  const handleSocialMedia = (url) => {
    Linking.openURL(url); // Open social media link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backIconContainer}
          onPress={() => navigation.goBack()}  // This makes the back button functional
        >
          <Text style={styles.backSymbol}>{'←'}</Text>
        </TouchableOpacity>
        <View style={styles.clubInfo}>
          <View style={styles.logoPlaceholder} />
          <View style={styles.clubDetails}>
            <Text style={styles.clubName}>Tech Club</Text>
            <Text style={styles.clubDescription}>Innovating the future with technology.</Text>
          </View>
        </View>
      </View>

      {/* Contact Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.sectionText}>
          For any inquiries, you can reach us at:
        </Text>
        <Text style={styles.sectionText}>
          <Text style={styles.boldText}>Email:</Text>
        </Text>
        <TouchableOpacity onPress={handlePhoneCall}>
          <Text style={[styles.sectionText, styles.link]}>
            <Text style={styles.boldText}>Phone:</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Social Media Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Follow Us</Text>
        <TouchableOpacity onPress={() => handleSocialMedia('https://www.facebook.com/techclub')}>
          <Text style={[styles.sectionText, styles.link]}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSocialMedia('https://twitter.com/techclub')}>
          <Text style={[styles.sectionText, styles.link]}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSocialMedia('https://www.instagram.com/techclub')}>
          <Text style={[styles.sectionText, styles.link]}>Instagram</Text>
        </TouchableOpacity>
      </View>

      {/* Office Address Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Office Address</Text>
        <Text style={styles.sectionText}>

        </Text>
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
  boldText: {
    fontWeight: 'bold',
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default ContactUs;
