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
                    // window.location.href = 'http://127.0.0.1:5500/index.html';
                    window.location.href = 'https://huellitastpo.netlify.app/index.html';
                    
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
}).mount("#header")