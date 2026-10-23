let magnitudeChart = null;
let dateChart = null;
let locationChart = null;

// Distribución por magnitudes

export const renderMagnitudeChart =
(earthquakes) => {

  const buckets = [
    0, 0, 0, 0,
    0, 0, 0, 0
  ];

  earthquakes.forEach(
    earthquake => {

      const mag =
        earthquake.properties.mag || 0;

      if (mag < 1) buckets[0]++;
      else if (mag < 2) buckets[1]++;
      else if (mag < 3) buckets[2]++;
      else if (mag < 4) buckets[3]++;
      else if (mag < 5) buckets[4]++;
      else if (mag < 6) buckets[5]++;
      else if (mag < 7) buckets[6]++;
      else buckets[7]++;

    }
  );

  if (magnitudeChart) {
    magnitudeChart.destroy();
  }

  const ctx =
    document
      .querySelector(
        "#magnitudeChart"
      );

  magnitudeChart =
    new Chart(
      ctx,
      {
        type: "bar",

        data: {

          labels: [
            "0-1",
            "1-2",
            "2-3",
            "3-4",
            "4-5",
            "5-6",
            "6-7",
            "7+"
          ],

          datasets: [{
            label:
              "Terremotos",

            data:
              buckets,

            backgroundColor: [
              "#666666",
              "#3399ff",
              "#3399ff",
              "#33cc33",
              "#33cc33",
              "#ffcc00",
              "#ff6600",
              "#ff0000"
            ]
          }]
        },

        options: {
          responsive: true
        }

      }
    );

};

// Distribución temporal

export const renderDateChart =
(earthquakes) => {

  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic"
  ];

  const counters =
    new Array(12).fill(0);

  earthquakes.forEach(
    earthquake => {

      const date =
        new Date(
          earthquake.properties.time
        );

      counters[
        date.getMonth()
      ]++;

    }
  );

  if (dateChart) {
    dateChart.destroy();
  }

  const ctx =
    document
      .querySelector(
        "#dateChart"
      );

  dateChart =
    new Chart(
      ctx,
      {

        type: "line",

        data: {

          labels:
            months,

          datasets: [

            {
              label:
                "Terremotos",

              data:
                counters,

              borderColor:
                "#3478f6",

              tension:
                0.3
            }

          ]

        },

        options: {
          responsive: true
        }

      }
    );

};

// Top ubicaciones

export const renderLocationChart =
(earthquakes) => {

  const places = {};

  earthquakes.forEach(
    earthquake => {

      const place =
        earthquake
          .properties
          .place;

      if (!place) return;

      const parts =
        place.split(",");

      const key =
        parts[
          parts.length - 1
        ]
          .trim();

      places[key] =
        (places[key] || 0)
        + 1;

    }
  );

  const sorted =
    Object.entries(
      places
    )
      .sort(
        (a, b) =>
          b[1] - a[1]
      )
      .slice(0, 10);

  if (
    locationChart
  ) {

    locationChart.destroy();

  }

  const ctx =
    document.querySelector(
      "#locationChart"
    );

  locationChart =
    new Chart(
      ctx,
      {

        type: "bar",

        data: {

          labels:
            sorted.map(
              item =>
                item[0]
            ),

          datasets: [

            {
              label:
                "Terremotos",

              data:
                sorted.map(
                  item =>
                    item[1]
                ),

              backgroundColor:
                "#1e3a5f"
            }

          ]

        },

        options: {
          responsive: true
        }

      }
    );

};

// Renderizar todas

export const renderCharts =
(earthquakes) => {

  renderMagnitudeChart(
    earthquakes
  );

  renderDateChart(
    earthquakes
  );

  renderLocationChart(
    earthquakes
  );

};