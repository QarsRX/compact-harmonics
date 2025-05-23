<template>
    <div>
        <TopMenu></TopMenu>
        <v-container>
            <v-row>
                <v-col>
                    <v-card>
                        <LeafletMap></LeafletMap>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-text>ICONS</v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        
    </div>
</template>

<script>
import LeafletMap from '@/components/LeafletMap.vue'
import TopMenu from '@/components/TopMenu.vue'
    export default {
        components: {
            LeafletMap,
            TopMenu
        },
        data(){
            return{

            }
        }
    }
</script>

<style scoped>

</style>