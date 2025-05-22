document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const carritoIcono = document.querySelector('.carrito');
    const carritoOverlay = document.getElementById('carrito-overlay');
    const carritoPanel = document.getElementById('carrito-panel');
    const cerrarCarrito = document.getElementById('cerrar-carrito');
    const carritoItems = document.getElementById('carrito-items');
    const contadorProductos = document.getElementById('contador-productos');
    const totalHeader = document.getElementById('total');
    const carritoSubtotal = document.getElementById('carrito-subtotal');
    const carritoTotal = document.getElementById('carrito-total');
    const aplicarCuponBtn = document.getElementById('aplicar-cupon');
    const cuponInput = document.getElementById('cupon-input');
    const descuentoAplicado = document.getElementById('descuento-aplicado');
    const descuentoMonto = document.getElementById('descuento-monto');
    const montoPagado = document.getElementById('monto-pagado');
    const calcularCambioBtn = document.getElementById('calcular-cambio');
    const cambioInfo = document.getElementById('cambio-info');
    const montoCambio = document.getElementById('monto-cambio');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const pagarCarritoBtn = document.getElementById('pagar-carrito');
    const currentYear = document.getElementById('current-year');

    // Base de datos de cupones
    const cupones = {
        "INTER10": 10,  // 10% de descuento
        "JSNA25": 25,   // 25% de descuento
        "PAPEL20": 20   // 20% de descuento
    };

    // Estado del carrito
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let descuento = 0;
    let cuponAplicado = '';

    // Inicialización
    actualizarCarrito();
    currentYear.textContent = new Date().getFullYear();

    // Event listeners
    carritoIcono.addEventListener('click', toggleCarrito);
    carritoOverlay.addEventListener('click', toggleCarrito);
    cerrarCarrito.addEventListener('click', toggleCarrito);
    aplicarCuponBtn.addEventListener('click', aplicarCupon);
    calcularCambioBtn.addEventListener('click', calcularCambio);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    pagarCarritoBtn.addEventListener('click', procesarPago);

    // Delegación de eventos para añadir productos
    document.querySelector('.grid').addEventListener('click', function(e) {
        if (e.target.classList.contains('producto__boton')) {
            const boton = e.target;
            const nombre = boton.dataset.nombre;
            const precio = parseFloat(boton.dataset.precio);
            
            agregarProducto(nombre, precio);
        }
    });

    // Funciones
    function toggleCarrito() {
        carritoOverlay.classList.toggle('activo');
        carritoPanel.classList.toggle('activo');
        document.body.style.overflow = carritoPanel.classList.contains('activo') ? 'hidden' : 'auto';
    }

    function agregarProducto(nombre, precio) {
        const productoExistente = carrito.find(item => item.nombre === nombre);
        
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({
                nombre,
                precio,
                cantidad: 1
            });
        }
        
        actualizarCarrito();
        mostrarNotificacion(`${nombre} añadido al carrito`);
    }

    function actualizarCarrito() {
        // Guardar en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        // Actualizar contador y total en header
        const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
        contadorProductos.textContent = totalProductos;
        
        // Calcular subtotal
        const subtotal = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        totalHeader.textContent = `$${subtotal.toFixed(2)}`;
        
        // Renderizar items del carrito
        if (carrito.length === 0) {
            carritoItems.innerHTML = '<div class="carrito-vacio">Tu carrito está vacío</div>';
            carritoSubtotal.textContent = '$0.00';
            carritoTotal.textContent = '$0.00';
            descuentoAplicado.style.display = 'none';
            cambioInfo.style.display = 'none';
            return;
        }
        
        carritoItems.innerHTML = carrito.map((item, index) => `
            <div class="carrito-item">
                <div class="carrito-item-info">
                    <div class="carrito-item-nombre">${item.nombre}</div>
                    <div class="carrito-item-precio">$${item.precio.toFixed(2)} c/u</div>
                    <div class="carrito-item-cantidad">
                        <button class="disminuir" data-index="${index}">-</button>
                        <span>${item.cantidad}</span>
                        <button class="aumentar" data-index="${index}">+</button>
                    </div>
                </div>
                <div class="carrito-item-total">$${(item.precio * item.cantidad).toFixed(2)}</div>
                <button class="carrito-item-eliminar" data-index="${index}">Eliminar</button>
            </div>
        `).join('');
        
        // Actualizar subtotal y total
        carritoSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        
        // Aplicar descuento si existe
        const totalConDescuento = subtotal - (subtotal * (descuento / 100));
        carritoTotal.textContent = `$${totalConDescuento.toFixed(2)}`;
        
        // Agregar eventos a los botones de cantidad
        document.querySelectorAll('.disminuir').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                if (carrito[index].cantidad > 1) {
                    carrito[index].cantidad--;
                } else {
                    carrito.splice(index, 1);
                }
                actualizarCarrito();
            });
        });
        
        document.querySelectorAll('.aumentar').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                carrito[index].cantidad++;
                actualizarCarrito();
            });
        });
        
        document.querySelectorAll('.carrito-item-eliminar').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                carrito.splice(index, 1);
                actualizarCarrito();
            });
        });
    }

    function aplicarCupon() {
        const codigo = cuponInput.value.trim();
        
        if (cupones[codigo]) {
            descuento = cupones[codigo];
            cuponAplicado = codigo;
            descuentoMonto.textContent = `-$${(carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0) * (descuento / 100)).toFixed(2)} (${descuento}%)`;
            descuentoAplicado.style.display = 'flex';
            actualizarCarrito();
            mostrarNotificacion(`Cupón "${codigo}" aplicado: ${descuento}% de descuento`);
        } else {
            descuento = 0;
            cuponAplicado = '';
            descuentoAplicado.style.display = 'none';
            mostrarNotificacion('Cupón no válido', 'error');
        }
        
        cuponInput.value = '';
    }

    function calcularCambio() {
        const monto = parseFloat(montoPagado.value);
        const subtotal = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        const total = subtotal - (subtotal * (descuento / 100));
        
        if (isNaN(monto) || monto <= 0) {
            mostrarNotificacion('Ingrese un monto válido', 'error');
            return;
        }
        
        if (monto < total) {
            mostrarNotificacion('Monto insuficiente', 'error');
            return;
        }
        
        const cambio = monto - total;
        montoCambio.textContent = `$${cambio.toFixed(2)}`;
        cambioInfo.style.display = 'flex';
    }

    function vaciarCarrito() {
        if (carrito.length === 0) {
            mostrarNotificacion('El carrito ya está vacío', 'info');
            return;
        }
        
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            carrito = [];
            descuento = 0;
            cuponAplicado = '';
            montoPagado.value = '';
            cambioInfo.style.display = 'none';
            descuentoAplicado.style.display = 'none';
            actualizarCarrito();
            mostrarNotificacion('Carrito vaciado');
        }
    }

    function procesarPago() {
        if (carrito.length === 0) {
            mostrarNotificacion('El carrito está vacío', 'error');
            return;
        }
        
        const subtotal = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        const total = subtotal - (subtotal * (descuento / 100));
        
        if (montoPagado.value && parseFloat(montoPagado.value) >= total) {
            // Simular pago exitoso
            mostrarNotificacion('Pago procesado con éxito', 'success');
            
            // Crear ticket (podrías implementar esto)
            const ticket = {
                fecha: new Date(),
                items: [...carrito],
                subtotal: subtotal,
                descuento: descuento,
                total: total,
                pago: parseFloat(montoPagado.value),
                cambio: parseFloat(montoPagado.value) - total
            };
            
            console.log('Ticket generado:', ticket);
            
            // Vaciar carrito después del pago
            carrito = [];
            descuento = 0;
            cuponAplicado = '';
            montoPagado.value = '';
            cambioInfo.style.display = 'none';
            descuentoAplicado.style.display = 'none';
            actualizarCarrito();
            toggleCarrito();
        } else {
            mostrarNotificacion('Complete el monto pagado', 'error');
        }
    }

    function mostrarNotificacion(mensaje, tipo = 'success') {
        // Podrías implementar un sistema de notificaciones más elaborado
        alert(mensaje);
    }
    // funcion de filtrar por categorias
    const checkboxes = document.querySelectorAll('.checkbox-filtro');
const productos = document.querySelectorAll('.producto');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const categoriasSeleccionadas = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    productos.forEach(producto => {
      const categoria = producto.getAttribute('data-categoria');
      const mostrar = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(categoria);
      producto.style.display = mostrar ? 'block' : 'none';
    });
  });
});
});