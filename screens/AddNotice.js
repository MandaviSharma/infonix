




import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const AddNotice = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [noticeImage, setNoticeImage] = useState(null);

  // Function to handle image selection
  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', 'Something went wrong with the image picker');
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        console.log('Selected Image URI:', imageUri); // Debug log
        setNoticeImage(imageUri);
      }
    });
  };

  // Function to handle posting the notice
  const handlePostNotice = async () => {
    if (!category || !description.trim()) {
      Alert.alert('Error', 'Please select a category and enter a description.');
      return;
    }

    if (!noticeImage) {
      Alert.alert('Error', 'Please upload an image for the notice.');
      return;
    }

    setLoading(true);

    try {
      // Upload image to Firebase Storage
      // const fileName = noticeImage.split('/').pop();
      // const reference = storage().ref(`notices/${fileName}`);
      // await reference.putFile(noticeImage);

      // // Get download URL
      // const imageUrl = await reference.getDownloadURL();

      // Save notice details in Firestore
      await firestore().collection('notice').add({
        category,
        description,
        imageUrl:noticeImage, // Directly storing the image URI
        //timestamp: firestore.FieldValue.serverTimestamp(),
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      setLoading(false);
      Alert.alert('Success', 'Notice posted successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      setLoading(false);
      console.error('Error posting notice:', error);
      Alert.alert('Error', 'Failed to post notice. Please try again.');
    }
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

      {/* Button to upload image */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleSelectImage}>
        <Text style={styles.uploadButtonText}>Upload Notice Image</Text>
      </TouchableOpacity>

      {/* Display selected image */}
      {noticeImage && (
        <Image source={{ uri: noticeImage }} style={styles.selectedImage} />
      )}

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

// Custom Styles
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
  uploadButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
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


/*
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNotice = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [noticeImage, setNoticeImage] = useState(null);

  const handleSelectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
           if (response.didCancel) {
             console.log('User cancelled image picker');
           } else if (response.errorCode) {
             Alert.alert('Error', 'Something went wrong with the image picker');
           } else if (response.assets && response.assets.length > 0) {
             const imageUri = response.assets[0].uri;
             console.log('Selected Image URI:', imageUri); // Debug log
             setNoticeImage(imageUri);
           }
         });
       };

  const handlePostNotice = async () => {
    if (!category || !description.trim()) {
      Alert.alert('Error', 'Please select a category and enter a description.');
      return;
    }
    if (!noticeImage) {
      Alert.alert('Error', 'Please upload an image for the notice.');
      return;
    }
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('USERID'); 
      console.log(userId)// Fetch club ID
      if (!userId) {
        throw new Error('User ID not found');
      }
      
      // Upload image to Firebase Storage
      // const fileName = noticeImage.split('/').pop();
      // const storageRef = storage().ref(`notices/${fileName}`);
      // await storageRef.putFile(noticeImage);
      // const imageUrl = await storageRef.getDownloadURL();
      
      // Save notice details in Firestore
      await firestore().collection('notices').add({
        clubId: userId,
        category,
        description,
        imageUrl:noticeImage,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      setLoading(false);
      Alert.alert('Success', 'Notice posted successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      setLoading(false);
      console.error('Error posting notice:', error);
      Alert.alert('Error', 'Failed to post notice. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a New Notice</Text>

      <Text style={styles.label}>Notice Category</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
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

      <TouchableOpacity style={styles.uploadButton} onPress={handleSelectImage}>
        <Text style={styles.uploadButtonText}>Upload Notice Image</Text>
      </TouchableOpacity>

      {noticeImage && <Image source={{ uri: noticeImage }} style={styles.selectedImage} />}

      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: '#5a9df6' }]}
        onPress={handlePostNotice}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Post Notice</Text>}
      </TouchableOpacity>
    </View>
  );
};

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
  uploadButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
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

export default AddNotice;*/
