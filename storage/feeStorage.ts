import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'students';

export async function saveStudents(data: any) {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
}

export async function loadStudents() {
  const d = await AsyncStorage.getItem(KEY);
  return d ? JSON.parse(d) : [];
}
