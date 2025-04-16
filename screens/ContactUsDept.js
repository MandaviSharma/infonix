import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, Image, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import club_logo from '../assets/club_logo.jpg';
const ContactUsDept = ({ navigation, route }) => {
  const [clubData, setClubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = route.params;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Department')
      .doc(userId)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          const data = snapshot.data();
          console.log('Fetched Department Data:', data); // Debugging line
          setClubData(data);
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
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.goBack()}>
          <Text style={styles.backSymbol}>{'←'}</Text>
        </TouchableOpacity>
        <View style={styles.clubInfo}>
          <Image source={club_logo} style={styles.logoImage} />
          <View style={styles.clubDetails}>
            <Text style={styles.clubName}>{clubData?.Department_name || 'Aim and Act'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.sectionText}>Email: {clubData?.email || 'apaji@gmail.com'}</Text>
        {/* <Text style={styles.sectionText}>Phone: {clubData?.phoneNo || 'Not provided'}</Text> */}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Follow Us</Text>
        {clubData?.LinkedIn && (
          <Text style={styles.linkText} onPress={() => Linking.openURL(clubData.LinkedIn)}>
            LinkedIn
          </Text>
        )}
        {/* {clubData?.LinkedIn && (
          <Text style={styles.linkText} onPress={() => Linking.openURL(clubData.LinkedIn)}>
            LinkedIn
          </Text>
        )} */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD', padding: 0 },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1565C0',
    marginBottom: 25,
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
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
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
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0D47A1', marginBottom: 8 },
  sectionText: { fontSize: 15, color: '#1E88E5', marginBottom: 6 },
  linkText: { fontSize: 15, color: '#1565C0', fontWeight: 'bold', textDecorationLine: 'underline' },
});

export default ContactUsDept;
