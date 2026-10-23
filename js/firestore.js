import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc
}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import {
  db
}
from "./firebase.js";

// Guardar favorito

export const saveFavorite =
async (
  earthquake,
  userId
) => {

  const favoritesRef =
    collection(
      db,
      "favorites"
    );

  const q =
    query(
      favoritesRef,
      where(
        "earthquakeId",
        "==",
        earthquake.id
      ),
      where(
        "userId",
        "==",
        userId
      )
    );

  const existing =
    await getDocs(q);

  if (
    !existing.empty
  ) {

    alert(
      "Ya existe en favoritos"
    );

    return;
  }

  await addDoc(
    favoritesRef,
    {
      earthquakeId:
        earthquake.id,

      userId,

      title:
        earthquake.properties.title,

      earthquake
    }
  );

  alert(
    "Añadido a favoritos"
  );

};

// Obtener favoritos

export const getFavorites =
async (
  userId
) => {

  const favoritesRef =
    collection(
      db,
      "favorites"
    );

  const q =
    query(
      favoritesRef,
      where(
        "userId",
        "==",
        userId
      )
    );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.map(
    doc => ({
      firestoreId:
        doc.id,
      ...doc.data()
    })
  );

};

// Eliminar favorito

export const removeFavorite =
async (
  firestoreId
) => {

  await deleteDoc(
    doc(
      db,
      "favorites",
      firestoreId
    )
  );

};