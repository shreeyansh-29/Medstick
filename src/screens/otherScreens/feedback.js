import React from 'react';
import {WebView} from 'react-native-webview';

const Feedback = () => {
  return (
    <WebView
      source={{
        uri: 'https://docs.google.com/forms/d/e/1FAIpQLSd529pwZjABhnQpz3i24SBdhrzY8o8_bboqasndwxi1cNOneQ/viewform',
      }}
      originWhitelist={['http://*', 'https://*', 'intent://*']}
      style={{marginTop: 20}}
      setSupportMultipleWindows={true}
      allowFileAccess={true}
      domStorageEnabled={true}
      javaScriptEnabled={true}
      geolocationEnabled={true}
      saveFormDataDisabled={true}
      allowFileAccessFromFileURLS={true}
      allowUniversalAccessFromFileURLs={true}
      bounces={false}
    />
  );
};

export default Feedback;
