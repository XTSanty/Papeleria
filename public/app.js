function updateFormFields() {
            const productType = document.getElementById('product-type').value;
            document.getElementById('size-field').style.display = productType === 'libreta' ? 'block' : 'none';
            document.getElementById('paper-size-field').style.display = productType === 'impresion' ? 'block' : 'none';
        }

        function validatePrice() {
        const priceInput = document.getElementById('product-price');
        const priceError = document.getElementById('price-error');
        const priceValue = priceInput.value.trim();

        // Expresión regular para validar: hasta 4 enteros y opcionalmente dos decimales, sin permitir 0 ni 0.0
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

    // Ejecutar la validación en tiempo real
    document.getElementById('product-price').addEventListener('input', validatePrice);


function validateQuantity() {
    const quantityInput = document.getElementById('product-quantity');
    const quantityError = document.getElementById('quantity-error');
    const quantityValue = quantityInput.value.trim();

    // Convertimos a número entero
    const quantity = Number(quantityValue);

    // Verificar si es un número entero dentro del rango permitido
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

// Validación en tiempo real
document.getElementById('product-quantity').addEventListener('input', validateQuantity);


        function validateProductName() {
    const nameInput = document.getElementById('product-name');
    const nameError = document.getElementById('name-error');
    const nameValue = nameInput.value.trim();

    if (nameValue === "") {
        nameError.textContent = "";
        nameInput.style.borderColor = "";
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
        nameError.textContent = "Solo se permiten letras y espacios";
        nameInput.style.borderColor = "red";
    } else {
        nameError.textContent = "";
        nameInput.style.borderColor = "";
    }
}

// Validación en tiempo real
document.getElementById('product-name').addEventListener('input', validateProductName);

        function saveData(event) {
            event.preventDefault();
            if (!validatePrice() || !validateQuantity()) return;

            const newProduct = {
                name: document.getElementById('product-name').value.trim(),
                price: document.getElementById('product-price').value.trim(),
                quantity: document.getElementById('product-quantity').value.trim(),
                type: document.getElementById('product-type').value,
                size: document.getElementById('product-type').value === 'libreta' ? document.getElementById('product-size').value : '',
                paperSize: document.getElementById('product-type').value === 'impresion' ? document.getElementById('paper-size').value : ''
            };

            let products = JSON.parse(localStorage.getItem('products')) || [];
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));

            renderProducts();
            document.getElementById('sale-form').reset();
            updateFormFields();
        }

        function renderProducts() {
            const productsList = document.getElementById('products-list');
            productsList.innerHTML = '';
            let products = JSON.parse(localStorage.getItem('products')) || [];

            products.forEach((product, index) => {
                const productContainer = document.createElement('div');
                productContainer.classList.add('product-container');

                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Eliminar';
                deleteButton.onclick = () => deleteProduct(index);

                productContainer.innerHTML = `
                    <p><strong>Nombre:</strong> ${product.name}</p>
                    <p><strong>Precio:</strong> $${product.price}</p>
                    <p><strong>Cantidad:</strong> ${product.quantity}</p>
                `;
                productContainer.appendChild(deleteButton);
                productsList.appendChild(productContainer);
            });
        }

        function deleteProduct(index) {
            let products = JSON.parse(localStorage.getItem('products')) || [];
            products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(products));
            renderProducts();
        }

        window.onload = () => {
            updateFormFields();
            renderProducts();
        };
