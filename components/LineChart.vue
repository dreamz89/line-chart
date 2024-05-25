<template>
  <Line :data="chartConfig" :options="options" />
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "vue-chartjs"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  components: {
    Line,
  },
  props: {
    data: Array,
  },
  data() {
    return {
      chartConfig: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Data",
            backgroundColor: "#24806E",
            borderColor: "#D1D6DC",
            borderWidth: 1,
            data: [40, 39, 10, 40, 39, 80, 40],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Year",
              color: "#333A42",
              font: {
                family: "sans-serif",
                size: 20,
                lineHeight: 1.2,
              },
              padding: { top: 10, left: 0, right: 0, bottom: 0 },
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Value",
              color: "#333A42",
              font: {
                family: "sans-serif",
                size: 20,
                lineHeight: 1.2,
              },
              padding: { top: 0, left: 0, right: 0, bottom: 10 },
            },
          },
        },
      },
    }
  },
}
</script>
