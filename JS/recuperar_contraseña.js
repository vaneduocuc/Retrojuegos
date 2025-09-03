/* ==================================
   Recuperar contraseña – Lado cliente
   ================================== */

const $ = (s, c=document) => c.querySelector(s);

const form   = $('#recover-form');
const emailI = $('#correo');
const status = $('#rec-status');

function isEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function showStatus(message, kind='ok'){
  if(!status) return;
  status.textContent = message;
  status.className = 'status ' + (kind === 'error' ? 'status--error' : 'status--ok');
}

function handleSubmit(e){
  e.preventDefault();

  const mail = (emailI?.value || '').trim();

  if(!mail){
    showStatus('Por favor, ingresa tu correo electrónico.', 'error');
    emailI?.focus();
    return;
  }
  if(!isEmail(mail)){
    showStatus('El correo no tiene un formato válido.', 'error');
    emailI?.focus();
    return;
  }

  // Simulación de envío correcto
  showStatus('¡Listo! Te enviaremos un enlace a tu correo con las instrucciones para recuperar tu contraseña.', 'ok');

}

document.addEventListener('DOMContentLoaded', () => {
  form?.addEventListener('submit', handleSubmit);
});
