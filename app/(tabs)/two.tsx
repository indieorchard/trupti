import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, FlatList, View as RNView } from 'react-native';

import { Text, View } from '@/components/Themed';

interface ScriptureItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  icon: string;
}

const LIBRARY_ITEMS: ScriptureItem[] = [
  { id: '1', title: 'Gayatri Mantra (108 Chants)', category: 'Mantras', duration: '15 mins', icon: '🕉️' },
  { id: '2', title: 'Maha Mrityunjaya Mantra', category: 'Mantras', duration: '11 mins', icon: '🔱' },
  { id: '3', title: 'Hanuman Chalisa', category: 'Stotrams', duration: '8 mins', icon: '🚩' },
  { id: '4', title: 'Shri Suktam', category: 'Vedic Chants', duration: '12 mins', icon: '🪷' },
  { id: '5', title: 'Shiv Tandav Stotram', category: 'Stotrams', duration: '6 mins', icon: '🌙' },
  { id: '6', title: 'Bhagavad Gita - Chapter 2', category: 'Scriptures', duration: '25 mins', icon: '📖' },
  { id: '7', title: 'Pranayama & Breath Flow', category: 'Meditation', duration: '10 mins', icon: '🧘' },
  { id: '8', title: 'Ganga Aarti (Evening)', category: 'Aartis', duration: '9 mins', icon: '🪔' },
];

export default function LibraryScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const categories = ['All', 'Mantras', 'Stotrams', 'Scriptures', 'Meditation', 'Aartis'];

  const filteredItems = selectedCategory === 'All'
    ? LIBRARY_ITEMS
    : LIBRARY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <View style={styles.container}>
      {/* Category Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
        style={styles.filterContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.pill, selectedCategory === cat && styles.pillActive]}
            onPress={() => setSelectedCategory(cat)}>
            <Text
              style={[
                styles.pillText,
                selectedCategory === cat && styles.pillTextActive,
              ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Library List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const isPlaying = playingId === item.id;
          return (
            <TouchableOpacity
              style={[styles.listItem, isPlaying && styles.listItemActive]}
              onPress={() => setPlayingId(isPlaying ? null : item.id)}>
              <Text style={styles.itemEmoji}>{item.icon}</Text>
              <RNView style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.category} • {item.duration}</Text>
              </RNView>
              <RNView style={styles.playBadge}>
                <Text style={styles.playText}>{isPlaying ? '⏸' : '▶'}</Text>
              </RNView>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    maxHeight: 52,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  filterScroll: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(120, 120, 128, 0.2)',
    backgroundColor: 'transparent',
  },
  pillActive: {
    backgroundColor: '#D97706',
    borderColor: '#D97706',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.7,
  },
  pillTextActive: {
    color: '#FFFFFF',
    opacity: 1,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    backgroundColor: 'rgba(120, 120, 128, 0.04)',
  },
  listItemActive: {
    borderColor: '#D97706',
    backgroundColor: 'rgba(217, 119, 6, 0.08)',
  },
  itemEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  itemSubtitle: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 3,
  },
  playBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(217, 119, 6, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playText: {
    fontSize: 13,
    color: '#D97706',
  },
});
