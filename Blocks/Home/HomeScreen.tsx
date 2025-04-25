import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, ActivityIndicator,
  StyleSheet, Switch, TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Scale, { verticalScale } from '../../Component/Scale';
import CustomHeader from '../../Component/CustomHeader';
import { useGetTasksQuery } from '../../Services/tasksApi'; // RTK Query hook

export default function HomeScreen({ navigation }) {
  const { data: courses = [], error, isLoading, refetch } = useGetTasksQuery('');

  const [processedCourses, setProcessedCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState('All');
  const [longTitlesOnly, setLongTitlesOnly] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [search, setSearch] = useState('');
  const [instructors, setInstructors] = useState([]);

  // Enhance data with wordCount
  useEffect(() => {
    if (courses.length) {
      const enhanced = courses.map(c => ({
        ...c,
        wordCount: c.title.trim().split(/\s+/).length,
      }));
      setProcessedCourses(enhanced);
    }
  }, [courses]);

  const extractInstructors = useCallback((data) => {
    const unique = [...new Set(data.map(c => c.userId))];
    setInstructors(unique);
  }, []);

  const applyFilters = useCallback(() => {
    let data = [...processedCourses];
    if (selectedInstructor !== 'All') {
      data = data.filter(c => c.userId === parseInt(selectedInstructor));
    }
    if (longTitlesOnly) {
      data = data.filter(c => c.wordCount >= 5);
    }
    if (search) {
      data = data.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    data.sort((a, b) =>
      sortAsc ? a.wordCount - b.wordCount : b.wordCount - a.wordCount
    );
    setFilteredCourses(data);
  }, [processedCourses, selectedInstructor, longTitlesOnly, sortAsc, search]);

  useEffect(() => {
    if (processedCourses.length) {
      extractInstructors(processedCourses);
    }
  }, [processedCourses, extractInstructors]);

  useFocusEffect(
    useCallback(() => {
      if (processedCourses.length) {
        applyFilters();
      }
    }, [processedCourses, applyFilters])
  );

  const handleNavigate = (course) => {
    navigation.navigate('Detail', { course });
  };

  const CourseItem = (item) => (
    <TouchableOpacity onPress={() => handleNavigate(item)} style={styles.courseBox}>
      <Text style={styles.courseTitle}>
        {item.title.replace(/\b\w/g, char => char.toUpperCase())}
      </Text>
      <Text style={styles.courseMeta}>Instructor ID: {item.userId}</Text>
      <Text style={styles.courseMeta}>Word Count: {item.wordCount}</Text>
    </TouchableOpacity>
  );

  if (isLoading) return <ActivityIndicator style={{ marginTop: 100 }} size="large" />;

  if (error && !courses?.length) return (
    <View style={styles.center}>
      <Text>Failed to load data.</Text>
      <TouchableOpacity onPress={refetch} style={styles.retryButton}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader title="Home" showBack={false} onBackPress={() => navigation.goBack()} />

      <TextInput
        placeholder="Search by title"
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.label}>Instructor:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedInstructor}
          onValueChange={value => setSelectedInstructor(value)}
          style={styles.picker}
        >
          <Picker.Item label="All Instructors" value="All" />
          {instructors?.map(id => (
            <Picker.Item key={id} label={`Instructor ${id}`} value={id.toString()} />
          ))}
        </Picker>
      </View>

      <View style={styles.filterRow}>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Long Titles Only</Text>
          <Switch value={longTitlesOnly} onValueChange={setLongTitlesOnly} />
        </View>
        <TouchableOpacity onPress={() => setSortAsc(!sortAsc)} style={styles.sortButton}>
          <Text style={styles.sortText}>{sortAsc ? 'Sort ↑' : 'Sort ↓'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredCourses}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => CourseItem(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: verticalScale(10),
    margin: verticalScale(20),
    borderRadius: Scale(8),
    backgroundColor: '#fff',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: Scale(8),
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: verticalScale(10),
    overflow: 'hidden',
    marginHorizontal: verticalScale(20),
  },
  picker: {
    height: verticalScale(50),
    width: '100%',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
    alignItems: 'center',
    marginHorizontal: Scale(10),
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButton: {
    padding: verticalScale(10),
    backgroundColor: '#333',
    borderRadius: Scale(8),
    marginHorizontal: verticalScale(20),
  },
  sortText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: Scale(14),
  },
  courseBox: {
    backgroundColor: '#fff',
    padding: verticalScale(15),
    borderRadius: Scale(10),
    marginBottom: verticalScale(10),
    marginHorizontal: Scale(20),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowRadius: verticalScale(6),
    elevation: 2,
  },
  courseTitle: {
    fontSize: Scale(20),
    marginBottom: Scale(4),
    fontFamily: 'Poppins-SemiBold',
  },
  courseMeta: {
    color: '#555',
    fontSize: Scale(16),
    fontFamily: 'Poppins-Regular',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    margin: Scale(20),
    fontSize: Scale(16),
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButton: {
    marginTop: Scale(10),
    paddingHorizontal: Scale(20),
    paddingVertical: Scale(10),
    backgroundColor: '#ff5c5c',
    borderRadius: Scale(8),
  },
  retryText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: Scale(16),
  },
});
