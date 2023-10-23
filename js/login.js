function validate() {
    let name = document.getElementById("name");
    let password = document.getElementById("password");
    let error = false;
    document.getElementById("validate_name").innerHTML = "&nbsp; ";
    document.getElementById("validate_password").innerHTML = "&nbsp; ";

    if (name.value == "") {
        document.getElementById("validate_name").innerHTML = "Debe completar el campo";
        error = true;
        name.focus();
    }
    if (password.value.lenght = 0) {
        document.getElementById("validate_password").innerHTML = "Debe completar el campo";
        error = true;
        password.focus();
    } else if (password.value.lenght < 6) {
        document.getElementById("validate_password").innerHTML = "La contraseña debe ser de al menos 6 caracteres";
        error = true;
        password.focus();
    }

    if (error == false) {
        alert("Login correcto")
        document.getElementById("name").value = "";
        document.getElementById("validate_name").innerHTML = "&nbsp; ";
        document.getElementById("password").value = "";
        document.getElementById("validate_password").innerHTML = "&nbsp; ";
    }

    return !error;
}