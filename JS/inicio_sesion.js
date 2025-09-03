/* ===========================
   Validación Login – Retrojuegos
   =========================== */

const $ = (s, c=document) => c.querySelector(s);

const form    = $('#login-form') || $('form');     // hace fallback si no pusiste id
const usuario = $('#usuario');
const clave   = $('#clave');
const statusB = $('#form-status');
const toggle  = $('#toggle-pass');
const remember= $('#remember');

// Usuarios demo (mientras no tengas backend)
const DEMO_USERS = [
  { user: 'admin',  email: 'admin@retrojuegos.cl',  pass: 'retro123' },
  { user: 'mario',  email: 'mario@nintendo.com',    pass: 'mushroom1' },
  { user: 'zelda',  email: 'zelda@hyrule.com',      pass: 'triforce1' },
];

const USER_KEY = 'retrojuegos_user';  // para guardar sesión

function showStatus(msg, kind='ok'){
  if(!statusB) return;
  statusB.textContent = msg;
  statusB.className = 'status ' + (kind === 'error' ? 'status--error' : 'status--ok');
}

function isEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function validateInputs(){
  const u = (usuario?.value || '').trim();
  const p = (clave?.value || '').trim();

  if(!u){
    showStatus('Ingresa tu usuario o correo.', 'error');
    usuario?.focus();
    return false;
  }
  if(!p){
    showStatus('Ingresa tu contraseña.', 'error');
    clave?.focus();
    return false;
  }
  if(p.length < 6){
    showStatus('La contraseña debe tener al menos 6 caracteres.', 'error');
    clave?.focus();
    return false;
  }
  return { u, p };
}

function findUser(ident){
  // permite iniciar con usuario o email
  const low = ident.toLowerCase();
  return DEMO_USERS.find(x => x.user.toLowerCase() === low || x.email.toLowerCase() === low);
}

function saveSession(profile, persist){
  const payload = JSON.stringify({
    user: profile.user,
    email: profile.email,
    ts: Date.now()
  });
  // Si “Recordarme” está marcado → localStorage; si no → sessionStorage
  if(persist) localStorage.setItem(USER_KEY, payload);
  else sessionStorage.setItem(USER_KEY, payload);
}

function handleSubmit(e){
  e?.preventDefault?.();

  const valid = validateInputs();
  if(!valid) return;
  const { u, p } = valid;

  const found = findUser(u);
  if(!found || found.pass !== p){
    showStatus('Usuario/correo o contraseña incorrectos.', 'error');
    return;
  }

  // Éxito
  saveSession(found, !!(remember && remember.checked));
  showStatus(`¡Bienvenido, ${found.user}! Redirigiendo…`, 'ok');

  // Simular “cargando” y redirigir al home
  setTimeout(() => { window.location.href = 'index.html'; }, 900);
}

function togglePassword(){
  if(!clave) return;
  const isText = clave.type === 'text';
  clave.type = isText ? 'password' : 'text';
  if(toggle) toggle.textContent = isText ? 'Ver' : 'Ocultar';
}

// Prefill si ya hay sesión guardada (ux)
function hydrateIfRemembered(){
  const saved = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  if(!saved) return;
  try{
    const data = JSON.parse(saved);
    if(usuario && data?.email) usuario.value = data.email;
  }catch{}
}

document.addEventListener('DOMContentLoaded', ()=>{
  hydrateIfRemembered();
  form?.addEventListener('submit', handleSubmit);
});
