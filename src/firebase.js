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
    if (!snapshot.exists()) {
      console.log('entered');
      database.ref('/').update({ maxZIndex: 0 });
    }
  });
}

export function editNote(id, newText, username) {
  database.ref('notes').child(id).update({ text: newText, lastEdited: username, isEditing: true });
}

export function deleteNote(id) {
  database.ref('notes').child(id).remove();
}

export function dragNote(id, x, y, ui) {
  database.ref('notes').child(id).update({ x: x + ui.deltaX, y: y + ui.deltaY });
}

export function balZIndex(id) {
  let currZIndex, maxZIndex;
  database.ref('notes').child(id).once('value')
  .then((snapshot) => {
    currZIndex = snapshot.val().zIndex;
    return database.ref('maxZIndex').once('value');
  })
  .then((snapshot) => {
    maxZIndex = snapshot.val();
    if ((currZIndex < maxZIndex) || (maxZIndex === 0)) {
      database.ref('notes').child(id).update({ zIndex: maxZIndex + 1 });
      database.ref('/').update({ maxZIndex: maxZIndex + 1 });
    }
  });
}

export function pushNote(note, username) {
  const key = database.ref('notes').push(note).key;
  database.ref('notes').child(key).update({ lastEdited: username });
  balZIndex(key);
  return key;
}

export function updtInternalId(id) {
  database.ref('notes').child(id).update({ id });
}

export function setNotEditing(id) {
  let isEditingCurr;
  database.ref('notes').child(id).once('value')
  .then((snapshot) => {
    isEditingCurr = snapshot.val().isEditing;
    database.ref('notes').child(id).update({ isEditing: !isEditingCurr });
  });
}
