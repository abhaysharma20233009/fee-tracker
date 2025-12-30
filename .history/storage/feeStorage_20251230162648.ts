import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'students';

export async function saveStudent(data: any) {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
}

export async function loadStudent() {
  const d = await AsyncStorage.getItem(KEY);
  return d ? JSON.parse(d) : [];
}
