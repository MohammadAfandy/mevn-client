<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="dark" fixed="top">
      <b-navbar-brand href="#">MEVN</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-for="link in links" :key="link.id" :to="`${link.page}`">{{ link.text }}</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      links: [
        {
          id: 0,
          text: "Hello World",
          page: "/helloworld"
        },
        {
          id: 1,
          text: "Players",
          page: "/player"
        },
        {
          id: 3,
          text: "Alternatif",
          page: "/alternatif"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>