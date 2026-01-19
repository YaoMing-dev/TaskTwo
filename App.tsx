import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        setTodos(data.slice(0, 20));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.card}>
      <Text style={styles.text}>User id: {item.userId}</Text>
      <Text style={styles.text}>Id: {item.id}</Text>
      <Text style={styles.text}>Title: {item.title}</Text>
      <Text style={styles.text}>Completed: {item.completed ? 'true' : 'false'}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#D2B48C',
    borderColor: '#000',
    borderWidth: 1.5,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
    marginVertical: 2,
  },
});
