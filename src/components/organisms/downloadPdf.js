import {DOWNLOAD_PDF, FETCH_IMAGE} from '../../constants/apiUrl';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {config} = RNFetchBlob;

const Downloadpdf = async globalmedId => {
  const id = await AsyncStorage.getItem('user_id');
  const date = new Date();
  let downloaddir = RNFetchBlob.fs.dirs.DownloadDir;
  let downloadPath = `${downloaddir}/report_${Math.floor(
    date.getTime() + date.getSeconds() / 2,
  )}.pdf`;
  const options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true, 
      notification: true,
      path: downloadPath,
      description: 'Downloading your report',
    },
  };
  let generate_pdf_url = `${DOWNLOAD_PDF}?userMedicineId=${globalmedId}&Id=${id}`;
  let response = '';

  try {
    await fetch(generate_pdf_url)
      .then(res => res.json())
      .then(async resp => {
        await config(options)
          .fetch('GET', `${FETCH_IMAGE}/upload/static/pdf/${resp?.result}.pdf`)
          .catch(() => {
            return 'err';
          });
      })
      .catch((err) => {
        console.log(err);
        // response = 'err';
        // return response;
      });
    return response;
  } catch (err) {
    response = 'err';
    return response;
  }
};

export default Downloadpdf;
