import firebase from 'firebase';

require('firebase/firestore');

const config = {
  apiKey: 'AIzaSyBxgsEU_gRVWHbedeSs659-g9PI8MIx2D0',
  authDomain: 'wtcsb-employment-portal.firebaseapp.com',
  databaseURL: 'https://wtcsb-employment-portal.firebaseio.com',
  projectId: 'wtcsb-employment-portal',
  storageBucket: 'wtcsb-employment-portal.appspot.com',
  messagingSenderId: '466457835406',
};
firebase.initializeApp(config);

export const database = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
