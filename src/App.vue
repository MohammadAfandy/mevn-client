<template>
  <div id="app" :class="{ hideBackground: hideBackground }">
    <b-container>
      <Navbar class="navbar" />
    </b-container>
    <b-container class="content">
      <div class="loading" v-show="showLoading">Proses</div>
      <img alt="Vue logo" src="./assets/logo.png" class="logo">
      <router-view />
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from './components/NavbarComponent'

export default {
  name: 'app',
  components: {
    'Navbar': Navbar
  },
  data() {
    return {
      showLoading: false,
      hideBackground: false,
    }
  },
  created() {
    axios.interceptors.request.use((config) => {
      this.showLoading = true
      this.hideBackground = true
      return config;
    }, (error) => {
      this.showLoading = false
      this.hideBackground = false
      return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
      this.showLoading = false
      this.hideBackground = false
      return response;
    }, (error) => {
      this.showLoading = false
      this.hideBackground = false
      return Promise.reject(error);
    });
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.logo {
  display: block;
  margin: 0 auto;
}

.content {
  margin-top: 60px;
}

.hideBackground {
    background-color:#EFEFEF;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
    top: 0px;
    left: 0px;
    opacity: .5; /* in FireFox */ 
    filter: alpha(opacity=50); /* in IE */
}
</style>
