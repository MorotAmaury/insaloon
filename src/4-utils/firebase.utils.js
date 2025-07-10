// firebase.utils.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  Timestamp,
  query, 
  where,
  setDoc
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";

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
const db = getFirestore(app);
const auth = getAuth(app);


export async function addDefi({ titre, description, points }) {
  await addDoc(collection(db, "defis"), {
    nom: titre,
    description,
    points: Number(points),
  });
}
export async function addFamille({ nom }) {
  await addDoc(collection(db, "familles"), {
    nom: nom,
    points: 0,
  });
}
// 📥 Récupérer les défis
export async function getAllDefis() {
  const snapshot = await getDocs(collection(db, "defis"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// 📝 Ajouter une soumission
export async function submitDefiProof({ defiId, videoUrl, comment, famille }) {
  return await addDoc(collection(db, "soumissions"), {
    defiId,
    videoUrl,
    comment,
    famille,
    status: "pending",
    timestamp: Timestamp.now(),
  });
}

// 🔐 Récupérer l'utilisateur connecté
export function getCurrentUser() {
  return auth.currentUser;
}

// 🔁 Exporter les objets si besoin ailleurs

// ✅ Valider une soumission
export async function approveSubmission(submissionId, points) {
  const subRef = doc(db, "soumissions", submissionId);
  const submissionSnap = await getDoc(subRef);
  if (!submissionSnap.exists()) throw new Error("Soumission introuvable");

  const { famille } = submissionSnap.data();

  // Met à jour le statut de la soumission
  await updateDoc(subRef, {
    status: "approved",
  });

  // Trouve la famille dans la collection familles
  const famillesRef = collection(db, "familles");
  const q = query(famillesRef, where("nom", "==", famille));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    // Si famille inconnue, on crée un document famille avec points initiaux
    const familleDocRef = doc(famillesRef);
    await setDoc(familleDocRef, {
      nom: famille,
      points: points,
    });
  } else {
    // Sinon on met à jour les points
    const familleDoc = querySnapshot.docs[0];
    const currentPoints = familleDoc.data().points || 0;
    await updateDoc(familleDoc.ref, {
      points: currentPoints + points,
    });
  }
}

// ❌ Refuser une soumission avec raison
export async function refuseSubmission(submissionId, reason) {
  const subRef = doc(db, "soumissions", submissionId);
  await updateDoc(subRef, {
    status: "rejected",
    rejectionReason: reason,
  });
}

// 🔄 Récupérer les soumissions en attente
export async function getPendingSubmissions() {
  const snapshot = await getDocs(collection(db, "soumissions"));
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((s) => s.status === "pending");
}
// Récupérer toutes les familles avec points
export async function getFamilles() {
  const famillesSnap = await getDocs(collection(db, "familles"));
  return famillesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
export async function getDefis() {
  const defsSnap = await getDocs(collection(db, "defis"));
  return defsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
export async function getAllFamilles() {
  const famSnap = await getDocs(collection(db, "familles"));
  return famSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}