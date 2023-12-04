console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // producto_update.html?id=1
console.log(id)
const { createEditAdoption } = Vue
  createApp({
    data() {
      return {
        id: 0,
        nombre: "",
        raza: "",
        sexo: "",
        edad: "",
        refugio: "",
        contacto: "",
        imagen: "",
        url:'https://pablo2311.pythonanywhere.com/adopciones/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id = data.id
                    this.nombre = data.nombre;
                    this.raza = data.raza;
                    this.sexo = data.sexo;
                    this.edad = data.edad;
                    this.refugio = data.refugio;
                    this.contacto = data.contacto;
                    this.imagen = data.imagen;
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let animal = {
                nombre: this.nombre,
                raza: this.raza,
                sexo: this.sexo,
                edad: this.edad,
                refugio: this.refugio,
                contacto: this.contacto,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(animal),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "adopcion.html"; // navega a adopciones.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#edit-adoption')