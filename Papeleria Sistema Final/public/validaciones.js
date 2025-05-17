document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("miFormulario");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const correo = document.getElementById("correo");
            const contrasena = document.getElementById("contrasena");

            if (validarCorreo(correo) && validarContrasena(contrasena)) {
                const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
                const usuarioEncontrado = usuarios.find(
                    (user) => user.correo === correo.value && user.contrasena === contrasena.value
                );

                if (usuarioEncontrado) {
                    alert("Inicio de sesión exitoso.");
                    window.location.href = "index.html"; // Redirigir a index.html
                } else {
                    alert("Correo o contraseña incorrectos.");
                }
            } else {
                alert("Por favor, revise los datos ingresados.");
            }
        });
    }
});

// Validación en tiempo real para el correo electrónico
function validarCorreo(input) {
    const correoValue = input.value.trim();
    const correoError = document.getElementById("correo-error");

    if (correoValue === "") {
        correoError.textContent = "Este campo es obligatorio.";
        input.style.borderColor = "red";
        return false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correoValue)) {
        correoError.textContent = "Ingrese un correo electrónico válido.";
        input.style.borderColor = "red";
        return false;
    } else {
        correoError.textContent = "";
        input.style.borderColor = "";
        return true;
    }
}

document.getElementById("correo").addEventListener("input", function () {
    validarCorreo(document.getElementById("correo"));
});

// Validación en tiempo real para la contraseña
function validarContrasena(input) {
    const contrasenaValue = input.value.trim();
    const contrasenaError = document.getElementById("contrasena-error");

    if (contrasenaValue === "") {
        contrasenaError.textContent = "Este campo es obligatorio.";
        input.style.borderColor = "red";
        return false;
    } else if (!/^[!@#$%^&*A-Za-z0-9]{1,10}$/.test(contrasenaValue)) {
        contrasenaError.textContent = "La contraseña debe tener máximo 10 caracteres y solo puede contener letras, números y los caracteres especiales !@#$%^&*.";
        input.style.borderColor = "red";
        return false;
    } else {
        contrasenaError.textContent = "";
        input.style.borderColor = "";
        return true;
    }
}

document.getElementById("contrasena").addEventListener("input", function () {
    validarContrasena(document.getElementById("contrasena"));
});