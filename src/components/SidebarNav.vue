<template>
    <div>
      <v-app-bar-nav-icon @click="drawer = !drawer">📋</v-app-bar-nav-icon>
    <v-navigation-drawer :width="200" v-model="drawer" temporary>
  <v-list-item title="List of devices"></v-list-item>
  <v-divider></v-divider>
  <v-list-item link title="Device 1" to="/device1"></v-list-item>
  <v-list-item link title="Device 2" to="/device2"></v-list-item>
  <v-list-item link title="Device 3" to="/device3"></v-list-item>
  <template v-slot:append>
          <div class="pa-2">
            <v-btn block>
              Add device
            </v-btn>
          </div>
        </template>
</v-navigation-drawer>
    </div>
</template>

<script>
    export default {
        data(){
            return{
              drawer: false,
            }
        }
        
    }
</script>

<style scoped>

</style>