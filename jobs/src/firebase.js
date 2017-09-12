import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyBLm-M-hjnS9x3piyS0kER1fHk-29eptB8',
  authDomain: 'frontend-2ba5a.firebaseapp.com',
  databaseURL: 'https://frontend-2ba5a.firebaseio.com',
  projectId: 'frontend-2ba5a',
  storageBucket: 'frontend-2ba5a.appspot.com',
  messagingSenderId: '793373377314'
}
firebase.initializeApp(config)

export const database = firebase.database()
export const storage = firebase.storage()
export const auth = firebase.auth()
