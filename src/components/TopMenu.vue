<template>
    <v-app-bar :elevation="2">
  <template v-slot:prepend>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  </template>
  <v-spacer></v-spacer>
  <v-app-bar-title class="text-center" id="title">Compact Harmonics</v-app-bar-title>
  <v-spacer></v-spacer>
  <v-btn variant="outlined" elevation="2" to="/login_page">Login</v-btn>
</v-app-bar>
<v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item v-for="item in navItems" :key="item.text" :to="item.route">
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        data(){
            return {
                drawer: false, // Controls the sidebar
      navItems: [
        { text: 'Home', route: '/' },
        { text: 'About', route: '/about' },
      ]
            }
        }
        
    }
</script>

<style scoped>
  @font-face {
    font-family: 'BNMachine';
    src: url("@/fonts/BNMachine.ttf") format("truetype");
  
  } 

  #title {
    font-family: "BNMachine", sans-serif;
    font-size: 24px;
  }
</style>