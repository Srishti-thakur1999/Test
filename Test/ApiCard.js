import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ApiCard = ({ api }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>name:{api.API}</Text>
      <Text style={styles.description}>Description:{api.Description}</Text>
      <Text style={styles.category}>Category:{api.Category}</Text>
      <Text style={styles.url}>{api.Link}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { 
   
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    color:'hotpink',
    fontWeight:'bold'
  },
  category: {
    fontSize: 14,
    marginBottom: 4,
    color: 'red',
    fontWeight:'bold'
  },
  url: {
    fontSize: 14,
    color: '#3498db',
  },
});

export default ApiCard;
