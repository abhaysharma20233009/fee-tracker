import { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';

export default function StudentItem({ student, onToggle, onEdit }: any) {
  const [editing, setEditing] = useState(false);
  const dateObj = student?.date ? new Date(student.date) : null;
  const formattedDate = dateObj
    ? `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
    : '';
  const [dateInput, setDateInput] = useState(formattedDate);

  const handleSave = () => {
    setEditing(false);
    if (onEdit) onEdit(student.id, dateInput);
  };

  return (
    <TouchableOpacity
      onPress={() => onToggle && onToggle(student.id)}
      style={[styles.container, { backgroundColor: student.completed ? '#9ae6b4' : '#e2e8f0' }]}
    >
      <Text style={styles.text}>
        {student.completed ? '✅ ' : '⬜ '} {student.name} {formattedDate}
      </Text>

      {editing ? (
        <View style={styles.editRow}>
          <TextInput
            value={dateInput}
            onChangeText={setDateInput}
            style={styles.input}
            placeholder="YYYY-MM-DD"
          />
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEditing(false);
              setDateInput(formattedDate);
            }}
            style={styles.cancelButton}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setEditing(true)}>
          <Text style={styles.editText}>Edit date</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, marginVertical: 6, borderRadius: 6 },
  text: { fontSize: 16 },
  editRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    padding: 6,
    borderRadius: 4,
    minWidth: 120,
    marginRight: 8,
  },
  saveButton: { padding: 6, backgroundColor: '#60a5fa', borderRadius: 4, marginRight: 6 },
  cancelButton: { padding: 6, backgroundColor: '#f87171', borderRadius: 4 },
  buttonText: { color: '#fff' },
  editText: { fontSize: 16, color: '#1d4ed8', marginTop: 8 },
});
