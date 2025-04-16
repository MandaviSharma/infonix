import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import dept_logo from '../assets/dept_logo.jpg';

const AboutUsDept = ({ navigation, route }) => {
  const [deptData, setDeptData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = route.params;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Department')  // Fetching from Departments collection
      .doc(userId)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          setDeptData(snapshot.data());
        } else {
          console.log('No such department found!');
          setDeptData(null);
        }
        setLoading(false);
      }, error => {
        console.error('Error fetching department details:', error);
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
        <View style={styles.deptInfo}>
          <Image source={dept_logo} style={styles.logoImage} />
          <View style={styles.deptDetails}>
            <Text style={styles.deptName}>About {deptData?.Department_name || 'Aim and Act'}</Text>
            <Text style={styles.deptDescription}>{deptData?.description || 'department of Computer Science'}</Text>
          </View>
        </View>
      </View>

      {/* About Us Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <Text style={styles.sectionText}>{deptData?.description || 'department of Computer Science'}</Text>
      </View>

      {/* Head of Department (HOD) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Head of Department (HOD)</Text>
        <Text style={styles.sectionText}>{deptData?.HOD || 'Dr. Rajiv Singh'}</Text>
      </View>

      {/* Dean Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dean</Text>
        <Text style={styles.sectionText}>{deptData?.Dean || 'Mr. C.K Jha'}</Text>
      </View>

      {/* Faculty Members */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Faculty Members</Text>
        <Text style={styles.sectionText}>{deptData?.members? `${deptData.members} Faculty Members` : '50'}</Text>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.sectionText}>Email: {deptData?.email || 'apaji@gmail.com'}</Text>
        <Text style={styles.sectionText}>Phone: {deptData?.phoneNo || 'Not provided'}</Text>
      </View>

      {/* Social Links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Follow Us</Text>
        {deptData?.website && (
          <Text style={styles.linkText} onPress={() => Linking.openURL(deptData.website)}>
            Official Website
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

  // Top Bar
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

  // Department Info in Top Bar
  deptInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  deptDetails: { flex: 1 },
  deptName: { fontSize: 20, fontWeight: 'bold', color: '#E3F2FD' },
  deptDescription: { fontSize: 14, color: '#BBDEFB' },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

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

export default AboutUsDept;
