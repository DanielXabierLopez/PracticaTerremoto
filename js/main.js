import {
  getEarthquakes,
  getFilteredEarthquakes
}
from "./api.js";

import {
  getFavorites,
  saveFavorite,
  removeFavorite
}
from "./firestore.js";

import {
  createMap,
  drawEarthquakes,
  clearMap,
  fitMapToMarkers
}
from "./map.js";

import {
  showLoader,
  hideLoader,
  updateResultsCounter,
  updateStats,
  showEmptyFavorites,
  hideEmptyFavorites,
  renderTopEarthquakes
}
from "./ui.js";

import {
  renderCharts
}
from "./charts.js";

import {
  auth,
  login,
  logout,
  onAuthStateChanged
}
from "./firebase.js";

const map =
  createMap("map");

const map2 =
  createMap("map2");

let allEarthquakes = [];

let currentUser = null;

// Login

document
  .querySelector("#loginBtn")
  .addEventListener(
    "click",
    login
  );

// Logout

document
  .querySelector("#logoutBtn")
  .addEventListener(
    "click",
    logout
  );

// Estado usuario

onAuthStateChanged(
  auth,
  (user) => {

    currentUser = user;

    const userInfo =
      document.querySelector(
        "#userInfo"
      );

    if (user) {

      userInfo.textContent =
        `👤 ${user.displayName}`;

    } else {

      userInfo.textContent =
        "Invitado";

    }

  }
);

// Guardar favorito

window.saveFavorite =
async (id) => {

  if (!currentUser) {

    alert(
      "Debes iniciar sesión"
    );

    return;

  }

  const earthquake =
    allEarthquakes.find(
      earthquake =>
        earthquake.id === id
    );

  if (earthquake) {

    await saveFavorite(
      earthquake,
      currentUser.uid
    );

  }

};

// Eliminar favorito

window.deleteFavorite =
async (
  firestoreId
) => {

  await removeFavorite(
    firestoreId
  );

  await showFavorites();

};

// Aplicar estadísticas

const applyVisuals =
(earthquakes) => {

  if (
    earthquakes.length === 0
  ) return;

  renderTopEarthquakes(
    earthquakes
  );

  renderCharts(
    earthquakes
  );

  updateStats({

    maxMagnitude:
      Math.max(
        ...earthquakes.map(
          earthquake =>
            earthquake.properties.mag
        )
      ).toFixed(1)

  });

};

// Carga inicial

const init = async () => {

  try {

    showLoader();

    allEarthquakes =
      await getEarthquakes();

    clearMap(map);

    drawEarthquakes(
      allEarthquakes,
      map
    );

    fitMapToMarkers(
      allEarthquakes,
      map
    );

    updateResultsCounter(
      allEarthquakes.length
    );

    updateStats({

      apiCount:
        allEarthquakes.length

    });

    applyVisuals(
      allEarthquakes
    );

  } catch (error) {

    console.error(error);

  } finally {

    hideLoader();

  }

};

// Mostrar favoritos

const showFavorites =
async () => {

  if (!currentUser) {

    alert(
      "Debes iniciar sesión"
    );

    return;

  }

  try {

    showLoader();

    const favorites =
      await getFavorites(
        currentUser.uid
      );

    const earthquakes =
      favorites.map(
        favorite => ({
          firestoreId:
            favorite.firestoreId,
          ...favorite.earthquake
        })
      );

    clearMap(map);

    if (
      earthquakes.length === 0
    ) {

      showEmptyFavorites();

    } else {

      hideEmptyFavorites();

      drawEarthquakes(
        earthquakes,
        map,
        true
      );

      fitMapToMarkers(
        earthquakes,
        map
      );

    }

    updateResultsCounter(
      earthquakes.length
    );

    updateStats({

      favoritesCount:
        earthquakes.length

    });

    applyVisuals(
      earthquakes
    );

  } catch (error) {

    console.error(error);

  } finally {

    hideLoader();

  }

};

// API principal

const showApiEarthquakes =
() => {

  hideEmptyFavorites();

  clearMap(map);

  drawEarthquakes(
    allEarthquakes,
    map
  );

  fitMapToMarkers(
    allEarthquakes,
    map
  );

  updateResultsCounter(
    allEarthquakes.length
  );

  updateStats({

    apiCount:
      allEarthquakes.length

  });

  applyVisuals(
    allEarthquakes
  );

};

// Búsqueda

const searchEarthquakes =
async () => {

  const magnitude =
    document
      .querySelector(
        "#magnitude"
      )
      .value || 0;

  const startDate =
    document
      .querySelector(
        "#startDate"
      )
      .value;

  const endDate =
    document
      .querySelector(
        "#endDate"
      )
      .value;

  if (
    !startDate ||
    !endDate
  ) {

    alert(
      "Selecciona ambas fechas"
    );

    return;

  }

  try {

    showLoader();

    const earthquakes =
      await getFilteredEarthquakes(
        startDate,
        endDate,
        magnitude
      );

    if (
      earthquakes.length === 0
    ) {

      alert(
        "No se encontraron resultados"
      );

      return;

    }

    clearMap(map2);

    drawEarthquakes(
      earthquakes,
      map2
    );

    fitMapToMarkers(
      earthquakes,
      map2
    );

    updateResultsCounter(
      earthquakes.length
    );

    updateStats({

      filteredCount:
        earthquakes.length

    });

    applyVisuals(
      earthquakes
    );

  } catch (error) {

    console.error(error);

  } finally {

    hideLoader();

  }

};

// Limpiar filtros

const resetFilters =
() => {

  document
    .querySelector(
      "#magnitude"
    )
    .value = "";

  document
    .querySelector(
      "#startDate"
    )
    .value = "";

  document
    .querySelector(
      "#endDate"
    )
    .value = "";

  clearMap(map2);

  updateResultsCounter(0);

};

document
  .querySelector(
    "#searchBtn"
  )
  .addEventListener(
    "click",
    searchEarthquakes
  );

document
  .querySelector(
    "#resetFiltersBtn"
  )
  .addEventListener(
    "click",
    resetFilters
  );

document
  .querySelector(
    "#showFavoritesBtn"
  )
  .addEventListener(
    "click",
    showFavorites
  );

document
  .querySelector(
    "#showApiBtn"
  )
  .addEventListener(
    "click",
    showApiEarthquakes
  );

init();