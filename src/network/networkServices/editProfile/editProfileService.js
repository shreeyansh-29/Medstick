import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {EDIT_PROFILE} from '../../../constants/apiUrl';

class EditProfileService {
  async editProfile(payload) {
    const {bio, dateOfBirth, country, bloodGroup, contact, gender} =
      payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    return RequestService.putRequest(
      `${EDIT_PROFILE}?userId=${id}&Id=${id}`,
      {
        bio: bio,
        dateOfBirth: dateOfBirth,
        latitude: 152.01,
        longitude: 122.9,
        country: country,
        bloodGroup: bloodGroup,
        contact: contact,
        gender: gender,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new EditProfileService();
