import { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RoutineItem from '../../components/studentItem';
import { loadRoutines, saveRoutines } from '../../storage/routineStorage';

export default function Home() {
  const [text, setText] = useState('');
  const [routines, setRoutines] = useState<any[]>([]);

  useEffect(() => {
    loadRoutines().then(setRoutines);
  }, []);

  useEffect(() => {
    saveRoutines(routines);
  }, [routines]);

  function addRoutine() {
    if (!text.trim()) return;

    setRoutines([
      ...routines,
      {
        id: Date.now(),
        title: text,
        completed: false,
      },
    ]);
    setText('');
  }

  function toggleRoutine(id: number) {
    setRoutines(
      routines.map(r =>
        r.id === id ? { ...r, completed: !r.completed } : r
      )
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Routine Tracker
      </Text>

      <Text style={{ marginVertical: 8 }}>
        {routines.filter(r => r.completed).length} / {routines.length} completed
      </Text>

      <TextInput
        placeholder="Enter routine"
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
        onPress={addRoutine}
        style={{
          backgroundColor: '#000',
          padding: 12,
          borderRadius: 6,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Add Routine
        </Text>
      </TouchableOpacity>

      <FlatList
        data={routines}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <RoutineItem routine={item} onToggle={toggleRoutine} />
        )}
      />
    </View>
  );
}
