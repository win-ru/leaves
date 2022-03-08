<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>




    <v-card
        width="300"
        class="mx-auto my-12 pa-5"

    >

      <v-btn
          href="/#/list"
          color="blue"
          dark
      >
        <span class="mr-2">Список</span>
      </v-btn>

      <br><br>

      <v-btn
          href="/#/company"
          color="green"
          dark
      >
        <span class="mr-2">Редактирование</span>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>


    </v-card>







  </div>
</template>

<script>



export default {
  name: 'Home',

}
</script>
