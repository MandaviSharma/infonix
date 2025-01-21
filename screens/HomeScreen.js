//homescreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.icon}>
          <Text>☰</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>Infonix</Text>
        <TouchableOpacity onPress={() => { /* open search */ }} style={styles.icon}>
          <Text>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Notices Carousel */}
      <View style={styles.carousel}>
        <Text style={styles.carouselTitle}>Latest Official Notices</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.notice}><Text>Notice 1</Text></View>
          <View style={styles.notice}><Text>Notice 2</Text></View>
          <View style={styles.notice}><Text>Notice 3</Text></View>
        </ScrollView>
      </View>
      <View style={styles.carousel}>
              <Text style={styles.carouselTitle}>Latest Club Notices</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.notice}><Text>Notice 1</Text></View>
                <View style={styles.notice}><Text>Notice 2</Text></View>
                <View style={styles.notice}><Text>Notice 3</Text></View>
              </ScrollView>
            </View>

      {/* Clubs Section */}
      <View style={styles.clubsSection}>
        <Text style={styles.sectionTitle}>Clubs</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.clubButton} onPress={() => navigation.navigate('ClubDashboard', { clubName: 'Club A' })}>
            <Text style={styles.clubName}>Club A</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clubButton} onPress={() => navigation.navigate('ClubDashboard', { clubName: 'Club B' })}>
            <Text style={styles.clubName}>Club B</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Categories Section */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesRow}>
          <TouchableOpacity style={styles.categoryButton}><Text style={styles.categoryText}>Sports</Text></TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}><Text style={styles.categoryText}>Academics</Text></TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}><Text style={styles.categoryText}>Literature</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#4CAF50' },
  icon: { padding: 5 },
  logo: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  carousel: { marginTop: 20, padding: 10 },
  carouselTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  notice: { backgroundColor: '#f0f0f0', padding: 15, marginRight: 10, borderRadius: 10, width: 200 },
  clubsSection: { marginTop: 20, padding: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  clubButton: { backgroundColor: '#4CAF50', padding: 10, marginRight: 10, borderRadius: 10 },
  clubName: { color: '#fff', fontSize: 16 },
  categoriesSection: { marginTop: 20, padding: 10 },
  categoriesRow: { flexDirection: 'row', justifyContent: 'space-between' },
  categoryButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 10, flex: 1, marginRight: 10 },
  categoryText: { color: '#fff', textAlign: 'center', fontSize: 14 },
});

export default HomeScreen;