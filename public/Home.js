// carrito.js
document.addEventListener('DOMContentLoaded', function () {
    const carrito = [];
    const totalElement = document.getElementById('total');
    const carritoLista = document.getElementById('carrito-lista');
    const toggleCarrito = document.getElementById('toggle-carrito');
    const botones = document.querySelectorAll('.producto__boton');

    // Función para actualizar el carrito
    function actualizarCarrito() {
        // Calcular el total
        const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
        totalElement.textContent = `$${total.toFixed(2)}`;

        // Actualizar la lista de productos
        carritoLista.innerHTML = '';
        carrito.forEach((producto, index) => {
            const item = document.createElement('div');
            item.classList.add('carrito-item');
            item.innerHTML = `
                <span>${producto.nombre} - $${producto.precio.toFixed(2)}</span>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            `;
            carritoLista.appendChild(item);
        });
    }

    // Función para añadir productos al carrito
    botones.forEach(boton => {
        boton.addEventListener('click', function () {
            const precio = parseFloat(this.getAttribute('data-precio'));
            const nombre = this.getAttribute('data-nombre');
            carrito.push({ nombre, precio });
            actualizarCarrito();
        });
    });

    // Función para eliminar productos del carrito
    window.eliminarDelCarrito = function (index) {
        carrito.splice(index, 1);
        actualizarCarrito();
    };

    // Mostrar/ocultar el carrito
    toggleCarrito.addEventListener('click', function () {
        carritoLista.classList.toggle('visible');
    });
});

