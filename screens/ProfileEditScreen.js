import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';

const ProfileEditScreen = ({ navigation }) => {
  // State for editable student profile
  const [name, setName] = useState('John Doe');
  const [contact, setContact] = useState('123-456-7890');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSave = () => {
    // TODO: Save the updated details to database
    alert('Profile updated successfully!');
    navigation.goBack(); // Navigate back to Profile View
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      {/* Name Input */}
      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>

      {/* Contact Input */}
      <View style={styles.section}>
        <Text style={styles.label}>Contact</Text>
        <TextInput style={styles.input} value={contact} onChangeText={setContact} keyboardType="phone-pad" />
      </View>

      {/* Notification Preferences */}
      <View style={styles.section}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={() => setNotificationsEnabled(!notificationsEnabled)} />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  section: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 },
  saveButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 5, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ProfileEditScreen;
