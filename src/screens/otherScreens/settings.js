import {Linking, Share, View} from 'react-native';
import React from 'react';
import SettingsList from 'react-native-settings-list';
import styles from '../../styles/otherScreensStyles/settingsStyles';
import SubHeader from '../../components/molecules/headers/subHeader';

const Settings = ({navigation}) => {
  return (
    <View style={styles.container}>
      <SubHeader title={'Settings'} navigation={navigation} />
      <SettingsList borderColor="white" backgroundColor="white">
        <SettingsList.Header
          headerText="Settings"
          headerStyle={styles.setting}
        />
        <SettingsList.Item
          hasNavArrow={true}
          title="Notification settings"
          titleStyle={styles.settingItems}
          onPress={() => Linking.openSettings()}
        />

        <SettingsList.Header
          headerText="General"
          headerStyle={styles.general}
        />
        <SettingsList.Item
          hasNavArrow={false}
          title="About Medstick"
          titleStyle={styles.settingItems}
          onPress={() => navigation.navigate('About')}
        />

        <SettingsList.Item
          hasNavArrow={false}
          title="Feedback"
          titleStyle={styles.settingItems}
          onPress={() => navigation.navigate('Feedback')}
        />

        <SettingsList.Item
          hasNavArrow={false}
          title="Share with friends and family"
          titleStyle={styles.settingItems}
          onPress={async () => {
            try {
              await Share.share({
                title: 'Medstick',
                url: 'https://cdn.discordapp.com/attachments/941592669933682699/955175698568462437/vinaylogo.png',
              });
            } catch (error) {}
          }}
        />
      </SettingsList>
    </View>
  );
};

export default Settings;
