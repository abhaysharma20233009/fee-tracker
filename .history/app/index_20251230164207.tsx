import { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import StudentItem from "../components/StudentItem.tsx";

import { loadStudents, saveStudents } from '../storage/feeStorage';

export default function Home() {
  const [text, setText] = useState('');
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    loadStudents().then(setStudents);
  }, []);

  useEffect(() => {
    saveStudents(students);
  }, [students]);

  function addStudent() {
    if (!text.trim()) return;

    setStudents([
      ...students,
      {
        id: Date.now(),
        name: text,
        date:Date.now(),
        completed: false,
      },
    ]);
    setText('');
  }

  function toggleStudent(id: number) {
    setStudents(
      students.map(r =>
        r.id === id ? { ...r, completed: !r.completed } : r
      )
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        student Tracker
      </Text>

      <Text style={{ marginVertical: 8 }}>
        {students.filter(r => r.completed).length} / {students.length} completed
      </Text>

      <TextInput
        placeholder="Enter student"
        value={text}
        onChangeText={setText}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 6,
        }}
      />

      <TouchableOpacity
        onPress={addStudent}
        style={{
          backgroundColor: '#000',
          padding: 12,
          borderRadius: 6,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Add student
        </Text>
      </TouchableOpacity>

      <FlatList
        data={students}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <StudentItem student={item} onToggle={toggleStudent} />
        )}
      />
    </View>
  );
}
