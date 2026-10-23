export const showLoader = () => {

  document
    .querySelector("#loader")
    .classList
    .remove("hidden");

};

export const hideLoader = () => {

  document
    .querySelector("#loader")
    .classList
    .add("hidden");

};

export const updateResultsCounter =
(total) => {

  document
    .querySelector("#totalResults")
    .textContent =
      `Resultados: ${total}`;

};

export const updateStats = ({
  apiCount = 0,
  filteredCount = 0,
  favoritesCount = 0,
  maxMagnitude = 0
}) => {

  document
    .querySelector("#apiCount")
    .textContent =
      apiCount;

  document
    .querySelector("#filteredCount")
    .textContent =
      filteredCount;

  document
    .querySelector("#favoritesCount")
    .textContent =
      favoritesCount;

  document
    .querySelector("#maxMagnitude")
    .textContent =
      maxMagnitude;

};

export const showEmptyFavorites =
() => {

  document
    .querySelector(
      "#favoritesMessage"
    )
    .classList
    .remove("hidden");

};

export const hideEmptyFavorites =
() => {

  document
    .querySelector(
      "#favoritesMessage"
    )
    .classList
    .add("hidden");

};

export const renderTopEarthquakes =
(earthquakes) => {

  const container =
    document.querySelector(
      "#earthquakesTable"
    );

  const sorted =
    [...earthquakes]
      .sort(
        (a, b) =>
          b.properties.mag -
          a.properties.mag
      )
      .slice(0, 10);

  container.innerHTML = `
    <table>

      <thead>
        <tr>
          <th>Magnitud</th>
          <th>Ubicación</th>
          <th>Fecha</th>
        </tr>
      </thead>

      <tbody>

        ${sorted.map(
          earthquake => `
            <tr>

              <td>
                ${earthquake.properties.mag}
              </td>

              <td>
                ${earthquake.properties.place}
              </td>

              <td>
                ${new Date(
                  earthquake.properties.time
                ).toLocaleDateString()}
              </td>

            </tr>
          `
        ).join("")}

      </tbody>

    </table>
  `;

};