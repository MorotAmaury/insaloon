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


export async function addDefi({ selectedCategorie, titre, description, points }) {
  console.log("Adding defi:",selectedCategorie, titre, description, points);
  
  await addDoc(collection(db, "defis"), {
    categorie : selectedCategorie,
    nom: titre,
    description,
    points: Number(points),
  });
}
export async function addFamille({ nom, nbPersonnes }) {
  await addDoc(collection(db, "familles"), {
    nom: nom,
    nbPersonnes: nbPersonnes ?? 0, // par défaut 0 si non renseigné
    points: 0,
  });
}
// 📥 Récupérer les défis
export async function getAllDefis() {
  const snapshot = await getDocs(collection(db, "defis"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
// 📥 Récupérer toutes les familles
export async function getFamilles() {
  const snapshot = await getDocs(collection(db, "familles"));
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

// ✏️ Mettre à jour une famille
export async function updateFamille(id, { nom, nbPersonnes, points }) {
  const familleRef = doc(db, "familles", id);

  const updateData = {};
  if (nom !== undefined) updateData.nom = nom;
  if (nbPersonnes !== undefined) updateData.nbPersonnes = nbPersonnes;
  if (points !== undefined) updateData.points = points;

  await updateDoc(familleRef, updateData);
}
// 📝 Ajouter une soumission
export async function submitDefiProof({ defiId, videoUrl, comment, famille, visibleFor }) {
  return await addDoc(collection(db, "soumissions"), {
    defiId,
    videoUrl,
    comment,
    famille,
    visibleFor : visibleFor || 'any', 
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

export async function getDefis() {
  const defsSnap = await getDocs(collection(db, "defis"));
  return defsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
export async function getAllFamilles() {
  const famSnap = await getDocs(collection(db, "familles"));
  return famSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export const getSoumissionsByFamille = async (familleNom) => {
  const q = query(collection(db, "soumissions"), where("famille", "==", familleNom));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
export const getDefiById = async (id) => {
  const docRef = doc(db, "defis", id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  } else {
    return null;
  }
};
export const updateDefi = async (id, { nom, description, points }) => {
  const defiRef = doc(db, "defis", id);
  await updateDoc(defiRef, {
    nom,
    description,
    points: Number(points),
  });
};
// Ajouter une nouvelle catégorie
export const addCategorie = async (nom) => {
  const ref = collection(db, 'categories');
  await addDoc(ref, { nom, visible: true });
};
export const getAllCategories = async () => {
  const ref = collection(db, 'categories');
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
export const getVisibleCategories = async () => {
  const ref = collection(db, 'categories');
  const q = query(ref, where('visible', '==', true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
export const toggleCategorieVisibility = async (id, currentVisible) => {
  const ref = doc(db, 'categories', id);
  await updateDoc(ref, { visible: !currentVisible });
};

export const getDefisByCategorieVisible = async () => {
  const catSnapshot = await getDocs(query(collection(db, 'categories'), where('visible', '==', true)));
  const categories = catSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const defisSnapshot = await getDocs(collection(db, 'defis'));
  const defis = defisSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const grouped = categories.map(cat => ({
    categorie: cat.nom,
    defis: defis.filter(d => d.categorie === cat.nom)
  }));

  return grouped;
};


export const isDefiNameTaken = async (nom) => {
  const defisRef = collection(db, "defis");
  const q = query(defisRef, where("nom", "==", nom));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; // true si déjà existant
};

export const verifyAdminCredentials = async (identifiant, motDePasse) => {
  const roles = ["respo_fille", "respo_garcon"];

  for (const role of roles) {
    const docRef = doc(db, "adminAccess", role);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.identifiant === identifiant && data.motDePasse === motDePasse) {
        return role; // retourne le rôle correspondant
      }
    }
  }

  return null;
};