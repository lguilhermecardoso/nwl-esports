import * as Notifications from "expo-notifications";

export async function getPushNotificationsToken() {
  const { granted } = await Notifications.getPermissionsAsync();
  console.log('here112223')
  if(!granted) {
    await Notifications.getPermissionsAsync();
  }

  if(granted) {
    console.log('here1123')
    const puskToken = await Notifications.getExpoPushTokenAsync();

    console.log('NOTIFICATION TOKEN', puskToken.data);
    return puskToken.data;
  }
}