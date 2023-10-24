const navbar = {
    template:`
    <nav class="navbar">
        <a class="logo" href="index.html"><img class="logo-img" src="./images/huella.png" alt="">Huellitas</a>
        <div class="navbar-mobile">
            <button class="navbar-button"><a href="login.html">Login</a></button>
            <i class="bi bi-list"></i>
        </div>
        <div class="navbar-list">
            <a class="navbar-link" href="refugios.html">Refugios</a>
            <a class="navbar-link" href="adopcion.html">Adopciones</a>
            <a class="navbar-link" href="proteccionistas.html">Proteccionistas</a>
            <a class="navbar-link" href="donaciones.html">Donaciones</a>
            <button class="navbar-button"><a href="login.html">Login</a></button>
        </div>
    </nav>
    `,
}

const { createApp } = Vue
createApp({
    components:{
        'navbar':navbar,
    }
}).mount("#header")