<template src="./CompanyList.html"></template>

<script>

export default {
  name: "CompanyList",


  data () {
    return {

      ready: false,

      company_list:[],
      search: '',

      headers: [
        { text: 'Бренд', value: 'brand' },
        {
          text: 'Компания',
          align: 'start',
          value: 'name_ru',
        },
        { text: 'Ушли', value: 'year_out' },

      ],

      status:[
        {
          id:0,
          name:"Нейтральный",
          color: 'grey'
        },
        {
          id:1,
          name:"Зеленый",
          color: 'green'
        },
        {
          id:2,
          name:"Желтый",
          color: 'yellow'
        },
        {
          id:3,
          name:"Красный",
          color: 'red'
        },
      ],

      segment:[
        {
          id:0,
          name:"Пусто"
        },
        {
          id:1,
          name:"IT"
        },
        {
          id:2,
          name:"Ресурсы"
        },
        {
          id:3,
          name:"Транспорт"
        },
      ]
    }
  },

  created() {
    console.log('company created');
    this.loadList(1);
  },

  mounted() {
    console.log('company mounted');
  },


  methods:{

    loadList(i=1){

      if (i===1){
        this.ready = false;
        this.search="";
        this.company_list = [];
      }

      let pr = this.$store.state.api.loadCompanyList(i);

      pr.then( data =>{

        console.log(data);

        Array.prototype.push.apply(this.company_list, data.data);

        if (data.meta.pagination.page<data.meta.pagination.pageCount){
          this.loadList(data.meta.pagination.page+1);
        }
        else{
          this.ready = true;
        }
      })
    },



  },
}
</script>

<style scoped>

</style>
