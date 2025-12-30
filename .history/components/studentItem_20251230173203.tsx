import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';



export default function StudentItem({ student, onToggle }: any) {
  const [editing, setEditing] = useState(false);
  const [date, setDate] = useState(student.date);

  function saveDate() {
    setEditing(false);
    // later you can pass this to parent if needed
  }

  return (
    <View
      style={{
        padding: 12,
        marginVertical: 6,
        backgroundColor: student.completed ? '#9ae6b4' : '#e2e8f0',
        borderRadius: 6,
      }}
    >
      <TouchableOpacity onPress={() => onToggle(student.id)}>
        <Text style={{ fontSize: 16 }}>
          {student.completed ? '✅ ' : '⬜ '}
          {student.name} — {new Date(date).toDateString()}
        </Text>
      </TouchableOpacity>

      {!editing ? (
        <TouchableOpacity onPress={() => setEditing(true)}>
          <Text style={{ color: 'blue' }}>Edit date</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TextInput
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            style={{
              borderWidth: 1,
              padding: 6,
              marginTop: 6,
              borderRadius: 6,
            }}
          />
          <TouchableOpacity onPress={saveDate}>
            <Text style={{ color: 'green', marginTop: 4 }}>Save</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
