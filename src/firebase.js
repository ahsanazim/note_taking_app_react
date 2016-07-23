// import firebase from 'firebase/app';
// require('firebase/database');
// require('firebase/auth');
import firebase from 'firebase';

// Set the configuration for your app
const config = {
  apiKey: 'AIzaSyBDuTuJZgrL0z3eLw3CscZ5hbUSx2orWeQ',
  authDomain: 'real-time-post-it-app.firebaseapp.com',
  databaseURL: 'https://real-time-post-it-app.firebaseio.com',
  storageBucket: 'real-time-post-it-app.appspot.com',
};

firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

export function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function editNote(id, newText) {
  database.ref('notes').child(id).update({ text: newText });
}

export function deleteNote(id) {
  database.ref('notes').child(id).remove();
}

export function dragNote(id, x, y, ui) {
  database.ref('notes').child(id).update({ x: x + ui.deltaX, y: y + ui.deltaY });
}

export function pushNote(note) {
  const key = database.ref('notes').push(note).key;
  return key;
}

export function updtInternalId(id) {
  database.ref('notes').child(id).update({ id });
}

export function balZIndex(id, maxZIndex) {
  database.ref('notes').child(id).update({ zIndex: maxZIndex + 1 });
}
