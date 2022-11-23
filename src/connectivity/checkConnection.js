import NetInfo from '@react-native-community/netinfo';

const CheckConnection = async () => {
  let state_type = null;
  return new Promise(res => {
    const unsubscribe = NetInfo.addEventListener(state => {
      state_type = state.isConnected;
      res(state_type);
    });

    unsubscribe();
  });
};

export default CheckConnection;

// import {View, Text} from 'react-native';
// import NetInfo from '@react-native-community/netinfo';
// import React, {useEffect} from 'react';

// const CheckConnection = () => {
//   const [connected, setConnected] = useState(flase);
//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       setConnected(state.isConnected);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);
//   return connected ? null : (
//     <>
//       <View
//         style={{
//           position: 'absolute',
//           bottom: 0,
//           backgroundColor: colorPalette.mainColor,
//           height: 24,
//           width: '100%',
//           alignItems: 'center',
//         }}>
//         <View
//           style={{
//             flexDirection: 'row',
//             width: '28%',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}>
//           <MaterialIcons name={'wifi-off'} color={'white'} size={20} />
//           <Text style={{color: 'white', fontSize: 16}}>No Internet</Text>
//         </View>
//       </View>
//     </>
//   );
// };

// export default CheckConnection;
