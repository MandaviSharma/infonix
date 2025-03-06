import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Default role is student
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const signin_student = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert("Success", "Student logged in");
        saveData('Student');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const signin_club = () => {
    firestore()
      .collection('Clubs')
      .where('Email', '==', email)
      .where('Password', '==', password)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length === 0) {
          Alert.alert('Error', 'Club not found');
        } else {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          const docId = userDoc.id;
          if (userData.Password === password) {
            saveData(userData.Club_name, docId);
            Alert.alert('Success', 'Club logged in');
          } else {
            Alert.alert('Error', 'Incorrect Password');
          }
        }
      })
      .catch(error => console.log(error));
  };

  const signin_department = () => {
    firestore()
      .collection('Department')
      .where('email', '==', email)
      .where('password', '==', password)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length === 0) {
          Alert.alert('Error', 'Department not found');
        } else {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          const docId = userDoc.id;
          if (userData.password === password) {
            saveData(userData.Department_name, docId);
            Alert.alert('Success', 'Department logged in');
          } else {
            Alert.alert('Error', 'Incorrect Password');
          }
        }
      })
      .catch(error => console.log(error));
  };

  const saveData = async (name, userId = '') => {
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('NAME', name);
    if (userId) {
      await AsyncStorage.setItem('USERID', userId);
    }
    navigation.replace('MainApp', { userType,userId,name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#666"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.userTypeContainer}>
        <Text style={styles.userTypeText}>I am logging in as a:</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.userTypeButton, userType === 'student' && styles.selectedButton]}
            onPress={() => setUserType('student')}
          >
            <Text style={styles.buttonText}>Student</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.userTypeButton, userType === 'club' && styles.selectedButton]}
            onPress={() => setUserType('club')}
          >
            <Text style={styles.buttonText}>Club</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.userTypeButton, userType === 'department' && styles.selectedButton]}
            onPress={() => setUserType('department')}
          >
            <Text style={styles.buttonText}>Dept</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (userType === 'student') signin_student();
          else if (userType === 'club') signin_club();
          else signin_department();
        }}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Log In'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Signup')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    fontSize: 16,
    color: '#212529',
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007bff',
    marginTop: 15,
    fontSize: 16,
  },
  userTypeContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  userTypeText: {
    fontSize: 16,
    color: '#212529',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  userTypeButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;

