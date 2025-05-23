<template>
  <div class="home">
    <TopMenu></TopMenu>
    <SidebarNav></SidebarNav>
    <v-container>
      <v-row>
        <v-col>
          <v-img class="mx-auto my-6"
        max-width="228"
        src="../assets/compact_harmonics.png"></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1>Welcome to Group 6 project: Current Harmonics and Callibration Device</h1>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import TopMenu from '@/components/TopMenu.vue'
import SidebarNav from '@/components/SidebarNav.vue'
//import DatePicker from '@/components/DatePicker.vue'

export default {
  name: 'HomeView',
  components: {
    //HelloWorld
    TopMenu,
    SidebarNav,
    //DatePicker
  }
}
</script>
