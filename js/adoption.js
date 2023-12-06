const { createAdoption } = Vue

createApp({
    data() {
        return {
            animales: [],
            // url:'http://localhost:5000/adopciones',
            url: 'https://pablo2311.pythonanywhere.com/adopciones',
            urlAuth: 'https://pablo2311.pythonanywhere.com/login/status',
            error: false,
            cargando: true,
            isLogged: false,
            isAdmin: false,
            /*atributos para guardar valores del form*/
            id: 0,
            nombre: "",
            raza: "",
            sexo: "",
            edad: "",
            refugio: "",
            contacto: "",
            imagen: ""
        }
    },
    methods: {
        fetchAuth(urlAuth) {
            fetch(urlAuth).then(
                response => response.json()
            ).then(
                Auth => {
                    this.isLogged = Auth.isLogged;
                    this.isAdmin = Auth.isAdmin
                }
            ).catch(err => {
                console.log(err);
                this.error = true
            })
        },
        fetchData(url) {
            fetch(url).then(
                response => response.json()
            ).then(
                data => {
                    this.animales = data;
                    this.cargando = false
                }
            ).catch(err => {
                console.log(err);
                this.error = true
            })
        },
        eliminar(id) {
            const url = this.url + '/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        grabar() {
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
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./adopcion.html";  // recarga adopcion.html
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })
        }
    },
    created() {
        this.fetchData(this.url)
        this.fetchAuth(this.urlAuth)
    },

}).mount('#adoptions')