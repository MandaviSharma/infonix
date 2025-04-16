import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import logo from '../assets/dept_logo.jpg';

const DeptDashboard = ({ navigation, route }) => {
  const { userId } = route.params;
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deptDescription, setDeptDescription] = useState('');
  const [deptName, setDeptName] = useState('');

  useEffect(() => {
    // Fetch Notices for the Department
    const unsubscribeNotices = firestore()
      .collection('notice')
      .where('userType', '==', 'department') // Fetch only department notices
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
          console.error('Error fetching notices:', error);
          setLoading(false);
        }
      );
      const unsubscribeDept = firestore()
      .collection('Department')
      .doc(userId)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            const data = doc.data();
            setDeptName(data.Department_name || 'Aim and Act');
            setDeptDescription(data.description || 'Department of Computer Science');
            // setDeptEmail(data.email || 'No email available.');
          } else {
            console.warn("Department document does not exist!");
          }
        },
        (error) => {
          console.error("Error fetching department details:", error);
        }
      );
    return () => {
      unsubscribeNotices();
      unsubscribeDept();
    };
  }, [deptName]);

  return (
    <ScrollView style={styles.container}>
      {/* Department Info Section */}
      <View style={styles.deptInfo}>
        <Image source={logo} style={styles.deptLogo} />
        <View style={styles.deptDetails}>
          <Text style={styles.deptName}>{deptName}</Text>
          <Text style={styles.deptDescription}>{deptDescription || "No description available"}</Text>
        </View>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AboutUsDept')}>
          <Text style={styles.navText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ContactUsDept')}>
          <Text style={styles.navText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ViewResult')}>
          <Text style={styles.navText}>View Result</Text>
        </TouchableOpacity>
      </View>

    
      {/* Notices Section */}
      <View style={styles.postsSection}>
  <Text style={styles.sectionTitle}>Notices Posted</Text>

  {loading ? (
    <ActivityIndicator size="large" color="#007bff" />
  ) : notices.length > 0 ? (
    notices.map(notice => (
      <TouchableOpacity 
        key={notice.id}  // ✅ Move key here
        onPress={() => navigation.navigate('DisplayNotice', { noticeId: notice.id })}
      >
        <View style={styles.post}>
          {/* Display Notice Image (if available) */}
          {notice.imageUrl && (
            <Image source={{ uri: notice.imageUrl }} style={styles.postImage} />
          )}

          {/* Notice Title */}
          <Text style={styles.postTitle}>{notice.category || 'Untitled Notice'}</Text>

          {/* Notice Description */}
          <Text style={styles.postText}>{notice.description}</Text>

          {/* Full Notice Content */}
          {notice.content && (
            <Text style={styles.fullNotice}>{notice.content}</Text>
          )}
        </View>
      </TouchableOpacity>
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
  container: { flex: 1, backgroundColor: '#f8f9fa' },

  deptInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#007bff',
  },
  deptLogo: { width: 50, height: 50, borderRadius: 25, marginRight: 15, backgroundColor: '#fff' },
  deptDetails: { flex: 1 },
  deptName: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  deptDescription: { fontSize: 14, color: '#ffffff' },

  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navButton: { paddingVertical: 10 },
  navText: { fontSize: 16, color: '#007bff', fontWeight: 'bold' },

  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 15,
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  resultButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  postsSection: { marginTop: 20, padding: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#212529' },

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
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 5,
  },
  postText: { fontSize: 16, color: '#212529', marginBottom: 5 },
  fullNotice: { fontSize: 14, color: '#6c757d', marginTop: 5 },

  noNoticesText: { textAlign: 'center', color: '#6c757d', fontSize: 16, marginTop: 10 },
});

export default DeptDashboard;
