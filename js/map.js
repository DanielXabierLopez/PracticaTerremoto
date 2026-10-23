export const createMap = (
  containerId
) => {

  const map =
    L.map(containerId)
      .setView(
        [20, 0],
        2
      );

  L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        "&copy; OpenStreetMap contributors"
    }
  ).addTo(map);

  return map;

};

export const getMarkerColor = (
  magnitude
) => {

  if (magnitude >= 7)
    return "#ff0000";

  if (magnitude >= 6)
    return "#ff6600";

  if (magnitude >= 5)
    return "#ffcc00";

  if (magnitude >= 4)
    return "#33cc33";

  if (magnitude >= 2)
    return "#3399ff";

  return "#666666";

};

export const drawEarthquakes = (
  earthquakes,
  map,
  isFavoriteView = false
) => {

  earthquakes.forEach(
    (earthquake) => {

      const magnitude =
        earthquake.properties.mag;

      const color =
        getMarkerColor(
          magnitude
        );

      const [
        longitude,
        latitude
      ] =
      earthquake.geometry.coordinates;

      const marker =
        L.circleMarker(
          [latitude, longitude],
          {
            radius: 8,
            fillColor: color,
            color: "#000",
            weight: 1,
            fillOpacity: 0.8
          }
        );

      const buttonHtml =
        isFavoriteView
          ? `
          <button
            onclick="window.deleteFavorite('${earthquake.firestoreId}')"
          >
            ❌ Eliminar
          </button>
          `
          : `
          <button
            onclick="window.saveFavorite('${earthquake.id}')"
          >
            ❤️ Favorito
          </button>
          `;

      marker.bindPopup(`
        <div>

          <h3>
            ${earthquake.properties.title}
          </h3>

          <hr>

          <p>
            📅
            ${new Date(
              earthquake.properties.time
            ).toLocaleString()}
          </p>

          <p>
            📍
            ${earthquake.properties.place}
          </p>

          <p>
            🆔
            ${earthquake.id}
          </p>

          <p>
            🌋 Magnitud:
            ${earthquake.properties.mag}
            ${earthquake.properties.magType}
          </p>

          ${buttonHtml}

        </div>
      `);

      marker.addTo(
        map
      );

    }
  );

};

export const clearMap = (
  map
) => {

  map.eachLayer(
    (layer) => {

      if (
        !(layer instanceof L.TileLayer)
      ) {

        map.removeLayer(
          layer
        );

      }

    }
  );

};

export const fitMapToMarkers = (
  earthquakes,
  map
) => {

  if (!earthquakes.length)
    return;

  const coordinates =
    earthquakes.map(
      (earthquake) => {

        const [
          longitude,
          latitude
        ] =
        earthquake.geometry.coordinates;

        return [
          latitude,
          longitude
        ];

      }
    );

  map.fitBounds(
    coordinates,
    {
      padding: [
        50,
        50
      ]
    }
  );

};