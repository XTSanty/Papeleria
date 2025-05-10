// Validación en tiempo real para el precio
function validatePrice() {
    const priceInput = document.getElementById('product-price');
    const priceError = document.getElementById('price-error');
    const priceValue = priceInput.value.trim();

    if (/^(?!0(?:\.0{1,2})?$)\d{1,4}(\.\d{1,2})?$/.test(priceValue)) {
        priceError.textContent = "";
        priceInput.style.borderColor = "";
        return true;
    } else {
        priceError.textContent = "Ingrese un valor válido mayor a 0 (Ej: 1, 99.99, 1000)";
        priceInput.style.borderColor = "red";
        return false;
    }
}

document.getElementById('product-price').addEventListener('input', validatePrice);

// Validación en tiempo real para la cantidad
function validateQuantity() {
    const quantityInput = document.getElementById('product-quantity');
    const quantityError = document.getElementById('quantity-error');
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

document.getElementById('product-quantity').addEventListener('input', validateQuantity);

// Validación en tiempo real para el nombre del producto
function validateProductName() {
    const nameInput = document.getElementById('product-name');
    const nameError = document.getElementById('name-error');
    const nameValue = nameInput.value.trim();

    if (nameValue === "") {
        nameError.textContent = "Este campo es obligatorio.";
        nameInput.style.borderColor = "red";
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
        nameError.textContent = "Solo se permiten letras y espacios";
        nameInput.style.borderColor = "red";
        return false;
    } else {
        nameError.textContent = "";
        nameInput.style.borderColor = "";
        return true;
    }
}

document.getElementById('product-name').addEventListener('input', validateProductName);

// Función para guardar los datos en la base de datos
function saveData(event) {
    event.preventDefault();

    const isValidName = validateProductName();
    const isValidPrice = validatePrice();
    const isValidQuantity = validateQuantity();

    if (!isValidName || !isValidPrice || !isValidQuantity) {
        return;
    }

    const newProduct = {
        name: document.getElementById('product-name').value.trim(),
        price: document.getElementById('product-price').value.trim(),
        quantity: document.getElementById('product-quantity').value.trim(),
    };

    fetch('/guardar-productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'papeleria123' // 🔹 Aquí incluimos la API Key
        },
        body: JSON.stringify(newProduct),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al guardar el producto');
        }
        return response.json();
    })
    .then(data => {
        console.log('Producto guardado:', data);
        alert("Producto guardado correctamente!");
        document.getElementById('sale-form').reset();
    })
    .catch(error => {
        console.error('Error al guardar el producto:', error);
        alert("Hubo un error al guardar el producto. Por favor, inténtalo de nuevo.");
    });
}

document.getElementById('sale-form').addEventListener('submit', saveData);