import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Alert } from 'react-native';

const ClubProfile = ({ navigation,route }) => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const { userId } = route.params;
  console.log(userId);

  useEffect(() => {
    // Fetch Club Details
    if (!userId) {
      console.error("No userId provided!");
      return;
    }
    // Fetch Club Details
    const unsubscribeClub = firestore()
      .collection('Clubs')
      .doc(userId)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            console.log("Club Data:", doc.data());
            const data = doc.data();
            setClubName(data.Club_name || 'Club Name');
            setClubDescription(data.description || 'No description available.');
          } else {
            console.warn("Club document does not exist!");
          }
        },
        (error) => {
          console.error("Error fetching club details:", error);
        }
      );


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
  }, [userId]);

  const handleDeleteNotice = async (noticeId) => {
    Alert.alert('Delete Notice', 'Are you sure you want to delete this notice?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await firestore().collection('notice').doc(noticeId).delete();
            setNotices(prevNotices => prevNotices.filter(notice => notice.id !== noticeId));
            Alert.alert('Deleted!', 'The notice has been deleted.');
          } catch (error) {
            console.error('Error deleting notice:', error);
            Alert.alert('Error', 'Failed to delete notice.');
          }
        },
      },
    ]);
  };

  return (
<MenuProvider>
  <ScrollView style={styles.container}>
        {/* Club Info Section */}
        <View style={styles.clubInfo}>
          {/* Club Logo */}
          <Image
            source={require('../assets/club_logo.jpg')}
            style={styles.clubLogo}
            resizeMode="contain"
          />
          <View style={styles.clubDetails}>
          <View style={styles.cardHeader}>
            <Text style={styles.clubName}>{clubName}</Text>
            <Menu>
                      <MenuTrigger>
                                  <Text style={styles.iconText}>☰</Text>
                      </MenuTrigger>
                      <MenuOptions>
                        <MenuOption onSelect={() => navigation.navigate('UpdateDashboard')}>
                          <Text style={styles.menuOption}>Update Dashboard</Text>
                        </MenuOption>
                      </MenuOptions>
              </Menu>
              </View>
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
              <ActivityIndicator size='large' color='#007bff' />
            ) : notices.length > 0 ? (
              notices.map(notice => (
                <TouchableOpacity onPress={()=>navigation.navigate('DisplayNotice',{noticeId:notice.id})}>
                <View key={notice.id} style={[styles.card, styles.cardElevated]}>
                  <Image source={{ uri: notice.imageUrl || 'https://via.placeholder.com/380' }} style={styles.cardImage} />
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{notice.category}</Text>
                    <Menu>
                      <MenuTrigger>
                                  <Text >☰</Text>
                      </MenuTrigger>
                      <MenuOptions>
                        <MenuOption onSelect={() => navigation.navigate('UpdateNotice', {noticeId: notice.id})}>
                          <Text style={styles.menuOption}>Edit</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => handleDeleteNotice(notice.id)}>
                          <Text style={styles.menuOptionDelete}>Delete</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardDescription}>{notice.description}</Text>
                  </View>
                </View>
                </TouchableOpacity>
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
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Results')}>
            <Text style={styles.actionText}>Announce Result</Text>
          </TouchableOpacity>
        </View> 
      </ScrollView>
    </MenuProvider>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  clubInfo: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#007bff' },
  logoPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#0056b3', marginRight: 15 },
  clubDetails: { flex: 1 },
  clubName: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  clubDescription: { fontSize: 14, color: '#fff' },
  postsSection: { marginTop: 20, padding: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#212529' },
  card: { width: 360, borderRadius: 6, marginVertical: 12, marginHorizontal: 16, backgroundColor: '#FFFFFF', elevation: 3, shadowOffset: { width: 5, height: 1 } },
  cardImage: { height: 220, marginBottom: 8, borderTopLeftRadius: 6, borderTopRightRadius: 6 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 },
  cardTitle: { color: '#000000', fontSize: 18, fontWeight: 'bold' },
  menuIcon: { padding: 5 },
  iconText: { color: '#fff', fontSize: 20 },
  cardContent: { padding: 10 },
  cardDescription: { color: '#758283', fontSize: 14, marginBottom: 12 },
  noNoticesText: { textAlign: 'center', color: '#6c757d', fontSize: 16, marginTop: 10 },
  actionsSection: { marginTop: 20, padding: 10 },
  actionButton: { backgroundColor: '#007bff', padding: 15, marginBottom: 10, borderRadius: 10 },
  actionText: { color: '#fff', fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
  menuOption: { padding: 10, fontSize: 16 },
  menuOptionDelete: { padding: 10, fontSize: 16, color: 'red' },
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
  clubLogo: {
    width: 80,
    height: 80,
    borderRadius: 40, // Circular logo
    marginRight: 15,
  },
  cardElevated: {
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowOffset: { width: 5, height: 1 },
  },
});
export default ClubProfile;

