import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import logo from '../assets/logo.png'; 
const HomeScreen = ({ navigation, route }) => {
  const [noticesc, setNoticesc] = useState([]);
  const [noticesd, setNoticesd] = useState([]);
  const [loadingc, setLoadingc] = useState(true);
  const [loadingd, setLoadingd] = useState(true);
  const categories = ['Sports', 'Academics', 'Cultural', 'Technical', 'Others'];

  useEffect(() => {
    const unsubscribeNotices = firestore()
      .collection('notice')
      .where('userType', '==', 'club')
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        snapshot => {
          if (!snapshot.empty) {
            const fetchedNoticesc = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setNoticesc(fetchedNoticesc);
          } else {
            setNoticesc([]);
          }
          setLoadingc(false);
        },
        error => {
          console.error('Error fetching club notices:', error);
          setLoadingc(false);
        }
      );
    const unsubscribeNoticesdept = firestore()
      .collection('notice')
      .where('userType', '==', 'department')
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        snapshot => {
          if (!snapshot.empty) {
            const fetchedNoticesd = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setNoticesd(fetchedNoticesd);
          } else {
            setNoticesd([]);
          }
          setLoadingd(false);
        },
        error => {
          console.error('Error fetching department notices:', error);
          setLoadingd(false);
        }
      );
    return () => {
      unsubscribeNotices();
      unsubscribeNoticesdept();
    };
  }, []);
  return (
    <ScrollView style={styles.container}>
    {/* Top Bar */}
    <View style={styles.topBar}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.icon}>
        <Text style={styles.iconText}>☰</Text>
      </TouchableOpacity>
      <Text style={styles.logo}>Infonix</Text>
      {/* Logo Image */}
      <Image source={logo} style={styles.logoImage} />
    </View>
      {/* Notices Carousel */}
      <View style={styles.carousel}>
        <Text style={styles.carouselTitle}>Recent Club Notices</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {loadingc ? (
                    <ActivityIndicator size="large" color="#007bff" />
                  ) : noticesc.length > 0 ? (
                    noticesc.map(notice => (
                      <TouchableOpacity onPress={()=>navigation.navigate('DisplayNotice',{noticeId:notice.id})}>
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
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={styles.noNoticesText}>No notices available.</Text>
                  )}
        </ScrollView>
      </View>
      <View style={styles.carousel}>
        <Text style={styles.carouselTitle}>Recent Official Notices</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {loadingd ? (
                    <ActivityIndicator size="large" color="#007bff" />
                  ) : noticesd.length > 0 ? (
                    noticesd.map(notice => (
                      <TouchableOpacity onPress={()=>navigation.navigate('DisplayNotice',{noticeId:notice.id})}>
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
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={styles.noNoticesText}>No notices available.</Text>
                  )}
        </ScrollView>
      </View>

      {/* Clubs Section */}
      <View style={styles.clubsSection}>
        <Text style={styles.sectionTitle}>Clubs/Departments</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.clubButton}
            onPress={() => navigation.navigate('ClubDashboard', { clubName: 'Algobyte',userId:'k8sjV4l5XLutzj3OAMtY' })}
          >
            <Text style={styles.clubName}>Algobyte</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clubButton}
            onPress={() => navigation.navigate('DeptDashboard', { deptName: 'Aim and Act', userId:'WChffex9L1ZZnJMN9ohn'})}
          >
            <Text style={styles.clubName}>Aim and Act</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Categories Section */}
      <View style={styles.categoriesSection}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={styles.clubButton}
            onPress={() => navigation.navigate('CategoryNoticesScreen', { category })}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor:'rgb(18, 8, 91)',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  logoImage: {
    width: 60,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  icon: { padding: 5 },
  iconText: { color: '#fff', fontSize: 25 },
  logo: { fontSize: 30, color: '#fff', fontWeight: 'bold' },
  carousel: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  carouselTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#212529' },
  notice: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginRight: 15,
    borderRadius: 10,
    width: 220,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  noticeText: { color: '#212529' },
  clubsSection: { marginTop: 20, padding: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#212529' },
  clubButton: {
    backgroundColor: '#0056b3',
    padding: 15,
    marginRight: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  clubName: { color: '#fff', fontSize: 18 },
  categoriesSection: { marginTop: 20, padding: 10 },
  categoriesRow: { flexDirection: 'row', justifyContent: 'space-between' },
  categoryButton: {
    backgroundColor: '#0056b3',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  card: {
    width: 360,
    borderRadius: 6,
    marginVertical: 12,
    marginHorizontal: 16,
    backgroundColor:'#FFggFF',
  },
  cardElevated: {
    backgroundColor: '#b0e0e6',
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
    marginLeft: 130,
  },
  cardLabel: {
    color: '#000000',
    fontSize: 14,
    marginBottom: 6,
  },
  cardDescription: {
    color: '#000000',
    fontSize: 15,
    marginBottom: 12,
    marginTop: 6,
    marginLeft: 6,
    flexShrink: 1,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryButton: {
    backgroundColor: '#007bff',
    padding: 15,
    margin: 8,
    borderRadius: 6,
    alignItems: 'center',
    width: '45%',
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

