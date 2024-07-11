import { initializeApp } from 'firebase/app'; //creates an app instance of firebase based on a config
//the config we then attach to the online firebase app that we created
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAzBmDQRfakmGubZQ86BGhFDlnSDo16y0g", //this isn't a super secret API key, so we don't have to worry about this being exposed
  authDomain: "crwn-clothing-db-b6f70.firebaseapp.com",
  projectId: "crwn-clothing-db-b6f70",
  storageBucket: "crwn-clothing-db-b6f70.appspot.com",
  messagingSenderId: "358512780865",
  appId: "1:358512780865:web:c9eebdb52cde469dee08c0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(); //this is a singleton
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(); //another singleton

export const createUserDocumentFromAuth = async(userAuth, additionalInformation={}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    
    const userSnapshot = await getDoc(userDocRef);//on this snapshot, we can check whether this doc exists
    //using exists tells us whether this user reference exists within our database
    //basically what we want to do is >> if it doesn't exist, create a new one
    console.log(userSnapshot); 
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        console.log("setting user")
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch(ex){
            console.log('error created when creating user', ex.message);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password ) return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}