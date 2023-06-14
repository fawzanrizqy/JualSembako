<script>
import Sidebar from './components/Sidebar.vue';
import {useMainStore} from './stores/mainstore';
import { mapState, mapActions } from 'pinia'
export default{
    name: "App",
    components: { Sidebar },
    methods:{
    ...mapActions(useMainStore,['checkState'])
    },
    computed:
    {
      ...mapState(useMainStore,['loggedState'])
    },
    created()
    {
      this.checkState();
    }
}
</script>

<template>
  <div class="container-fluid">
    
    <div class="row flex-nowrap">
        <Sidebar v-if="loggedState" />
        <div class="col py-3">
          <div class="container-fluid">
           <RouterView></RouterView>
           </div>
        </div>
    
      </div>
</div> 
</template>

<style>
</style>