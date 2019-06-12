<template>
  <div id="app">
    <Navbar class="navbar" />
    <img alt="Vue logo" src="./assets/logo.png" class="logo">
    <router-view />
    <!-- <PlayersComponent msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import Navbar from './components/NavbarComponent'

export default {
  name: 'app',
  components: {
    'Navbar': Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px 100px;
}

.logo {
  display: block;
  margin: 0 auto;
}
</style>
