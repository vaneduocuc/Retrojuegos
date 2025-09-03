// Seleccionar todos los botones "Agregar al carrito"
const botonesCarrito = document.querySelectorAll('.add-to-cart');

// Función para agregar producto al carrito y redirigir
function agregarAlCarrito(event) {
  const card = event.target.closest('.card');
  const producto = {
    id: card.dataset.id,
    titulo: card.querySelector('h3').textContent,
    precio: card.querySelector('.price').textContent,
    imagen: card.querySelector('img').src
  };

  // Obtener carrito actual o crear uno vacío
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push(producto);

  // Guardar en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // Redirigir al carrito
  window.location.href = 'carrito.html';
}

// Asignar evento a cada botón
botonesCarrito.forEach(boton => {
  boton.addEventListener('click', agregarAlCarrito);
});
