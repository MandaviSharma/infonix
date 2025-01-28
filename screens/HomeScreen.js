import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.icon}>
          <Text style={styles.iconText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>Infonix</Text>
        <TouchableOpacity onPress={() => { /* open search */ }} style={styles.icon}>
          <Text style={styles.iconText}></Text>
        </TouchableOpacity>
      </View>

      {/* Notices Carousel */}
      <View style={styles.carousel}>
        <Text style={styles.carouselTitle}>Latest Official Notices</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.notice}><Text style={styles.noticeText}>Notice 1</Text></View>
          <View style={styles.notice}><Text style={styles.noticeText}>Notice 2</Text></View>
          <View style={styles.notice}><Text style={styles.noticeText}>Notice 3</Text></View>
        </ScrollView>
      </View>
      <View style={styles.carousel}>
        <Text style={styles.carouselTitle}>Latest Club Notices</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.notice}><Text style={styles.noticeText}>Notice 1</Text></View>
          <View style={styles.notice}><Text style={styles.noticeText}>Notice 2</Text></View>
          <View style={styles.notice}><Text style={styles.noticeText}>Notice 3</Text></View>
        </ScrollView>
      </View>

      {/* Clubs Section */}
      <View style={styles.clubsSection}>
        <Text style={styles.sectionTitle}>Clubs</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.clubButton}
            onPress={() => navigation.navigate('ClubDashboard', { clubName: 'Club A' })}
          >
            <Text style={styles.clubName}>Club A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clubButton}
            onPress={() => navigation.navigate('ClubDashboard', { clubName: 'Club B' })}
          >
            <Text style={styles.clubName}>Club B</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Categories Section */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesRow}>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Sports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Academics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Literature</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#007bff',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  icon: { padding: 5 },
  iconText: { color: '#fff', fontSize: 20 },
  logo: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  carousel: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  carouselTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#212529' },
  notice: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginRight: 15,
    borderRadius: 10,
    width: 220,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  noticeText: { color: '#212529' },
  clubsSection: { marginTop: 20, padding: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#212529' },
  clubButton: {
    backgroundColor: '#0056b3',
    padding: 15,
    marginRight: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  clubName: { color: '#fff', fontSize: 18 },
  categoriesSection: { marginTop: 20, padding: 10 },
  categoriesRow: { flexDirection: 'row', justifyContent: 'space-between' },
  categoryButton: {
    backgroundColor: '#0056b3',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});

export default HomeScreen;
