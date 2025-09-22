const $ = (s, c=document) => c.querySelector(s);

const form = $('#register-form');
const statusBox = $('#reg-status');

function showStatus(msg, kind='ok'){
  if(!statusBox) return;
  statusBox.textContent = msg;
  statusBox.className = 'status ' + (kind === 'error' ? 'status--error' : 'status--ok');
}

function isEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function handleSubmit(e){
  e.preventDefault();

  const nombre      = $('#nombre')?.value.trim();
  const usuario     = $('#usuario')?.value.trim();
  const email       = $('#email')?.value.trim();
  const pass        = $('#pass')?.value;
  const pass2       = $('#pass2')?.value;
  const nacimiento  = $('#nacimiento')?.value;
  const pais        = $('#pais')?.value;
  const rol         = $('#rol')?.value;          
  const tyc         = $('#tyc')?.checked;

  // Validaciones
  if(!nombre || !usuario || !email || !pass || !pass2 || !nacimiento || !pais){
    showStatus('Completa todos los campos requeridos.', 'error'); return;
  }
  if(!isEmail(email)){
    showStatus('Ingresa un correo electrónico válido.', 'error'); return;
  }
  if(pass.length < 6){
    showStatus('La contraseña debe tener al menos 6 caracteres.', 'error'); return;
  }
  if(pass !== pass2){
    showStatus('Las contraseñas no coinciden.', 'error'); return;
  }
  if(!rol){
    showStatus('Debes seleccionar un rol (Retrogamer o Administrador).', 'error'); return;
  }
  if(!tyc){
    showStatus('Debes aceptar los términos y condiciones.', 'error'); return;
  }

  // Registro correcto
  showStatus('¡Cuenta creada con éxito! Redirigiendo al inicio de sesión…', 'ok');
  setTimeout(()=>{ window.location.href = 'inicio_sesion.html'; }, 1200);
}

document.addEventListener('DOMContentLoaded', ()=>{
  form?.addEventListener('submit', handleSubmit);
});
