
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

const UpdateNotice = ({ navigation, route }) => {
  const { noticeId } = route.params;
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [noticeImage, setNoticeImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNoticeDetails = async () => {
      try {
        const doc = await firestore().collection('notice').doc(noticeId).get();
        if (doc.exists) {
          const data = doc.data();
          setCategory(data.category);
          setDescription(data.description);
          setExistingImageUrl(data.imageUrl);
        }
      } catch (error) {
        console.error('Error fetching notice:', error);
      }
    };
    fetchNoticeDetails();
  }, [noticeId]);

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', 'Something went wrong with the image picker');
      } else if (response.assets && response.assets.length > 0) {
        setNoticeImage(response.assets[0].uri);
      }
    });
  };

  const handleUpdateNotice = async () => {
    if (!category || !description.trim()) {
      Alert.alert('Error', 'Please select a category and enter a description.');
      return;
    }
    setLoading(true);
    try {
      await firestore().collection('notice').doc(noticeId).update({
        category,
        description,
        imageUrl: noticeImage || existingImageUrl,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
      setLoading(false);
      Alert.alert('Success', 'Notice updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      setLoading(false);
      console.error('Error updating notice:', error);
      Alert.alert('Error', 'Failed to update notice. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Notice</Text>
      <Text style={styles.label}>Notice Category</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
         <Picker.Item label="Select Category" value="" />
                   <Picker.Item label="Sports" value="Sports" />
                   <Picker.Item label="Academics" value="Academics" />
                   <Picker.Item label="Cultural" value="Cultural" />
                   <Picker.Item label="Literature" value="Literature" />
                   <Picker.Item label="Technical" value="Technical" />
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
        <Text style={styles.uploadButtonText}>Upload New Image</Text>
      </TouchableOpacity>
      {noticeImage || existingImageUrl ? (
        <Image source={{ uri: noticeImage || existingImageUrl }} style={styles.selectedImage} />
      ) : null}
      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: '#5a9df6' }]}
        onPress={handleUpdateNotice}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Update Notice'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  header: { fontSize: 22, fontWeight: 'bold', color: '#212529', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 10, color: '#212529' },
  pickerContainer: { borderWidth: 1, borderColor: '#ced4da', borderRadius: 5, backgroundColor: '#fff', marginBottom: 20 },
  picker: { height: 50 },
  textInput: { height: 100, borderColor: '#ced4da', borderWidth: 1, backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 20, color: '#212529', textAlignVertical: 'top' },
  uploadButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 20 },
  uploadButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  selectedImage: { width: 200, height: 200, marginBottom: 20, borderRadius: 10 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default UpdateNotice;