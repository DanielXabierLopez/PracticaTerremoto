const BASE_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

export const getEarthquakes = async () => {

  try {

    const response =
      await fetch(BASE_URL);

    if (!response.ok) {

      throw new Error(
        "Error obteniendo terremotos"
      );

    }

    const data =
      await response.json();

    return data.features;

  } catch (error) {

    console.error(
      "Error API principal:",
      error
    );

    return [];

  }

};

export const getFilteredEarthquakes = async (
  startDate,
  endDate,
  magnitude
) => {

  try {

    if (
      !startDate ||
      !endDate
    ) {

      throw new Error(
        "Las fechas son obligatorias"
      );

    }

    const url =
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}&minmagnitude=${magnitude}`;

    console.log(
      "URL consulta:",
      url
    );

    const response =
      await fetch(url);

    if (!response.ok) {

      const errorText =
        await response.text();

      console.error(
        "Respuesta API:",
        errorText
      );

      throw new Error(
        `Error ${response.status}`
      );

    }

    const data =
      await response.json();

    return data.features || [];

  } catch (error) {

    console.error(
      "Error filtros:",
      error
    );

    return [];

  }

};