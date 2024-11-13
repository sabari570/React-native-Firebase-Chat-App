import { Platform } from "react-native";

export const CHAT_APP_CONSTANTS = {
  USERS_COLLLECTION: "users",
  ROOMS_COLLECTION: "rooms",
  MESSAGE_COLLECTION: "messages",
  blurhash:
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[",
  isWeb: Platform.OS === 'web',
  getRoomId: (userId1: string, userId2: string): string => {
    const sortedIds = [userId1, userId2].sort();
    const roomId = sortedIds.join('-');
    return roomId;
  }
};

export interface UserInterface {
  userId: string,
  username: string,
  profileUrl: string,
  email: string,
}
