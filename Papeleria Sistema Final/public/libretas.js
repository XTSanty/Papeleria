// Validación en tiempo real para el nombre de la libreta
function validateLibretaName() {
    const nameInput = document.getElementById('libreta-name');
    const nameError = document.getElementById('libreta-name-error');
    const nameValue = nameInput.value.trim();

    if (nameValue === "") {
        nameError.textContent = "Este campo es obligatorio.";
        nameInput.style.borderColor = "red";
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
        nameError.textContent = "Solo se permiten letras y espacios.";
        nameInput.style.borderColor = "red";
        return false;
    } else {
        nameError.textContent = "";
        nameInput.style.borderColor = "";
        return true;
    }
}

document.getElementById('libreta-name').addEventListener('input', validateLibretaName);

// Validación en tiempo real para el precio
function validatePrice() {
    const priceInput = document.getElementById('libreta-price');
    const priceError = document.getElementById('libreta-price-error');
    const priceValue = priceInput.value.trim();

    if (/^(?!0(?:\.0{1,2})?$)\d{1,4}(\.\d{1,2})?$/.test(priceValue)) {
        priceError.textContent = "";
        priceInput.style.borderColor = "";
        return true;
    } else {
        priceError.textContent = "Ingrese un valor válido mayor a 0 (Ej: 25.99)";
        priceInput.style.borderColor = "red";
        return false;
    }
}

document.getElementById('libreta-price').addEventListener('input', validatePrice);

// Validación en tiempo real para la cantidad
function validateQuantity() {
    const quantityInput = document.getElementById('libreta-quantity');
    const quantityError = document.getElementById('libreta-quantity-error');
    const quantityValue = quantityInput.value.trim();

    const quantity = Number(quantityValue);
    if (!/^\d+$/.test(quantityValue) || quantity < 1 || quantity > 250) {
        quantityError.textContent = "Solo números enteros entre 1 y 250.";
        quantityInput.style.borderColor = "red";
        return false;
    } else {
        quantityError.textContent = "";
        quantityInput.style.borderColor = "";
        return true;
    }
}

document.getElementById('libreta-quantity').addEventListener('input', validateQuantity);

// Validación en tiempo real para el tamaño/tipo de la libreta
function validateLibretaSize() {
    const sizeInput = document.getElementById('libreta-type');
    const sizeError = document.getElementById('libreta-type-error');
    const sizeValue = sizeInput.value.trim();

    if (sizeValue === "") {
        sizeError.textContent = "Este campo es obligatorio.";
        sizeInput.style.borderColor = "red";
        return false;
    } else if (sizeValue.length > 10) {
        sizeError.textContent = "Máximo 10 caracteres.";
        sizeInput.style.borderColor = "red";
        return false;
    } else {
        sizeError.textContent = "";
        sizeInput.style.borderColor = "";
        return true;
    }
}

document.getElementById('libreta-type').addEventListener('input', validateLibretaSize);

// Función para guardar los datos en la base de datos
function saveData(event) {
    event.preventDefault();

    const isValidName = validateLibretaName();
    const isValidSize = validateLibretaSize();
    const isValidPrice = validatePrice();
    const isValidQuantity = validateQuantity();

    // Si alguna validación falla, no se envía el formulario
    if (!isValidName || !isValidSize || !isValidPrice || !isValidQuantity) {
        alert("Por favor, corrige los errores en el formulario antes de enviar.");
        return;
    }

    const newLibreta = {
        name: document.getElementById('libreta-name').value.trim(),
        size: document.getElementById('libreta-type').value.trim(),
        price: document.getElementById('libreta-price').value.trim(),
        quantity: document.getElementById('libreta-quantity').value.trim(),
    };

    console.log('Datos enviados:', newLibreta); // Verifica los datos antes de enviarlos

    fetch('http://localhost:3000/guardar-libretas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'papeleria123'
        },
        body: JSON.stringify(newLibreta),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al guardar la libreta');
        }
        return response.json();
    })
    .then(data => {
        console.log('Libreta guardada:', data);
        alert("Libreta guardada correctamente!");
        document.getElementById('libreta-form').reset(); // Limpia el formulario
    })
    .catch(error => {
        console.error('Error al guardar la libreta:', error);
        alert("Hubo un error al guardar la libreta. Por favor, inténtalo de nuevo.");
    });
}

document.getElementById('libreta-form').addEventListener('submit', saveData);