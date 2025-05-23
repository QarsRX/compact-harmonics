<template>
    <div>
      <v-card elevation="4">
        <v-card-text>
          <v-row>
            <v-col class="text-h5">
              <v-icon
            color="error"
            icon="mdi-thermometer"
            size="50"
          ></v-icon>{{ widgetData.temp_val }}
            </v-col>
          <v-col class="text-h5">
            <v-icon
            icon="mdi-battery"
            size="50"
          ></v-icon>{{ widgetData.battery_val }}
          </v-col>
          <v-col class="text-h5">
            <v-icon
            color="success"
            icon="mdi-access-point"
            size="50"
          ></v-icon> ONLINE
          </v-col>
          <v-col class="text-h5">
            Location: {{ widgetData.location }}
          </v-col>
        </v-row>
        </v-card-text>
      </v-card>
    </div>
</template>

<script>
    export default {
        computed: {
      widgetData() {
        const routesData = {
          "/device1": { 
           battery_val: "100%",
           temp_val:  "26°C",
           location: "Manchester"
          },

          "/device2": { 
            battery_val: "80%",
            temp_val:  "28°C",
            location: "Edinburgh"
          },

          "/device3": { 
            battery_val: "70%",
            temp_val:  "21°C",
            location: "London"
          },
        };
  
        return routesData[this.$route.path] || { title: "Default Title", content: "Default Content" };
      },
    },
    }
</script>

<style scoped>

</style>