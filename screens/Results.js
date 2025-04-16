import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Results = ({ navigation, route }) => {
  const { userId, userType } = route.params; // userId is the club/department ID
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [numQualified, setNumQualified] = useState('');
  const [qualifiedStudents, setQualifiedStudents] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [googleSheetLink, setGoogleSheetLink] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Function to add student names
  const addStudent = () => {
    if (studentName.trim() === '') {
      Alert.alert('Error', 'Student name cannot be empty.');
      return;
    }
    if (qualifiedStudents.length >= 10) {
      Alert.alert('Limit Reached', 'You can only add up to 10 students. Use Google Sheets for more.');
      return;
    }
    setQualifiedStudents([...qualifiedStudents, studentName]);
    setStudentName('');
  };

  // Function to submit results
  const submitResult = async () => {
    if (!eventName || !eventDate || !numQualified) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      await firestore().collection('Results').add({
        clubOrDeptId: userId,
        eventName,
        eventDate,
        numQualified: parseInt(numQualified),
        qualifiedStudents,
        googleSheetLink: googleSheetLink || '',
        additionalNotes,
        timestamp: firestore.FieldValue.serverTimestamp(),
        userType,
      });

      Alert.alert('Success', 'Result has been announced.');
      navigation.goBack();
    } catch (error) {
      console.error('Error submitting result:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Announce Results</Text>

      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />

      <TextInput
        style={styles.input}
        placeholder="Event Date (DD/MM/YYYY)"
        value={eventDate}
        onChangeText={setEventDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Number of Students Qualified"
        keyboardType="numeric"
        value={numQualified}
        onChangeText={setNumQualified}
      />

      <Text style={styles.sectionTitle}>Qualified Students (Max: 10)</Text>
      {qualifiedStudents.map((name, index) => (
        <Text key={index} style={styles.studentName}>{index + 1}. {name}</Text>
      ))}

      <View style={styles.addStudentContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Enter Student Name"
          value={studentName}
          onChangeText={setStudentName}
        />
        <TouchableOpacity style={styles.addButton} onPress={addStudent}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {qualifiedStudents.length >= 10 && (
        <TextInput
          style={styles.input}
          placeholder="Google Sheet Link"
          value={googleSheetLink}
          onChangeText={setGoogleSheetLink}
        />
      )}

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Additional Notes (Optional)"
        value={additionalNotes}
        onChangeText={setAdditionalNotes}
      />

      <TouchableOpacity style={styles.submitButton} onPress={submitResult}>
        <Text style={styles.submitButtonText}>Submit Result</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#007bff',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,

  },
  studentName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  addStudentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 12,
    marginLeft: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Results;
