import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ViewResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const snapshot = await firestore().collection('Results').orderBy('timestamp', 'desc').get();
        const resultsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResults(resultsData);
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results Announced</Text>
      {results.length === 0 ? (
        <Text style={styles.noResults}>No results have been announced yet.</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.resultCard}>
              <Text style={styles.eventName}>{item.eventName}</Text>
              <Text style={styles.details}>📅 Date: {item.eventDate}</Text>
              <Text style={styles.details}>🎓 Qualified Students: {item.numQualified}</Text>

              {item.qualifiedStudents.length > 0 && (
                <View>
                  <Text style={styles.studentTitle}>🏆 Qualified Students:</Text>
                  {item.qualifiedStudents.map((name, index) => (
                    <Text key={index} style={styles.studentName}>{index + 1}. {name}</Text>
                  ))}
                </View>
              )}

              {item.googleSheetLink ? (
                <TouchableOpacity onPress={() => Linking.openURL(item.googleSheetLink)}>
                  <Text style={styles.link}>📄 View Full List (Google Sheet)</Text>
                </TouchableOpacity>
              ) : null}

              {item.additionalNotes ? (
                <Text style={styles.notes}>📝 Notes: {item.additionalNotes}</Text>
              ) : null}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#007bff',
  },
  noResults: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  studentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  studentName: {
    fontSize: 14,
    color: '#444',
    marginLeft: 10,
  },
  link: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  notes: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default ViewResult;
