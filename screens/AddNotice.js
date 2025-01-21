import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddNotice = ({ route, navigation }) => {
  const { clubName } = route.params;
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handlePostNotice = () => {
    if (category && description) {
      // Handle the logic for posting the notice
      console.log(`Notice posted in ${clubName} under ${category}: ${description}`);
      navigation.goBack();
    } else {
      alert('Please fill in all fields!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a New Notice to {clubName}</Text>

      {/* Category Input */}
      <Text style={styles.label}>Notice Category</Text>
      <TextInput
        style={styles.textInput}
        value={category}
        onChangeText={setCategory}
        placeholder="Enter category (e.g., Event, Announcement)"
      />

      {/* Description Input */}
      <Text style={styles.label}>Notice Description</Text>
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter the notice description..."
      />

      {/* Post Button */}
      <TouchableOpacity style={styles.button} onPress={handlePostNotice}>
        <Text style={styles.buttonText}>Post Notice</Text>
      </TouchableOpacity>
    </View>
  );
};

AddNotice.navigationOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: '#4CAF50',
    height: 60, // Adjust height to match other pages
  },
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
      <Text style={styles.backButton}>←</Text>
    </TouchableOpacity>
  ),
  headerTitle: '',
  headerRight: () => <View />, // Empty right to maintain consistency
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  backButtonContainer: {
    paddingLeft: 15,
    justifyContent: 'center',
  },
  backButton: {
    color: '#fff',
    fontSize: 25,
  },
});

export default AddNotice;
