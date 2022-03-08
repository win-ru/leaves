<template src="./Company.html"></template>

<script>

import JsonCSV from 'vue-json-csv'
//import {convertCSVToArray} from "convert-csv-to-array";

//import csv from "@/assets/00.csv";

//require("csv-parse/lib/es5);


export default {
  name: "CompanyList",
  components:{'downloadCsv': JsonCSV},


  data () {
    return {

      ready: false,

      company_list:[],

      picker:{
        in: false,
        out: false,
        return:false
      },

      working: false,


      company:{
        id:           0,
        name_ru:      "",
        name_eng:     "",
        brand:        "",
        description:  "",
        year_in:      "2022-01-01",
        year_out:     "2022-04-01",
        year_return:  "2022-01-01",
        status:       1,
        is_leave:     true,
        comment:      "",
        links:        [],
        segment:      0,
        people:       [],
        rage:         0,
        country:      "",
        country_root: "",
        links_text:   "",
        images_text:  "",
        peoples_text: "",
        inn:          "",
        FIO:          "",
        published:    false,

      },

      dialog: false,
      edited_dialog: false,
      dialogDelete: false,
      editedIndex: -1,

      company_edited:{
        id:           0,
        name_ru:      "",
        name_eng:     "",
        brand:        "",
        description:  "",
        year_in:      "",
        year_out:     "",
        year_return:  "",
        status:       1,
        is_leave:     true,
        comment:      "",
        links:        [],
        segment:      0,
        people:       [],
        rage:         0,
        country:      "",
        country_root: "",
        links_text:   "",
        images_text:  "",
        peoples_text: "",
        inn:          "",
        FIO:          "",
        published:    false,

      },

      search: '',

      headers: [
        { text: 'ID', value: 'id' },
        {
          text: 'Название',
          align: 'start',
          value: 'name_ru',
        },
        { text: 'Бренд', value: 'brand' },
        { text: 'Сегмент', value: 'segment' },
        { text: 'Ушли', value: 'year_out' },

      ],
      satisfactionEmojis: ['😍', '😄', '😁', '😊', '🙂', '😐', '🙁', '☹️', '😢', '😭'],

      snackbar: false,
      snackbar_text: 'My timeout is set to 2000.',
      snackbar_timeout: 2000,

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
          name:"Не выбрано"
        },
        {
          id:1,
          name:"IT и технологии"
        },
        {
          id:2,
          name:"Ресурсы и энергетика"
        },
        {
          id:3,
          name:"Транспорт"
        },
        {
          id:4,
          name:"Финансы"
        },
        {
          id:5,
          name:"Крипта"
        },
        {
          id:6,
          name:"Доставка и логистика"
        },
        {
          id:7,
          name:"Ритейл"
        },
        {
          id:8,
          name:"Досуг"
        },
        {
          id:9,
          name:"Медицина и фармация"
        },
        {
          id:10,
          name:"Прочее"
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

  computed:{

    add_update_text: function(){
      return this.company_edited.id === 0 ? "Добавить" : "Обновить";
    },

    add_update_color: function(){
      return this.company_edited.id === 0 ? "blue" : "amber";
    },

  },


  methods:{




    toCSV(){

      console.log('!');

      //var url_string = "https://catone.app/00.csv"; //window.location.href

      const { convertCSVToArray } = require('convert-csv-to-array');
      //const converter = require('convert-csv-to-array');

      const data = 'number;first;last;handle\n1;Mark;Otto;@mdo\n2;Jacob;Thornton;@fat\n3;Larry;the Bird;@twitter\n';



      const arrayofArrays = convertCSVToArray(data, {
        type: 'array',
        separator: ';', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
      });

      console.log(arrayofArrays);


      fetch('https://202702.selcdn.ru/zakaz/d/A1300C78A0/00.csv')
          .then((response) => {
            return response.text();
          })
          .then((data) => {
            console.log(data);

            let aaa = convertCSVToArray(data, {
              type: 'array',
              separator: ',', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
            });

            console.log(aaa);
          });


    },

    loadList(i=1){

      if (i===1){
        this.ready = false;
        this.search="";
        this.company_list = [];
      }

      let pr = this.$store.state.api.loadCompanyList(i);


      pr.then( data =>{

        console.log(data);

        //this.company_list.push(data.data);
        Array.prototype.push.apply(this.company_list, data.data);

        if (data.meta.pagination.page<data.meta.pagination.pageCount){
          this.loadList(data.meta.pagination.page+1);
        }
        else{
          this.ready = true;
        }






      })

    },

    loadItem(item){
      console.log(item);

      this.company_edited = item;

      //console.log(this.company_list[item.id]);

    },

    deleteCompany(id){

      this.$store.state.api.deleteCompany(id);

      // просто без проверок
      this.snackbar_text = "Удалили данные";
      this.snackbar = true;

    },

    addUpdateCompany(){

      let  post_data= {

        data:{
          id:           this.company_edited.id,
          name_ru:      this.company_edited.name_ru,
          name_eng:     this.company_edited.name_eng,
          brand:        this.company_edited.brand,
          description:  this.company_edited.description,
          year_in:      this.company_edited.year_in,
          year_out:     this.company_edited.year_out,
          year_return:  this.company_edited.year_return,
          status:       this.company_edited.status,
          is_leave:     this.company_edited.is_leave,
          comment:      this.company_edited.comment,
          // links: [],
          // people: [],
          segment:      this.company_edited.segment,
          rage:         this.company_edited.rage,
          country:      this.company_edited.country,
          country_root: this.company_edited.country_root,
          links_text:   this.company_edited.links_text,
          images_text:  this.company_edited.images_text,
          peoples_text: this.company_edited.peoples_text,
          inn:          this.company_edited.inn,
          FIO:          this.company_edited.FIO,
          published:    this.company_edited.published
        }
      }


      if (this.company_edited.id>0){
        this.$store.state.api.updateCompany(post_data, this.company_edited.id);
        this.snackbar_text = "Обновили данные";
      }
      else{
        this.$store.state.api.addCompany(post_data);
        // просто без проверок
        this.snackbar_text = "Добавили новую";
      }

      console.log(post_data);
      this.snackbar = true;
    },






    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },

  },
}
</script>

<style scoped>

</style>
