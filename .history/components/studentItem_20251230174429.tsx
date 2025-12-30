import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function StudentItem({ student, onUpdateDate }: any) {
  const [editing, setEditing] = useState(false);
  const [date, setDate] = useState(student.date);
  const dateObj = student.date;
  return (
    <View
      style={{
        padding: 10,
        marginVertical: 6,
        backgroundColor: "#e2e8f0",
        borderRadius: 6,
      }}
    >
      <Text style={{ fontSize: 16 }}>{student.name}</Text>

      {!editing ? (
        <>
          <Text>Last Fee: {dateObj}-{dateObj.getMonth}-{dateObj.getDate}      {dateObj.getDay}</Text>

          <TouchableOpacity onPress={() => setEditing(true)}>
            <Text style={{ color: "blue" }}>Edit Date</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            value={date}
            onChangeText={setDate}
            style={{
              borderWidth: 1,
              padding: 6,
              marginVertical: 6,
            }}
          />

          <TouchableOpacity
            onPress={() => {
              onUpdateDate(student.id, date);
              setEditing(false);
            }}
          >
            <Text style={{ color: "green" }}>Save</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
