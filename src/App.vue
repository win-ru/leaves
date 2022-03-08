<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

      Leavers


      <v-spacer></v-spacer>

      <v-btn
        href="https://forms.gle/XAd6dBvHHoybXqxk6"
        target="_blank"
        color="red"
      >
        <span class="mr-2">Добавить компанию</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
