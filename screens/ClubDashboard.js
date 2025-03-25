import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ClubDashboard = ({ navigation }) => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const noticesSnapshot = await firestore()
          .collection('notice')
          .orderBy('timestamp', 'desc') // Fetch in latest order
          .get();

        const fetchedNotices = noticesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotices(fetchedNotices);
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

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

        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : notices.length > 0 ? (
          notices.map(notice => (
            <View key={notice.id} style={styles.post}>
              <Text style={styles.postText}>{notice.description}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noNoticesText}>No notices available.</Text>
        )}
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
  noNoticesText: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 16,
    marginTop: 10,
  },
});

export default ClubDashboard;

