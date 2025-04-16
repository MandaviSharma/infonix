import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const CategoryNoticesScreen = ({ navigation, route }) => {
  const { category } = route.params;
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Notices by Category
    const unsubscribe = firestore()
      .collection('notice')
      .where('category', '==', category)
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
          console.error('Error fetching category notices:', error);
          setLoading(false);
        }
      );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [category]);

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
          <Text style={styles.iconText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>{category} Notices</Text>
        <View style={styles.icon} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : notices.length > 0 ? (
          notices.map(notice => (
            <View key={notice.id} style={[styles.card, styles.cardElevated]}>
              <Image 
                source={{ uri: notice.imageUrl || 'https://via.placeholder.com/380' }} 
                style={styles.cardImage} 
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{notice.title}</Text>
                <Text style={styles.cardDescription}>{notice.description}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noNoticesText}>No notices available for this category.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContainer: { padding: 15, alignItems: 'center' },

  /* Top Bar */
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#007bff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  icon: { padding: 5 },
  iconText: { color: '#fff', fontSize: 20 },
  logo: { fontSize: 22, color: '#fff', fontWeight: 'bold' },

  /* Notice Cards */
  card: {
    width: '95%',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  cardElevated: {
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardImage: {
    height: 200,
    width: '100%',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },

  /* No Notices Text */
  noNoticesText: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 16,
    marginTop: 20,
  },
});

export default CategoryNoticesScreen;
