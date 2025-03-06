import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AboutUs = ({ navigation, route }) => {
  const [clubData, setClubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = route.params;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Clubs')
      .doc(userId)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          setClubData(snapshot.data());
        } else {
          console.log('No such document!');
          setClubData(null);
        }
        setLoading(false);
      }, error => {
        console.error('Error fetching club details:', error);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.goBack()}>
          <Text style={styles.backSymbol}>{'←'}</Text>
        </TouchableOpacity>
        <View style={styles.clubInfo}>
          <Image
            source={{ uri: clubData?.logoUrl || 'https://via.placeholder.com/40' }}
            style={styles.clubLogo}
          />
          <View style={styles.clubDetails}>
            <Text style={styles.clubName}>{clubData?.Club_name || 'Club Name'}</Text>
            <Text style={styles.clubDescription}>{clubData?.description || 'Club Description'}</Text>
          </View>
        </View>
      </View>

      {/* About Us Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <Text style={styles.sectionText}>{clubData?.description || 'No description available.'}</Text>
      </View>

      {/* Mentors Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mentors</Text>
        <Text style={styles.sectionText}>{clubData?.mentors || 'No mentors listed.'}</Text>
      </View>

      {/* Members Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Members</Text>
        <Text style={styles.sectionText}>{clubData?.members || 'No members listed.'}</Text>
      </View>

      {/* Contact Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.sectionText}>Email: {clubData?.Email || 'Not provided'}</Text>
        <Text style={styles.sectionText}>Phone: {clubData?.phoneNo || 'Not provided'}</Text>
      </View>

      {/* Social Links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Follow Us</Text>
        {clubData?.instagram && (
          <Text style={styles.linkText} onPress={() => Linking.openURL(clubData.instagram)}>
            Instagram
          </Text>
        )}
        {clubData?.linkedin && (
          <Text style={styles.linkText} onPress={() => Linking.openURL(clubData.linkedin)}>
            LinkedIn
          </Text>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD', padding: 0 },

  // Loader
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
  },

  // Top Bar Styles
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1565C0', // Deep blue
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom:25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  backIconContainer: { marginRight: 12 },
  backSymbol: { fontSize: 26, color: '#E3F2FD' },

  // Club Info in Top Bar
  clubInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  clubLogo: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 12,
    backgroundColor: '#E3F2FD',
  },
  clubDetails: { flex: 1 },
  clubName: { fontSize: 20, fontWeight: 'bold', color: '#E3F2FD' },
  clubDescription: { fontSize: 14, color: '#BBDEFB' },

  // Section Styles
  section: {
    marginBottom: 25,
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D47A1', // Dark blue
    marginBottom: 8,
  },
  sectionText: { fontSize: 15, color: '#1E88E5', marginBottom: 6 },

  // Links
  linkText: {
    fontSize: 15,
    color: '#1565C0',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});



export default AboutUs;
