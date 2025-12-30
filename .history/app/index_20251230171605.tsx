import { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import StudentItem from "../components/studentItem";

import { loadStudents, saveStudents } from '../storage/feeStorage';

export default function Home() {
  const [text, setText] = useState('');
  const [students, setStudents] = useState<any[]>([]);
  const [date ,setDate]=useState('');
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
        date:new Date(date).toISOString(),
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
        Fee Tracker
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
       <TextInput
        placeholder="Enter last fee paid date"
        value={date}
        onChangeText={setDate}
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
  renderItem={({ item }) => {
    const dateObj = new Date(item.date);
    const [dateText, setDateText] = useState(dateObj.toLocaleDateString());

    // Function to save updated date back to state
    const updateDate = (text: string) => {
      setDateText(text);
      const newDate = new Date(text).getTime(); // Convert to timestamp
      if (!isNaN(newDate)) {
        setStudents(students.map(s => s.id === item.id ? { ...s, date: newDate } : s));
      }
    };

    return (
      <>
        <TextInput
          value={dateText}
          onChangeText={updateDate}
          placeholder="Enter date (MM/DD/YYYY)"
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 8,
            marginBottom: 4,
            borderRadius: 6,
          }}
        />
        <StudentItem student={item} onToggle={toggleStudent} />
      </>
    );
  }}
/>

    </View>
  );
}
