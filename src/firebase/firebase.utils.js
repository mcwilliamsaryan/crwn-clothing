import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAznnhoxOW5KsakPsBVKUFlwPbGSQBbIfU",
    authDomain: "crwn-db-b8690.firebaseapp.com",
    projectId: "crwn-db-b8690",
    storageBucket: "crwn-db-b8690.appspot.com",
    messagingSenderId: "227562488667",
    appId: "1:227562488667:web:fd830bf98b382bca20107e",
    measurementId: "G-J2RGMC67MD"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if(!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);

      const snapShot = await userRef.get();
      
      if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
          await userRef.set({
            displayName,
            email,
            createAt,
            ...additionalData
          })
        } catch (error) {
          console.log('error creating user', error.message);
        }
      }

      return userRef;

  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;