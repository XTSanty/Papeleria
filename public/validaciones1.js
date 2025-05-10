document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registroFormulario");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const isValidNombre = validateNombre();
            const isValidApellidoPaterno = validateApellidoPaterno();
            const isValidApellidoMaterno = validateApellidoMaterno();
            const isValidCorreo = validateCorreo();
            const isValidContrasena = validateContrasena();
            const isValidConfirmarContrasena = validateConfirmarContrasena();

            if (isValidNombre && isValidApellidoPaterno && isValidApellidoMaterno && isValidCorreo && isValidContrasena && isValidConfirmarContrasena) {
                const usuario = {
                    nombre: document.getElementById("nombre").value.trim(),
                    apellidoPaterno: document.getElementById("apellidoPaterno").value.trim(),
                    apellidoMaterno: document.getElementById("apellidoMaterno").value.trim(),
                    correo: document.getElementById("correo").value.trim(),
                    contrasena: document.getElementById("contrasena").value.trim()
                };

                let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
                usuarios.push(usuario);
                localStorage.setItem("usuarios", JSON.stringify(usuarios));

                alert("Registro exitoso. Ahora puede iniciar sesión.");
                window.location.href = "formulario.html"; // Redirigir a la página de inicio de sesión
            } else {
                alert("Por favor, revise los datos ingresados.");
            }
        });
    }
});

// Validación en tiempo real para el nombre
function validateNombre() {
    const nombreInput = document.getElementById("nombre");
    const nombreError = document.getElementById("nombre-error");
    const nombreValue = nombreInput.value.trim();

    if (nombreValue === "") {
        nombreError.textContent = "Este campo es obligatorio.";
        nombreInput.style.borderColor = "red";
        return false;
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombreValue)) {
        nombreError.textContent = "Solo se permiten letras y espacios.";
        nombreInput.style.borderColor = "red";
        return false;
    } else {
        nombreError.textContent = "";
        nombreInput.style.borderColor = "";
        return true;
    }
}

document.getElementById("nombre").addEventListener("input", validateNombre);

// Validación en tiempo real para el apellido paterno
function validateApellidoPaterno() {
    const apellidoPaternoInput = document.getElementById("apellidoPaterno");
    const apellidoPaternoError = document.getElementById("apellidoPaterno-error");
    const apellidoPaternoValue = apellidoPaternoInput.value.trim();

    if (apellidoPaternoValue === "") {
        apellidoPaternoError.textContent = "Este campo es obligatorio.";
        apellidoPaternoInput.style.borderColor = "red";
        return false;
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(apellidoPaternoValue)) {
        apellidoPaternoError.textContent = "Solo se permiten letras y espacios.";
        apellidoPaternoInput.style.borderColor = "red";
        return false;
    } else {
        apellidoPaternoError.textContent = "";
        apellidoPaternoInput.style.borderColor = "";
        return true;
    }
}

document.getElementById("apellidoPaterno").addEventListener("input", validateApellidoPaterno);

// Validación en tiempo real para el apellido materno
function validateApellidoMaterno() {
    const apellidoMaternoInput = document.getElementById("apellidoMaterno");
    const apellidoMaternoError = document.getElementById("apellidoMaterno-error");
    const apellidoMaternoValue = apellidoMaternoInput.value.trim();

    if (apellidoMaternoValue === "") {
        apellidoMaternoError.textContent = "Este campo es obligatorio.";
        apellidoMaternoInput.style.borderColor = "red";
        return false;
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(apellidoMaternoValue)) {
        apellidoMaternoError.textContent = "Solo se permiten letras y espacios.";
        apellidoMaternoInput.style.borderColor = "red";
        return false;
    } else {
        apellidoMaternoError.textContent = "";
        apellidoMaternoInput.style.borderColor = "";
        return true;
    }
}

document.getElementById("apellidoMaterno").addEventListener("input", validateApellidoMaterno);

// Validación en tiempo real para el correo electrónico
function validateCorreo() {
    const correoInput = document.getElementById("correo");
    const correoError = document.getElementById("correo-error");
    const correoValue = correoInput.value.trim();

    if (correoValue === "") {
        correoError.textContent = "Este campo es obligatorio.";
        correoInput.style.borderColor = "red";
        return false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correoValue)) {
        correoError.textContent = "Ingrese un correo electrónico válido.";
        correoInput.style.borderColor = "red";
        return false;
    } else if (/\d+\.\d+/.test(correoValue)) {
        correoError.textContent = "No se permiten decimales en el correo.";
        correoInput.style.borderColor = "red";
        return false;
    } else {
        correoError.textContent = "";
        correoInput.style.borderColor = "";
        return true;
    }
}

document.getElementById("correo").addEventListener("input", validateCorreo);

// Validación en tiempo real para la contraseña
function validateContrasena() {
    const contrasenaInput = document.getElementById("contrasena");
    const contrasenaError = document.getElementById("contrasena-error");
    const contrasenaValue = contrasenaInput.value.trim();

    if (contrasenaValue === "") {
        contrasenaError.textContent = "Este campo es obligatorio.";
        contrasenaInput.style.borderColor = "red";
        return false;
    } else if (!/^[!@#$%^&*A-Za-z0-9]{1,10}$/.test(contrasenaValue)) {
        contrasenaError.textContent = "La contraseña debe tener máximo 10 caracteres y solo puede contener letras, números y los caracteres especiales !@#$%^&*.";
        contrasenaInput.style.borderColor = "red";
        return false;
    } else {
        contrasenaError.textContent = "";
        contrasenaInput.style.borderColor = "";
        return true;
    }
}

document.getElementById("contrasena").addEventListener("input", validateContrasena);

// Validación en tiempo real para confirmar la contraseña
function validateConfirmarContrasena() {
    const confirmarContrasenaInput = document.getElementById("confirmarContrasena");
    const confirmarContrasenaError = document.getElementById("confirmarContrasena-error");
    const confirmarContrasenaValue = confirmarContrasenaInput.value.trim();
    const contrasenaValue = document.getElementById("contrasena").value.trim();

    if (confirmarContrasenaValue === "") {
        confirmarContrasenaError.textContent = "Este campo es obligatorio.";
        confirmarContrasenaInput.style.borderColor = "red";
        return false;
    } else if (confirmarContrasenaValue !== contrasenaValue) {
        confirmarContrasenaError.textContent = "Las contraseñas no coinciden.";
        confirmarContrasenaInput.style.borderColor = "red";
        return false;
    } else {
        confirmarContrasenaError.textContent = "";
        confirmarContrasenaInput.style.borderColor = "";
        return true;
    }
}

document.getElementById("confirmarContrasena").addEventListener("input", validateConfirmarContrasena);