<template>
    <div>
      <div style="height: 30vh;">
        <canvas ref="lineChartCanvas"></canvas>
      </div>
      <!--
      <v-btn color="primary" @click="fetchLineChartData" :disabled="isUpdating" class="mb-4">
        {{ isUpdating ? 'Loading...' : 'Refresh Line Chart' }}
      </v-btn>
      -->
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted, onBeforeUnmount, } from "vue";
  import { Chart, registerables } from "chart.js";
  import axios from "axios";
  
  Chart.register(...registerables);
  
  export default defineComponent({
    name: "FirstHarmonicLineChart",
    setup() {
      const lineChartCanvas = ref(null);
      const lineChartInstance = ref(null);
      const isUpdating = ref(false);
      let intervalId = null;
  
      const fetchLineChartData = async () => {
        if (isUpdating.value) return;
        isUpdating.value = true;
  
        try {
          const [firstRes, thirdRes] = await Promise.all([
          axios.get("https://api.ch-data.xyz/api/first_magnitudes"),
          axios.get("https://api.ch-data.xyz/api/third_magnitudes")
          ])
          
  
          // Extract the values
          const firstValues = firstRes.data.map(item => item["first magnitudes"]);
          const thirdValues = thirdRes.data.map(item => item["third magnitudes"]);
          const labels = firstValues.map((_, i) => `${i + 1}`);
  
          // Clean up previous chart if exists
          if (lineChartInstance.value) {
            lineChartInstance.value.destroy();
            lineChartInstance.value = null;
            await new Promise(resolve => setTimeout(resolve, 50)); // prevent chart.js save error
          }

          
  
          // Create the line chart
          lineChartInstance.value = new Chart(lineChartCanvas.value, {
            type: 'line',
            data: {
              labels,
              datasets: [
                {
                  label: "1st Harmonic Magnitudes",
                  data: firstValues,
                  fill: false,
                  borderColor: "rgba(75, 192, 192, 1)",
                  tension: 0.1
                },
                {
                  label: "3rd Harmonic Magnitudes",
                  data: thirdValues,
                  fill: false,
                  borderColor: "rgba(255, 99, 132, 1)",
                  tension: 0.1
                },

              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: "Harmonic Magnitudes Over Time",
                  color:'white',
                  font:{
                    size: 20
                  }
                }
              },
              scales: {
                y: {
                  title: {
                    display: true,
                    text: 'Magnitudes',
                    color: 'white',
                    font: {
                      size: 14
                    }
                  },
                  beginAtZero: true
                },
                x: {
                  title: {
                    display: true,
                    text: 'Time',
                    color: 'white',
                    font:{
                      size: 14
                    }
                  }
                }
              }
            }
          });
  
        } catch (error) {
          console.error("Failed to load line chart data:", error);
        } finally {
          isUpdating.value = false;
        }
      };
  
      onMounted(() => {
        fetchLineChartData();

        intervalId = setInterval(() => {
          fetchLineChartData()
        },5000)
      });
  
      onBeforeUnmount(() => {
        if (lineChartInstance.value) {
          lineChartInstance.value.destroy();
          lineChartInstance.value = null;
        }
        if (intervalId) clearInterval(intervalId);
      });
  
      return {
        lineChartCanvas,
        fetchLineChartData,
        isUpdating
      };
    }
  });
  </script>
  