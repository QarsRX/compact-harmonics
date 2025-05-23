<template>
    <div>
      <TopMenu></TopMenu>
      <SidebarNav></SidebarNav>
        <v-container fluid>
          <v-row>
            <v-col>
              <DeviceWidget></DeviceWidget>
            </v-col>
          </v-row>
          <v-row class="flex-nowrap" style="overflow-x: auto; flex-wrap: nowrap;">
            <v-col style="min-width: 350px;">
              <LeafletMap></LeafletMap>
            </v-col>
            <v-col style="min-width: 350px;">
              <v-card>
                <BarChartAbout></BarChartAbout>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card>
                <LineChartAbout></LineChartAbout>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
    </div>
</template>

<script>
import { defineComponent,} from "vue";
//import { useRoute } from "vue-router";
//import BarChart from '@/components/BarChart.vue'
import BarChartAbout from '@/components/BarChartAbout.vue'
import TopMenu from '@/components/TopMenu.vue'
import SidebarNav from "@/components/SidebarNav.vue";
import LeafletMap from "@/components/LeafletMap.vue";
//import DatePicker from '@/components/DatePicker.vue'
import LineChartAbout from '@/components/LineChartAbout.vue'
import DeviceWidget from '@/components/DeviceWidget.vue'
export default defineComponent({
  components: { 
    //BarChart, 
    BarChartAbout,
    TopMenu, 
    SidebarNav,  
    LeafletMap,
    //DatePicker,
    LineChartAbout,
    DeviceWidget 
    },
  
})
</script>

<style scoped>

</style>