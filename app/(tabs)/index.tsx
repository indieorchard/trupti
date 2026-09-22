import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View as RNView } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function DarshanScreen() {
  const [streak, setStreak] = useState(7);
  const [meditating, setMeditating] = useState(false);

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      {/* Header Greeting */}
      <View style={styles.welcomeBanner}>
        <Text style={styles.appTitle}>🪔 Trupti</Text>
        <Text style={styles.appSubtitle}>Your gateway to Spirituality</Text>
      </View>

      {/* Daily Thought / Shloka Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTag}>DAILY INSPIRATION</Text>
          <Text style={styles.dateText}>Today's Darshan</Text>
        </View>
        <Text style={styles.shlokaSanskrit}>
          ॐ असतो मा सद्गमय ।{'\n'}तमसो मा ज्योतिर्गमय ।{'\n'}मृत्योर्मा अमृतं गमय ॥
        </Text>
        <Text style={styles.shlokaTranslation}>
          "Lead us from the unreal to the real, from darkness to light, from death to immortality."
        </Text>
        <Text style={styles.sourceText}>— Brihadaranyaka Upanishad</Text>
      </View>

      {/* Sadhana Tracker */}
      <View style={styles.sadhanaCard}>
        <View style={styles.sadhanaRow}>
          <RNView>
            <Text style={styles.sadhanaTitle}>Daily Sadhana</Text>
            <Text style={styles.sadhanaSubtitle}>
              {meditating ? 'Meditation in progress...' : `${streak} Day Streak 🔥`}
            </Text>
          </RNView>
          <TouchableOpacity
            style={[styles.actionBtn, meditating && styles.actionBtnActive]}
            onPress={() => setMeditating(!meditating)}>
            <Text style={styles.actionBtnText}>
              {meditating ? 'Pause ⏸' : 'Start Chanting 🕉'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Access Categories */}
      <Text style={styles.sectionHeader}>Quick Access</Text>
      <View style={styles.grid}>
        <TouchableOpacity style={styles.gridItem}>
          <Text style={styles.gridEmoji}>🔔</Text>
          <Text style={styles.gridTitle}>Morning Aartis</Text>
          <Text style={styles.gridSubtitle}>12 Prayers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem}>
          <Text style={styles.gridEmoji}>🧘</Text>
          <Text style={styles.gridTitle}>Chants & Mantras</Text>
          <Text style={styles.gridSubtitle}>Gayatri & Om</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem}>
          <Text style={styles.gridEmoji}>📜</Text>
          <Text style={styles.gridTitle}>Sacred Texts</Text>
          <Text style={styles.gridSubtitle}>Chalisa & Gita</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem}>
          <Text style={styles.gridEmoji}>📅</Text>
          <Text style={styles.gridTitle}>Panchang</Text>
          <Text style={styles.gridSubtitle}>Tithi & Muhurat</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  welcomeBanner: {
    marginBottom: 20,
    alignItems: 'center',
    paddingVertical: 12,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  appSubtitle: {
    fontSize: 15,
    opacity: 0.7,
    marginTop: 4,
    fontWeight: '500',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(230, 160, 40, 0.3)',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
    letterSpacing: 0.8,
  },
  dateText: {
    fontSize: 12,
    opacity: 0.6,
  },
  shlokaSanskrit: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28,
    textAlign: 'center',
    marginVertical: 10,
    color: '#B45309',
  },
  shlokaTranslation: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 22,
    textAlign: 'center',
    opacity: 0.85,
    marginTop: 6,
  },
  sourceText: {
    fontSize: 12,
    textAlign: 'right',
    opacity: 0.6,
    marginTop: 10,
  },
  sadhanaCard: {
    borderRadius: 14,
    padding: 18,
    marginBottom: 24,
    backgroundColor: 'rgba(217, 119, 6, 0.08)',
  },
  sadhanaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  sadhanaTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  sadhanaSubtitle: {
    fontSize: 13,
    opacity: 0.75,
    marginTop: 2,
  },
  actionBtn: {
    backgroundColor: '#D97706',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  actionBtnActive: {
    backgroundColor: '#059669',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    backgroundColor: 'transparent',
  },
  gridItem: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    backgroundColor: 'rgba(120, 120, 128, 0.05)',
  },
  gridEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  gridTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  gridSubtitle: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
});
