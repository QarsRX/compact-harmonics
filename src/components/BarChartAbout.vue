<template>
    <div style="height: 30vh; width: 100%">
        <canvas ref="chartCanvas"></canvas>
    </div>
    <div>
        <h2 style="padding: auto;">Last Update: {{ formattedTimestamp }}</h2>
        <!--
        <v-btn color="primary" @click="updateChart" :disabled="isUpdating" class="mb-4">
  {{ isUpdating ? 'Updating...' : 'Update Chart' }}
</v-btn>
         -->
    </div>
    <div>
      <h2 :style="{ color: thd < 0.05 ? 'green' : thd < 0.1 ? 'orange' : 'red' }">
        Total Harmonic Distortion (THD): {{ (thd * 100).toFixed(2) }}%</h2>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref, onBeforeUnmount, nextTick, computed} from "vue";
import { Chart, registerables } from "chart.js";
import axios from "axios";

Chart.register(...registerables);
export default defineComponent({
  name: "ChartWithButton",
  setup() {
    const isUpdating = ref(false);
    const chartCanvas = ref(null);
    const chartInstance = ref(null);
    const timestamp = ref(null);
    const thd = ref(null);
    let intervalId= null; //store the interval ID

    const renderChart = (labels, data) => {
      if (!chartCanvas.value) return;

      if (chartInstance.value) {
        chartInstance.value.destroy();
        chartInstance.value = null;
      }

      chartInstance.value = new Chart(chartCanvas.value, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Magnitude",
              data,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Harmonic Magnitudes",
              color: "white",
              font: {
                size: 20
              }
            },
          },
          scales: {
            y: {
              title:{
                display: true,
                text: 'Magnitudes',
                color: 'white',
                font:{
                  size:14
                }
              },
              beginAtZero: true,
            },
            x: {
              title:{
                display: true,
                text: 'Order of harmonics',
                color: 'white',
                font:{
                  size:14
                }
              },
              beginAtZero: true,
            },
          },
        },
      });
    };

    const fetchLatestData = async () => {
      try {
        const res = await axios.get("https://api.ch-data.xyz/api/harmonics"); //temporary tunnel
        //http://10.205.122.126 pi address
        console.log("Fetched data:", res.data);

        const magnitudes = res.data[0]?.Magnitude;

        if (!Array.isArray(magnitudes)) {
          throw new Error("Magnitude is not an array");
        }

        const labels = magnitudes.map((_, i) => `${i + 1}`);
        await nextTick();
        renderChart(labels, magnitudes);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      }
    };

    const fetchTimestamp = async () => {
        try {
    const res = await axios.get("https://api.ch-data.xyz/api/timestamp");
    const rawTimestamp = res.data?.[0]?.date_time;
    timestamp.value = rawTimestamp || null;
    console.log("Fetched timestamp:", timestamp.value);
  } catch (error) {
    console.error("Failed to fetch timestamp:", error);
  }
    };

    const fetchTHD = async () => {
  try {
    const res = await axios.get("https://api.ch-data.xyz/api/thd");
    thd.value = res.data?.THD ?? null;
    console.log("Fetched THD:", thd.value);
  } catch (error) {
    console.error("Failed to fetch THD:", error);
  }
};

  

    const formattedTimestamp = computed(() => {
  if (!timestamp.value) return "N/A";
  const date = new Date(timestamp.value);
  return date.toLocaleString();
});

    const updateChart = async () => {
  if (isUpdating.value) return;
  isUpdating.value = true;

  try {
    await Promise.all([
      fetchLatestData(),
      fetchTimestamp(),
      fetchTHD()
    ]);
  } finally {
    isUpdating.value = false;
  }
};

    onMounted(() => {
      updateChart();

      intervalId = setInterval(() => {
        updateChart();
      },5000); // repeat every 5 seconds
    });
    

    onBeforeUnmount(() => {
      if (chartInstance.value) {
        chartInstance.value.destroy();
        chartInstance.value = null;
      }
      clearInterval(intervalId); //clean up interval
    });

    return {
      chartCanvas,
      updateChart,
      isUpdating,
      timestamp,
      formattedTimestamp,
      thd
    };
  },
});
</script>

<style scoped>

</style>