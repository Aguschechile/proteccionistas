const { createApi } = Vue 

  createApp({
    data() {
      return {
        error: false,
        url:"https://randomuser.me/api?results=5",
        datos:{}
      }
    },
    methods:{
      fetchData(url) {
        fetch(url)
          .then(resp => resp.json())
          .then(data => {
            console.log(data)
            this.datos=data.results
          })
      }
    },
    created() { // funcion onInit
      this.fetchData(this.url)
    }
}).mount('#api')