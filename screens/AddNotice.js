import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddNotice = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePostNotice = () => {
    if (!category || !description.trim()) {
      Alert.alert('Error', 'Please select a category and enter a description.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log(`Notice posted under ${category}: ${description}`);
      setLoading(false);
      Alert.alert('Success', 'Notice posted successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a New Notice</Text>

      <Text style={styles.label}>Notice Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Event" value="Event" />
          <Picker.Item label="Announcement" value="Announcement" />
          <Picker.Item label="Meeting" value="Meeting" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
      </View>

      <Text style={styles.label}>Notice Description</Text>
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter the notice description..."
        placeholderTextColor="#6c757d"
      />

      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: '#5a9df6' }]}
        onPress={handlePostNotice}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Posting...' : 'Post Notice'}</Text>
      </TouchableOpacity>
    </View>
  );
};

// Custom Styles with Theme Applied
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#212529',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  picker: {
    height: 50,
  },
  textInput: {
    height: 100,
    borderColor: '#ced4da',
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    color: '#212529',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddNotice;
