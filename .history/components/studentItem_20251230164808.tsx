
import { Text, TouchableOpacity } from 'react-native';
export default function StudentItem({ student, onToggle }: any) 
{
    const dateObj = new Date(student.date);
  return (
    <TouchableOpacity
      onPress={() => onToggle(student.id)}
      style={{
        padding: 12,
        marginVertical: 6,
        backgroundColor: student.completed ? '#9ae6b4' : '#e2e8f0',
        borderRadius: 6,
      }}
    >
        
      <Text style={{ fontSize: 16 }}>
        {student.completed ? '✅ ' : '⬜ '} {student.name} {dateObj.getFullYear()}-{dateObj.getMonth() + 1}-{dateObj.getDate()}
      </Text>
     
    </TouchableOpacity>
  );
}
