import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DisplayNotice = ({ navigation, route }) => {
  const { noticeId } = route.params || {};
  if (!noticeId) {
    return <Text>Error loading notice</Text>;
  }

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [queries, setQueries] = useState([]);
  const [queryText, setQueryText] = useState('');

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const doc = await firestore().collection('notice').doc(noticeId).get();
        if (doc.exists) {
          setNotice(doc.data());
        }
      } catch (error) {
        console.error("Error fetching notice:", error);
      }
      setLoading(false);
    };

    const fetchQueries = () => {
      return firestore()
        .collection('queries')
        .where('noticeId', '==', noticeId)
        .onSnapshot(snapshot => {
          const fetchedQueries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setQueries(fetchedQueries);
        });
    };

    fetchNotice();
    const unsubscribe = fetchQueries();
    return () => unsubscribe();
  }, [noticeId]);

  const handleSendQuery = async () => {
    if (!queryText.trim()) return;
    try {
      await firestore().collection('queries').add({
        noticeId,
        text: queryText,
        userId: auth().currentUser?.userId || 'Student',
        userName: auth().currentUser?.userName || 'Student',
      });
      setQueryText('');
    } catch (error) {
      console.error("Error sending query:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />;
  }

  return (
    <FlatList
      data={queries}
      keyExtractor={(item) => item.id}
      extraData={queries}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View style={styles.container}>
          {notice ? (
            <>
              <Text style={styles.title}>{notice.category}</Text>
              <Text style={styles.clubText}>Posted By: {notice.Club_name || notice.Department_name}</Text>
              <Image source={{ uri: notice.imageUrl || 'https://via.placeholder.com/400' }} style={styles.image} />
              <Text style={styles.description}>{notice.description}</Text>
              <TextInput
                style={styles.input}
                value={queryText}
                onChangeText={setQueryText}
                placeholder="Ask a question..."
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSendQuery}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
              <Text style={styles.queryHeading}>Queries Asked</Text>
            </>
          ) : (
            <Text style={styles.errorText}>Notice not found</Text>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.queryContainer}>
          <Text style={styles.queryUser}>{item.userName}:</Text>
          <Text style={styles.queryText}>{item.text}</Text>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  queryHeading: { fontSize: 18, fontWeight: 'bold', marginBottom: 5,marginTop:20 },
  clubText: { fontSize: 16, fontWeight: '600', color: '#555', marginBottom: 5 },
  image: { width: '100%', height: 480, borderRadius: 8, marginBottom: 10, resizeMode: 'contain', borderColor: 'black' },
  description: { fontSize: 16, color: '#333', marginBottom: 20 },
  errorText: { textAlign: 'center', fontSize: 18, color: 'red', marginTop: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5, fontSize: 16 },
  sendButton: { backgroundColor: '#007bff', padding: 12, borderRadius: 5, alignItems: 'center' },
  sendButtonText: { color: '#fff', fontWeight: 'bold' },
  queryContainer: { marginTop: 10, padding: 12, backgroundColor: '#f1f1f1', borderRadius: 5 },
  queryUser: { fontWeight: 'bold', color: '#333' },
  queryText: { fontSize: 16, color: '#333', marginTop: 5 },
});

export default DisplayNotice;
