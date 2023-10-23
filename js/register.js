function validate() {
    let name = document.getElementById("nombre");
    let surname = document.getElementById("apellido");
    let email = document.getElementById("email");
    let password = document.getElementById("contraseña");
    let error = false;
    document.getElementById("validate_name").innerHTML = "&nbsp; ";
    document.getElementById("validate_surname").innerHTML = "&nbsp; ";
    document.getElementById("validate_email").innerHTML = "&nbsp; ";
    document.getElementById("validate_password").innerHTML = "&nbsp; ";

    if (name.value == "") {
        document.getElementById("validate_name").innerHTML = "Debe completar el campo";
        error = true;
        name.focus();
    }
    if (surname.value == "") {
        document.getElementById("validate_surname").innerHTML = "Debe completar este campo";
        error = true;
        name.focus();
    }
    if (email.value == "") {
        document.getElementById("validate_email").innerHTML = "Debe completar este campo";
        error = true;
        name.focus();
    }
    if (password.value == "") {
        document.getElementById("validate_password").innerHTML = "Debe completar este campo"
        error = true;
        password.focus();
    } else {
        if (password.value.lenght < 6) {
            document.getElementById("validate_password").innerHTML = "La contraseña debe ser de al menos 6 caracteres";
            error = true;
            password.focus();
        }
    } 
    

    if (error == false) {
        alert("Registro correcto")
        document.getElementById("nombre").value = "";
        document.getElementById("validate_name").innerHTML = "&nbsp; ";
        document.getElementById("apellido").value = "";
        document.getElementById("validate_surname").innerHTML = "&nbsp; ";
        document.getElementById("email").value = "";
        document.getElementById("validate_email").innerHTML = "&nbsp; ";
        document.getElementById("contraseña").value = "";
        document.getElementById("validate_password").innerHTML = "&nbsp; ";
    }

    return !error;
}