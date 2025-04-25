import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Scale, { verticalScale } from '../../Component/Scale';
import CustomHeader from '../../Component/CustomHeader';
import { useGetCommentsQuery } from '../../Services/tasksApi'; 

export default function DetailScreen({ route, navigation }) {
  const { course } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: comments = [], isLoading, isError } = useGetCommentsQuery(course.id);

  useEffect(() => {
    checkFavorite();
  }, []);

  const checkFavorite = async () => {
    const data = await AsyncStorage.getItem('favorites');
    const favArray = data ? JSON.parse(data) : [];
    // console.log(favArray)
  
    if (favArray.includes(course.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favs = await AsyncStorage.getItem('favorites');
      let favorites = favs ? JSON.parse(favs) : [];
  
      if (isFavorite) {
        favorites = favorites.filter(id => id !== course.id);
      } else {
        favorites.push(course.id);
      }
  
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error loading comments. Please try again.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <CustomHeader
        title="Details"
        showBack={true} 
        onBackPress={() => navigation.goBack()}
      />
      
      <Text style={styles.title}>
        {course.title.replace(/\b\w/g, char => char.toUpperCase())}
      </Text>
      
      <View style={{marginHorizontal: Scale(20)}}>
        <Text style={styles.subtitle}>Instructor ID: {course.userId}</Text>
        <Text style={styles.desc}>{course.body}</Text>
        <Text style={styles.wordCount}>Word Count: {course.wordCount}</Text>

        {/* Favorite button */}
        <TouchableOpacity onPress={toggleFavorite} style={[styles.favoriteButton, isFavorite && styles.favorited]}>
          <Text style={styles.favoriteText}>{isFavorite ? "★ Favorited" : "☆ Mark as Favorite"}</Text>
        </TouchableOpacity>

        <Text style={styles.reviewsHeader}>Course Reviews:</Text>
        {comments.map(comment => (
          <View key={comment.id} style={styles.comment}>
            <Text style={styles.commentName}>{comment.name}</Text>
            <Text style={styles.commentBody}>{comment.body}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  backIcon: {
    paddingLeft: Scale(10),
    paddingRight: Scale(15),
  },
  
 
  comment: { 
    marginTop: verticalScale(10), 
    padding: verticalScale(10), 
    backgroundColor: '#f5f5f5', 
    borderRadius: Scale(5), 
    marginBottom: verticalScale(10) 
  },
 
  
  favoriteButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: Scale(20),
    backgroundColor: '#ff5c5c',
    borderRadius: Scale(8),
    marginVertical: verticalScale(10),
    alignItems: 'center',
  },
  favorited: {
    backgroundColor: '#33cc33', 
  },
 
  title: { 
    fontSize: Scale(20), 
    fontWeight: 'bold', 
    fontFamily: 'Poppins-Bold',
    color: '#333',
    textAlign: 'center',
    margin: Scale(30)
  },
  subtitle: { 
    fontSize: Scale(18), 
    marginBottom: verticalScale(10), 
    color: '#555',
    fontFamily: 'Poppins-SemiBold',
  },
  desc: { 
    fontSize: Scale(16), 
    marginBottom: verticalScale(10), 
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  wordCount: { 
    fontSize: Scale(16), 
    marginBottom: verticalScale(10), 
    color: '#888',
    fontFamily: 'Poppins-Regular',
  },
  reviewsHeader: { 
    marginTop: verticalScale(20), 
    fontSize: Scale(18), 
    fontWeight: 'bold', 
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
  commentName: {
    fontWeight: 'bold', 
    color: '#333',
    fontSize: Scale(16),
    fontFamily: 'Poppins-SemiBold',
  },
  commentBody: {
    fontSize: Scale(15),
    color: '#555',
    marginTop: verticalScale(5),
    fontFamily: 'Poppins-Regular',
  },
  favoriteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
});
