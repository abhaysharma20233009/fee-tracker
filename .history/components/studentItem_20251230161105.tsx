
import { Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function studentItem() {

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
