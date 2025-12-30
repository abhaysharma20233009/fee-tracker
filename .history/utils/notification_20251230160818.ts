import * as Notifications from 'expo-notifications';

export async function scheduleFeeNotification(
  studentName: string,
  triggerDate: Date
) {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Fee Pending',
      body: `${studentName}'s fee is overdue`,
    },
    trigger: {
      date: triggerDate,
      repeats: true, // daily reminder
    },
  });
}

export async function cancelNotification(id: string) {
  await Notifications.cancelScheduledNotificationAsync(id);
}
