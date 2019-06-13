<template>
  <div>
    <v-navigation-drawer v-model="drawer" app permanent>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Mohammad Afandy</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="link in links" :key="link.title" :to="link.page">
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ link.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      drawer: true,
      right: null,
      links: [
        {
          title: 'Hello World',
          page: '/helloworld',
          icon: 'person'
        },
        {
          title: 'Players',
          page: '/player',
          icon: 'dashboard'
        },
        {
          title: 'Alternatif',
          page: '/alternatif',
          icon: 'question_answer'
        }
      ]
    };
  }
};
</script>