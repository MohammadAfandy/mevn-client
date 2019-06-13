<template>
  <div id="app">
    <v-app>
      <Navbar class="navbar"/>
      <v-content class="content">
        <div class="logo">
          <img alt="Vue logo" src="./assets/logo.png" class="img-logo" />
        </div>
        <router-view/>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./components/NavbarComponent";

export default {
  name: "app",
  components: {
    Navbar: Navbar
  },
  data() {
    return {
      showLoading: false,
      hideBackground: false
    };
  },
  created() {
    axios.interceptors.request.use(
      config => {
        this.showLoading = true;
        this.hideBackground = true;
        return config;
      },
      error => {
        this.showLoading = false;
        this.hideBackground = false;
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        this.showLoading = false;
        this.hideBackground = false;
        return response;
      },
      error => {
        this.showLoading = false;
        this.hideBackground = false;
        return Promise.reject(error);
      }
    );
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-logo {
  display: inline-block;
  margin: 0 20px;
  max-height: 200px;
  max-width: 200px;
}

.content {
  margin: 0 20px;
}

.hideBackground {
  background-color: #efefef;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
  top: 0px;
  left: 0px;
  opacity: 0.5; /* in FireFox */
  filter: alpha(opacity=50); /* in IE */
}
</style>
