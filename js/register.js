function submitForm() {
    let name = document.getElementById("nombre").value;
    let surname = document.getElementById("apellido").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!validate(name, surname, email, password)) {
        return false; // Prevent form submission if validation fails
    }

    let data = {
        nombre: name,
        apellido: surname,
        email: email,
        password: password,
    };  

    console.log('Form data:', data);

    fetch('https://pablo2311.pythonanywhere.com/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the entire data object as JSON
    })
    .then(response => {
        console.log('Server response:', response);  // Log the response object
        if (response.ok == true) {
            try {
                console.log("Redirecting to index.html");
                // window.location.href = 'http://127.0.0.1:5500/index.html';
                window.location.href = 'https://huellitas-tpo.netlify.app/index.html';
            } catch (error) {
                console.error('Error during redirect:', error);
            }
        }
        return response.json();
    })
    .then(responseData => {
        console.log('Response data:', responseData);
        
    })
    .catch(error => {
        console.error('Error during fetch:', error);
    });

    return false;  // Prevent the form from traditional submission
}

function validate(name, surname, email, password) {
    
    let error = false;
    document.getElementById("validate_name").innerHTML = "&nbsp; ";
    document.getElementById("validate_surname").innerHTML = "&nbsp; ";
    document.getElementById("validate_email").innerHTML = "&nbsp; ";
    document.getElementById("validate_password").innerHTML = "&nbsp; ";

    if (name === "") {
        document.getElementById("validate_name").innerHTML = "Debe completar el campo";
        error = true;
    }
    if (surname === "") {
        document.getElementById("validate_surname").innerHTML = "Debe completar este campo";
        error = true;
    }
    if (email === "") {
        document.getElementById("validate_email").innerHTML = "Debe completar este campo";
        error = true;   
    }
    if (password === "") {
        document.getElementById("validate_password").innerHTML = "Debe completar este campo";
        error = true;
    } else if (password.length > 0 && password.length < 6) {
        document.getElementById("validate_password").innerHTML = "La contraseña debe ser de al menos 6 caracteres";
        error = true;
    }

    return !error; // Return true if validation passed, false if there are errors
}