import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {EDIT_PROFILE} from '../../../constants/apiUrl';

class EditProfileService {
  async editProfile(payload) {
    const {
      bio,
      dateOfBirth,
      country,
      bloodGroup,
      contact,
      gender,
      address,
      state,
    } = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    return RequestService.putRequest(
      `${EDIT_PROFILE}?userId=${id}&Id=${id}`,
      {
        bio: bio,
        dateOfBirth: dateOfBirth,
        address: address,
        state: state,
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
