import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';

const ProfileEditScreen = ({ navigation }) => {
  // State for editable student profile
  const [name, setName] = useState('Student Name');
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
  container: { flex: 1, backgroundColor: '#E3F2FD', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#0D47A1' },
  section: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#1976D2' },
  input: { borderWidth: 1, borderColor: '#90CAF9', padding: 10, borderRadius: 5, backgroundColor: '#FFFFFF' },
  saveButton: { backgroundColor: '#1976D2', padding: 15, borderRadius: 5, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ProfileEditScreen;
