import {View, Image, FlatList, RefreshControl} from 'react-native';
import React, {useState} from 'react';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {styles} from '../../../styles/careTakerStyles/careTakerRequestStyles';
import {Card} from 'react-native-paper';
import {Avatar, Button, ListItem} from 'react-native-elements';

const PatientRequest = () => {
  const [patients, setPatients] = useState([
    {patientName: 'Manas Gupta', phoneNo: '9695072068'},
    {patientName: 'Vineet Singh', phoneNo: '9695072061'},
    {patientName: 'Akash', phoneNo: '9695072061'},
    {patientName: 'Anjali', phoneNo: '9695072061'},
  ]);
  const [refresh, setRefresh] = useState(false);

  const fetchpatientreq = () => {};

  const renderItem = ({item}) => {
    return (
      <Card style={styles.card}>
        <View style={styles.cardInner}>
          <View style={styles.avatar}>
            <Avatar
              size={80}
              rounded
              source={require('../../../assets/images/shreeyansh.jpg')}
            />
          </View>
          <View style={styles.container1}>
            <ListItem
              style={styles.list}
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}>
              <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>
                  {item.patientName}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.listSubTitle}>
                  
                  
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <View style={styles.buttonView}>
              <Button
                // onPress={() => {
                //   acceptrequest(item.cid);
                // }}
                title="Confirm"
                buttonStyle={styles.confirmButton}
                color="#4267B2"></Button>
              <View style={styles.space} />
              <Button
                // onPress={() => {
                //   deletereq(item.cid);
                // }}
                title="Delete"
                buttonStyle={styles.deleteButton}
                color="#e53935"></Button>
            </View>
          </View>
        </View>
      </Card>
    );
  };
  return (
    <View style={{flex: 1}}>
      {patients.length === 0 ? (
        <View
          style={{
            flex: 1,
            backgroundColor: colorPalette.basicColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={{height: 320, width: 240}}
            source={require('../../../assets/images/nopatientreq.png')}
          />
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={fetchpatientreq}></RefreshControl>
          }
          data={patients}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default PatientRequest;
