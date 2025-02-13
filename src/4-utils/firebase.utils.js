import { initializeApp} from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc} from 'firebase/firestore';
import {
  getAuth, 
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc} from 'firebase/firestore';
import { useEffect } from 'react';
import { firebaseConfig } from '../0-data/cloudAdress';

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth()
const db = getFirestore(app)



export const getBibliotheque = async (filter = {}, searchQuery = '') => {
  try { 

    if(!sessionStorage.getItem('fullColles'))
    {
      let fullQ = query(collection(db, 'json-pdf-verifier'))
      const fullQuerySnapshot = await getDocs(fullQ)
      const fullCollesData = JSON.stringify(fullQuerySnapshot.docs.map(doc => doc.data()))
      sessionStorage.setItem('fullColles', fullCollesData);     
    }
  
    let collesData = JSON.parse(sessionStorage.getItem('fullColles'))

    if (searchQuery) {    
      const fullCollesData = JSON.parse(sessionStorage.getItem('fullColles'))
      collesData = fullCollesData.filter(colle =>
        colle.data.user_subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filter.matiere) {
      collesData = collesData.filter(colle => 
        colle.matiere === filter.matiere
      )
    }
    if (filter.type === 'methode') {      
      collesData = collesData.filter(colle => 
        colle.methode === filter.value
      )
    }
    if (filter.type === 'note'){
      // les plans n'ont pas de note
      collesData = collesData.filter(colle => 
        colle.methode === "colle"
      )
    }
    collesData = collesData.sort((a, b) => {        
      let valueA;
      let valueB;
      if (filter.type === 'note') {
        valueA = a.data.note || 0 // || 0 pour s'assurer que on a un entier
        valueB = b.data.note || 0 // || 0 pour s'assurer que on a un entier
      }
      else {
        valueA = a.creationDate 
        valueB = b.creationDate
      }
      
      if (filter.value === 'desc' || filter.type !== 'note') {
        return  valueB - valueA ;
      } else if (filter.value === 'asc') {
        return valueA - valueB; 
      }
      // par defaut
      return true;
    });

    return collesData;
  } catch (error) {
    console.error('Erreur lors de la récupération des colles :', error);
    throw error;
  }
};


export const updateCredits = async (user, methode) => {
  try {
    const actuelNombrePrompt = await getInfo(user.uid, 'nombrePrompt')
    const actuelNombreColle = await getInfo(user.uid, 'nombreColle')
    const actuelNombrePlan = await getInfo(user.uid, 'nombrePlan')

    const curieuxStatus = await getInfo(user.uid, 'curieux')
    const subStatus = await getInfo(user.uid, 'abonne')
    if (methode === 'colle') 
    {
      if (curieuxStatus === true && !subStatus) await setInfo(user.uid, 'curieux', 'used')
      await setInfo(user.uid, 'nombrePrompt', actuelNombrePrompt - 1)
      await setInfo(user.uid, 'nombreColle', actuelNombreColle + 1)
    }
    else if (methode === 'plan') 
    {
      // le credit du curieux peut faire que 1 plan
      if (curieuxStatus === true && !subStatus) 
      {
        await setInfo(user.uid, 'curieux', 'used')
        await setInfo(user.uid, 'nombrePrompt', actuelNombrePrompt - 1)
      }
      else await setInfo(user.uid, 'nombrePrompt', Math.round((actuelNombrePrompt - 0.1) * 10) / 10) // arondie a la premiere decimal ex 21.5
      
      await setInfo(user.uid, 'nombrePlan', actuelNombrePlan + 1)
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du nom d\'utilisateur :', error);
  }
};

export const googleSignOut = () => signOut(auth)

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
    const usersCollectionRef = doc(db, 'users2', userId);
    const userDoc = await getDoc(usersCollectionRef); 

    if (userDoc.exists()) {
      await updateDoc(usersCollectionRef, { [info]: value })
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du nom d\'utilisateur :', error);
  }
}

export const getInfo = async (userId, info) => {
  const userDocRef = doc(db, 'users2', userId);
  const userDoc = await getDoc(userDocRef)
  
  if (userDoc.exists()) {
    const userData = userDoc.data();    
    return userData[info]
  }
}

export const getPrepaEleve = async (prepa) => {
  try {
    const db = getFirestore() 
    const q = query(collection(db, 'users2'), where('prepa' , '==', prepa), where('categorie', '==', "eleve"))
    const querySnapshot = await getDocs(q) 
    const eleves = querySnapshot.docs.map((doc) => {
      return doc.data()
    });

    return eleves;

  }catch (error) {
    console.log('Erreur lors de la récupération des eleves :', error)
    throw error;
  }
}

export const saveJson = async (json, sujet, userId, matiere, methode) => {
  try {
    const db = getFirestore();
    
    let prepa = await getInfo(userId, 'prepa');
    const email = await getInfo(userId, 'email');

    // on save le json
    const jsonCollection = collection(db, 'json-pdf');
    const jsonCollectionVerifier = collection(db, 'json-pdf-verifier');

    const newDoc = {
      creationDate: Date.now(),
      userId: userId,
      email: email,
      sujet: sujet,
      data: json,
      matiere:matiere,
      prepa: prepa,
      methode: methode,
    }
    // Ajoutez l'objet JSON à la collection
    await addDoc(jsonCollection, newDoc);
    await addDoc(jsonCollectionVerifier, newDoc)

    return newDoc

  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'objet JSON :', error);
    throw error;
  }
};


export const getJsonColles = async (userId) => {
  try {
    const db = getFirestore();
    const q = query(collection(db, 'json-pdf-verifier'),where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const colles = querySnapshot.docs.map((doc) => doc.data());

    // if (colles.length === 0) return null
    return colles;
  } catch (error) {
    console.error('Erreur lors de la récupération des colles :', error);
    throw error;
  }
};

export const getJsonPublicColle = async () => {
  try {
    const db = getFirestore() 
    const q = query(collection(db, 'public-colle'))

    const querySnapshot = await getDocs(q) 
    const publicColles = querySnapshot.docs.map((doc) => {
      return doc.data()
    })

    if (publicColles.length === 0) return null
    return publicColles
  }catch (err) {
    console.log("Erreur lors de la récupération des objets JSON :", err);
    throw err
  }
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users2", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        nombreColle: 0,
        nombrePlan: 0,
        nombrePrompt: 0,
        abonne: false,
        customerId: null,
        curieux: false, 
        date_abo: null,
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

    // Créez une requête pour obtenir tous les documents de la collection pour un utilisateur donné
    const q = query(collection(db, 'users2'));
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
export const actualiserBdd = async () => {
  const q = query(collection(db, 'json-pdf-verifier'), where("email", "in", ["!amaurytest@gmail.com", "aaaaa@g.com", "dv2lt02dmd@hellomailo.net", "l15t41vmyh@hellomailo.net"])) 
  const querySnapshot = await getDocs(q)
  console.log(querySnapshot.docs);
  
  querySnapshot.docs.forEach(async (doc) => {
    const docData = doc.data();
    const docRef = doc.ref;    
    deleteDoc(docRef) 
  })
}
