// botones Agregar al carrito"
const botonesCarrito = document.querySelectorAll('.add-to-cart');

// agregar producto al carrito 
function agregarAlCarrito(event) {
  const card = event.target.closest('.card');
  const producto = {
    id: card.dataset.id,
    titulo: card.querySelector('h3').textContent,
    precio: card.querySelector('.price').textContent,
    imagen: card.querySelector('img').src
  };

 
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push(producto);

 
  localStorage.setItem('carrito', JSON.stringify(carrito));


  window.location.href = 'carrito.html';
}


botonesCarrito.forEach(boton => {
  boton.addEventListener('click', agregarAlCarrito);
});
