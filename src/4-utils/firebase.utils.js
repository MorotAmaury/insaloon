import { initializeApp} from 'firebase/app'
import { getFirestore, collection, getDocs, query} from 'firebase/firestore';
import {
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc} from 'firebase/firestore';
import { useEffect } from 'react';

import { onSnapshot, enableIndexedDbPersistence } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCG5TA3lOGhPg-oi7p-8Kb-XHIkh5SlX2Q",
    authDomain: "insaloon-c7624.firebaseapp.com",
    projectId: "insaloon-c7624",
    storageBucket: "insaloon-c7624.firebasestorage.app",
    messagingSenderId: "872728691291",
    appId: "1:872728691291:web:67cb6e4f0fde1f0cd5f57e",
    measurementId: "G-8CH5XLP025"
  };

  

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app)

export const useAuthListener = (setUser) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null)
    })
    return () => unsubscribe()
  }, [])
}

export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback)

export const setInfo = async (userId, info, value) => {
  try {    
    const usersCollectionRef = doc(db, 'users', userId);
    const userDoc = await getDoc(usersCollectionRef); 

    if (userDoc.exists()) {
      await updateDoc(usersCollectionRef, { [info]: value })
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du nom d\'utilisateur :', error);
  }
}
export const googleSignOut = () => signOut(auth)

export const getInfo = async (userId, info) => {
  const userDocRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userDocRef)
  
  if (userDoc.exists()) {
    const userData = userDoc.data();    
    return userData[info]
  }
}


export const getClassemement = async () => {
  try {
    const usersCollectionRef = collection(db, 'users');
    
    const q = query(usersCollectionRef);
    
    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const sortedUsers = users.sort((a, b) => (b.nombreTickets || 0) - (a.nombreTickets || 0));

    console.log("Utilisateurs triés :", sortedUsers);

    return sortedUsers;

  } catch (error) {
    console.error("Erreur lors de la récupération et du tri des utilisateurs :", error);
    return [];
  }
};


export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    try {
      await setDoc(userDocRef, {
        email,
        nombreTickets: 0,
        classement: 0,
        defis : [],
        ...additionalInformation
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const resetPassword = (email) => {
  sendPasswordResetEmail(auth, email)
  
  .then(() => {
    alert('Le courriel de réinitialisation a bien été envoyé')
  })
  .catch((error) => {
    if(error.code === 'auth/invalid-email')
    {
      alert('E-mail invalide')
    }
  })
}

export const verificationEmail = (user) => sendEmailVerification(user)

export const emailInUse = async (test_email) => {
  try {
    const db = getFirestore();

    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);

    let is_verif = false
    querySnapshot.docs.forEach((user) => {
      if (user.data().email === test_email) 
      {
        is_verif = true 
      }
    });
    
    return is_verif
  } catch (error) {
    console.log("error geting users email", error.message);
  }
}
