const foot = {
    template:`
    <div class="footer-nav">
        <nav>
        <a href="quienessomos.html"><p>Quienes Somos</p></a>
        <a href="preguntasfrecuentes.html"><p>Preguntas Frecuentes</p></a>
        <br><br><br>
        <a href="http://facebook.com"><img src="./images/logo-face.png" alt="facebook"></a>
        <a href="http://instagram.com"><img src="./images/logo-inst.png" alt="instagram"></a>
        <a href="http://twitter.com"><img src="./images/logo-tw.png" alt="twitter"></a>
        <a href="http://linkedin.com"><img src="./images/logo-linked.png" alt="linkedin"></a>
      </nav>
    </div>
    <p class="footer-rights">Sitio desarrollado por el grupo</p>
    `,
}

const { createFooter } = Vue
createApp({
    components:{
        'foot':foot,
    }
}).mount("#footer")