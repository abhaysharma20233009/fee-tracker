import { scheduleFeeNotification } from "@/utils/notification";
import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import StudentItem from "../components/studentItem";
import { loadStudents, saveStudents } from "../storage/feeStorage";

export default function Home() {
  const [students, setStudents] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    loadStudents().then(setStudents);
  }, []);

  useEffect(() => {
    saveStudents(students);
  }, [students]);

  function addStudent() {
    if (!name || !date) return;

    setStudents(prev => [
      ...prev,
      {
        id: Date.now(),
        name,
        date, // store string for simplicity
      },
    ]);
     for(let student of students){
      if(student.name===name && student.date===date){
        const triggerDate = new Date(date);
        triggerDate.setDate(triggerDate.getDate() + 30); // 30 days later
        scheduleFeeNotification(student.name, triggerDate);
      }
  }
    setName("");
    setDate("");
  }

  function updateStudentDate(id: number, newDate: string) {
    setStudents(prev =>
      prev.map(s =>
        s.id === id ? { ...s, date: newDate } : s
      )
    );
    for(let student of students){
      if(student.id===id){
        const triggerDate = new Date(newDate);
        triggerDate.setDate(triggerDate.getDate() + 30); // 30 days later
        scheduleFeeNotification(student.name, triggerDate);
      }
  }

}

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Fee Tracker</Text>

      <TextInput
        placeholder="Student name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 8, marginVertical: 5 }}
      />

      <TextInput
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={setDate}
        style={{ borderWidth: 1, padding: 8, marginBottom: 5 }}
      />

      <TouchableOpacity onPress={addStudent}>
        <Text style={{ color: "white", marginBottom: 10, fontSize:27,backgroundColor:'blue',textAlign:'center'}}>Add Student</Text>
      </TouchableOpacity>

      <FlatList
        data={students}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <StudentItem
            student={item}
            onUpdateDate={updateStudentDate}
          />
        )}
      />
    </View>
  );
}
