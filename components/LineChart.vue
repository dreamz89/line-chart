<template>
  <Line :data="chartConfig" :options="chartOptions" />
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
    unit: String,
  },
  computed: {
    chartConfig() {
      return {
        labels: this.data.map((value) => value.Year),
        datasets: [
          {
            label: "Data",
            backgroundColor: "#24806E",
            borderColor: "#D1D6DC",
            borderWidth: 1,
            data: this.data.map((value) => value.Value),
          },
        ],
      }
    },
    chartOptions() {
      return {
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
              text: this.unit,
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
      }
    },
  },
}
</script>
