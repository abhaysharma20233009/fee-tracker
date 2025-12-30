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
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      year: triggerDate.getFullYear(),
      month: triggerDate.getMonth() + 1, // months are 1-based
      day: triggerDate.getDate(),
      hour: 9,   // choose a fixed time
      minute: 0,
      repeats: true, // daily reminder
    },
  });
}

export async function cancelNotification(id: string) {
  await Notifications.cancelScheduledNotificationAsync(id);
}
