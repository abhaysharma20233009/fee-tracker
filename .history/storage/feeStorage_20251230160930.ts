import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'fees';

export async function saveFees(data: any) {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
}

export async function loadFees() {
  const d = await AsyncStorage.getItem(KEY);
  return d ? JSON.parse(d) : [];
}
