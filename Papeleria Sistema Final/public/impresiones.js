// Validación en tiempo real para el nombre de la impresión
function validateImpresionName() {
    const nameInput = document.getElementById('impresion-name');
    const nameError = document.getElementById('impresion-name-error');
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

document.getElementById('impresion-name').addEventListener('input', validateImpresionName);

// Validación en tiempo real para el precio
function validatePrice() {
    const priceInput = document.getElementById('impresion-price');
    const priceError = document.getElementById('impresion-price-error');
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

document.getElementById('impresion-price').addEventListener('input', validatePrice);

// Validación en tiempo real para la cantidad
function validateQuantity() {
    const quantityInput = document.getElementById('impresion-quantity');
    const quantityError = document.getElementById('impresion-quantity-error');
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

document.getElementById('impresion-quantity').addEventListener('input', validateQuantity);

// Validación en tiempo real para el tamaño de la impresión
function validateImpresionSize() {
    const sizeInput = document.getElementById('impresion-size');
    const sizeError = document.getElementById('impresion-size-error');
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

document.getElementById('impresion-size').addEventListener('input', validateImpresionSize);

// Función para guardar los datos en la base de datos
function saveData(event) {
    event.preventDefault();

    const isValidName = validateImpresionName();
    const isValidSize = validateImpresionSize();
    const isValidPrice = validatePrice();
    const isValidQuantity = validateQuantity();

    // Si alguna validación falla, no se envía el formulario
    if (!isValidName || !isValidSize || !isValidPrice || !isValidQuantity) {
        alert("Por favor, corrige los errores en el formulario antes de enviar.");
        return;
    }

    const newImpresion = {
        name: document.getElementById('impresion-name').value.trim(),
        size: document.getElementById('impresion-size').value.trim(),
        price: document.getElementById('impresion-price').value.trim(),
        quantity: document.getElementById('impresion-quantity').value.trim(),
    };

    console.log('Datos enviados:', newImpresion); // Verifica los datos antes de enviarlos

    fetch('http://localhost:3000/guardar-impresiones', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'papeleria123'
        },
        body: JSON.stringify(newImpresion),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al guardar la impresión');
        }
        return response.json();
    })
    .then(data => {
        console.log('Impresión guardada:', data);
        alert("Impresión guardada correctamente!");
        document.getElementById('impresion-form').reset(); // Limpia el formulario
    })
    .catch(error => {
        console.error('Error al guardar la impresión:', error);
        alert("Hubo un error al guardar la impresión. Por favor, inténtalo de nuevo.");
    });
}

document.getElementById('impresion-form').addEventListener('submit', saveData);