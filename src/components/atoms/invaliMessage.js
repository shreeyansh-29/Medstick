import { Alert } from "react-native"

export const showInvalidMessage=()=>{
    Alert.alert('WARNING','Please Fill all the Information **',[{
      text:'OK',
      style:'default'
  }],
  {cancelable:false}
  )
  }