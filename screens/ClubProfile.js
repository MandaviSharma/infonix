import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
const ClubProfile = ({ navigation,route }) => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const { userId } = route.params;
  console.log(userId);

  useEffect(() => {
    // Fetch Club Details
    const unsubscribeClub = firestore()
      .collection('Clubs')
      .doc(userId)
     // Replace 'club_id' with the actual club document ID
      .onSnapshot(doc => {
        if (doc.exists) {
          setClubName(doc.data().name || 'Club Name');
          setClubDescription(doc.data().description || 'No description available.');
        }
        else
          console.log("helllo")
      });

    // Fetch Notices in Real-Time
    const unsubscribeNotices = firestore()
    .collection('notice')
    .where('userType', '==', 'club')
    .orderBy('timestamp', 'desc')
    .onSnapshot(
      snapshot => {
        if (!snapshot.empty) {
          const fetchedNotices = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNotices(fetchedNotices);
        } else {
          setNotices([]);
        }
        setLoading(false);
      },
      error => {
        console.error('Error fetching club notices:', error);
        setLoading(false);
      }
    );

    // Cleanup listeners when component unmounts
    return () => {
      unsubscribeClub();
      unsubscribeNotices();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Club Info Section */}
      <View style={styles.clubInfo}>
        <View style={styles.logoPlaceholder} />
        <View style={styles.clubDetails}>
          <Text style={styles.clubName}>{clubName}</Text>
          <Text style={styles.clubDescription}>{clubDescription}</Text>
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
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ViewResult')}>
          <Text style={styles.navText}>Results</Text>
        </TouchableOpacity>
      </View>

      {/* Notices Section */}
      <View style={styles.postsSection}>
        <Text style={styles.sectionTitle}>Latest Posts</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : notices.length > 0 ? (
          notices.map(notice => (
            <View key={notice.id} style={[styles.card, styles.cardElevated]}>
              <Image 
                source={{ uri: notice.imageUrl || 'https://via.placeholder.com/380' }} 
                style={styles.cardImage} 
              />
              <View>
                <Text style={styles.cardTitle}>{notice.category}</Text>
                {/* <Text style={styles.cardLabel}>{new Date(notice.timestamp.toDate()).toLocaleString()}</Text> */}
                <Text style={styles.cardDescription}>{notice.description}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noNoticesText}>No notices available.</Text>
        )}
      </View>
  
      {/* Action Buttons */}
      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AddNotice')}>
          <Text style={styles.actionText}>Add a Notice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('UpdateDashboard')}>
          <Text style={styles.actionText}>Update Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Results')}>
          <Text style={styles.actionText}>Announce Result</Text>
        </TouchableOpacity>
      </View> 
    </ScrollView>
  );
};

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
  card: {
    width: 360,
    borderRadius: 6,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  cardElevated: {
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowOffset: { width: 5, height: 1 },
  },
  cardImage: {
    height: 220,
    marginBottom: 8,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  cardTitle: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardLabel: {
    color: '#000000',
    fontSize: 14,
    marginBottom: 6,
  },
  cardDescription: {
    color: '#758283',
    fontSize: 12,
    marginBottom: 12,
    marginTop: 6,
    flexShrink: 1,
  },
  noNoticesText: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 16,
    marginTop: 10,
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

export default ClubProfile;

