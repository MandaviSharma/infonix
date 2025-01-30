import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Default role is student
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Login and Navigate to Home
  const handleLogin = () => {
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);

    // Simulating a network request (e.g., login)
    setTimeout(() => {
      setLoading(false);
      navigation.replace('MainApp', { userType });
    }, 2000);
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

      {/* Display error message if any */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* User Type Selection */}
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
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
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
    justifyContent: 'space-around',
    width: '100%',
  },
  userTypeButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '45%',
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
