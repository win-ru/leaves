<template src="./Company.html"></template>

<script>

export default {
  name: "CompanyList",


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
        year_in:      "",
        year_out:     "",
        year_return:  "",
        status:       5,
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
        status:       5,
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
        peoples_text: ""
      },

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
        { text: 'Плохость', value: 'rage' },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      satisfactionEmojis: ['😍', '😄', '😁', '😊', '🙂', '😐', '🙁', '☹️', '😢', '😭'],

      status:[
        {
          id:1,
          name:"Зеленый"
        },
        {
          id:2,
          name:"Желтый"
        },
        {
          id:3,
          name:"Красный"
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
    this.loadList();
  },

  mounted() {
    console.log('company mounted');
  },


  methods:{

    loadList(){

      let pr = this.$store.state.api.loadCompanyList();


      pr.then( data =>{

        console.log(data);
        this.company_list = data;
        this.ready = true;

      })

    },

    loadItem(item){
      console.log(item);

      this.company_edited = item;

      //console.log(this.company_list[item.id]);

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
        }
      }


      if (this.company_edited.id>0){
        this.$store.state.api.updateCompany(post_data, this.company_edited.id);
      }
      else{
        this.$store.state.api.addCompany(post_data);
      }

      console.log(post_data);



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
