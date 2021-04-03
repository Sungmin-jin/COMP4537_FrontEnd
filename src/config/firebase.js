import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyACA5FtxLHfYZxk98b7lUzWVxcnPmqA2SI',
  authDomain: 'comp4537-aa16e.firebaseapp.com',
  projectId: 'comp4537-aa16e',
  storageBucket: 'comp4537-aa16e.appspot.com',
  messagingSenderId: '554815965391',
  appId: '1:554815965391:web:26e1dd3359c09b6bf48fba',
  measurementId: 'G-7CSXQ2CZCG',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
