// const navbar = {
//     template:`
//     <nav class="navbar">
//         <a class="logo" href="index.html"><img class="logo-img" src="./images/huella.png" alt="">Huellitas</a>
//         <div class="navbar-mobile">
//             <button class="navbar-button-mobile"><a href="login.html">Login</a></button>
//             <i class="bi bi-list"></i>
//         </div>
//         <div class="navbar-list">
//             <a class="navbar-link" href="refugios.html">Refugios</a>
//             <a class="navbar-link" href="adopcion.html">Adopciones</a>
//             <a class="navbar-link" href="proteccionistas.html">Proteccionistas</a>
//             <a class="navbar-link" href="donaciones.html">Donaciones</a>
//             <button v-if="!isLogged" class="navbar-button"><a href="login.html">Login</a></button>
//             <button v-if="isLogged" class="navbar-button"><a href="login.html">Logout</a></button>
//         </div>
//     </nav>
//     `,
// }

const { createApp } = Vue
createApp({
    data() {
        return {
            urlAuth: 'https://pablo2311.pythonanywhere.com/login/status',
            urlLogout: 'https://pablo2311.pythonanywhere.com/logout',
            isLogged: false,
            isAdmin: false,
        }
    },
    methods: {
        fetchAuth(urlAuth) {
            fetch(urlAuth).then(
                response => response.json()
            ).then(
                Auth => {
                    this.isLogged = Auth.isLogged;
                    this.isAdmin = Auth.isAdmin;
                }
            ).catch(err => {
                console.log(err);
                this.error = true
            })
        },
        logout(urlLogout) {
            fetch(urlLogout).then(
                response => response.json(),
            ).then(
                Logout => {
                    this.isLogged = Logout.isLogged;
                    console.log(Logout.isLoggedt)
                    this.isAdmin = Logout.isAdmin;
                    console.log(Logout.isAdmin)
                    window.location.href = 'http://127.0.0.1:5500/index.html';
                },
            ).catch(err => {
                console.log(err);
                this.error = true
            })

        }
    },
    created() {
        this.fetchAuth(this.urlAuth)
    },
    // components:{
    //     'navbar':navbar,
    // }
}).mount("#header")