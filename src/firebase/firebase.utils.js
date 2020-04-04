import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDSMlv8S5vzoAJn6GwxP_4wiGPWEPoawLA",
    authDomain: "crwn-db-c57cd.firebaseapp.com",
    databaseURL: "https://crwn-db-c57cd.firebaseio.com",
    projectId: "crwn-db-c57cd",
    storageBucket: "crwn-db-c57cd.appspot.com",
    messagingSenderId: "1090795619671",
    appId: "1:1090795619671:web:ba38461ae184a7cb3e6a12",
    measurementId: "G-KKCNK145VN"
  };

export const createUserProfileDocument = async (userAuth,additionalData) => {

    if(!userAuth){
      return;
    }
   
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName,email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user',error.message);
      }
      

    }
    return userRef;

}

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt : 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;