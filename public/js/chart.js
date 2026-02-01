// Select the canvas element
const ctx = document.getElementById("myChart");

// Create a new Chart
new Chart(ctx, {
  type: "bar",

  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],

    datasets: [
      {
        label: "Monthly Sales",
        data: [1200, 1900, 3000, 2500, 3200],

        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)"
        ],

        borderWidth: 1
      }
    ]
  },

  options: {
    responsive: true,

    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
