<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/mainstore';

export default{
name: 'Sidebar',
computed:{
    ...mapState(useMainStore,['userName','userRole'])
},
methods:
{
    ...mapActions(useMainStore,['handleLogout'])
}
}
</script>

<template>
  
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light sidebar">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-dark min-vh-100">
                <a href="/" class="d-flex align-items-center pb-1 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Jual Sembako</span>
                </a>
                <ul class="nav nav-pills flex-column mb-sm-auto mt-5 mb-0 align-items-center align-items-sm-start" id="menu">
                    
                    <li v-if="userRole==='admin'">
                        <RouterLink to="/">
                        <a href="#" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span>
                        </a>
                        </RouterLink>
                    </li>
                    <li v-if="userRole==='admin'">
                        <RouterLink to="/items">
                        <a href="#" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-grid"></i> <span class="ms-1 d-none d-sm-inline">Items</span>
                        </a>
                        </RouterLink>
                    </li>
                    <li v-if="userRole==='admin'">
                        <RouterLink to="/purchases">
                        <a href="#" class="nav-link px-0 align-middle ">
                            <i class="fs-4 bi-cart4"></i> <span class="ms-1 d-none d-sm-inline">Purchases</span>
                        </a>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/sales">
                        <a href="#" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-cash"></i> <span class="ms-1 d-none d-sm-inline">Sales</span> 
                        </a>
                    </RouterLink>
                    </li>
                    <li v-if="userRole==='admin'">
                        <RouterLink to="/users">
                        <a href="#" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Users</span> </a>
                        </RouterLink>
                        </li>
                </ul>
                <hr>
                <div class="dropdown pb-4">
                    <a href="#" class="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="../assets/user.svg" alt="hugenerd" width="30" height="30" class="rounded-circle">
                        <span class="d-none d-sm-inline ms-3 me-1">{{userName}}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
            
                        <li>
                            <span class="dropdown-item" aria-disabled="true">{{ userRole }}</span>
                        </li>
                        <div class="dropdown-divider"></div>
                        <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
   
</template>

<style scoped>
</style>