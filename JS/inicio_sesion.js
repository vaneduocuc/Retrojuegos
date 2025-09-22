const $ = (s, c=document) => c.querySelector(s);

const form     = $('#login-form') || $('form');
const usuario  = $('#usuario');
const clave    = $('#clave');
const rolSel   = $('#rol');                 
const statusB  = $('#form-status');
const toggle   = $('#toggle-pass');
const remember = $('#remember');

// Usuarios ejemplo
const DEMO_USERS = [
  { user: 'admin',  email: 'admin@retrojuegos.cl',  pass: 'retro123',   roles: ['admin'] },
  { user: 'mario',  email: 'mario@nintendo.com',    pass: 'mario123',   roles: ['retrogamer'] },
  { user: 'zelda',  email: 'zelda@nintendo.com',    pass: 'zelda123',   roles: ['retrogamer'] },
];

const USER_KEY = 'retrojuegos_user';  

function showStatus(msg, kind='ok'){
  if(!statusB) return;
  statusB.textContent = msg;
  statusB.className = 'status ' + (kind === 'error' ? 'status--error' : 'status--ok');
}

function isEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function validateInputs(){
  const u   = (usuario?.value || '').trim();
  const p   = (clave?.value || '').trim();
  const rol = (rolSel?.value || '').trim();

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
  if(!rol){
    showStatus('Selecciona tu rol (Retrogamer o Administrador).', 'error');
    rolSel?.focus();
    return false;
  }
  return { u, p, rol };
}

function findUser(ident){
 
  const low = ident.toLowerCase();
  return DEMO_USERS.find(x => x.user.toLowerCase() === low || x.email.toLowerCase() === low);
}

function saveSession(profile, role, persist){
  const payload = JSON.stringify({
    user: profile.user,
    email: profile.email,
    role: role,
    ts: Date.now()
  });
  if(persist) localStorage.setItem(USER_KEY, payload);
  else sessionStorage.setItem(USER_KEY, payload);
}

function handleSubmit(e){
  e?.preventDefault?.();

  const valid = validateInputs();
  if(!valid) return;
  const { u, p, rol } = valid;

  const found = findUser(u);
  if(!found || found.pass !== p){
    showStatus('Usuario/correo o contraseña incorrectos.', 'error');
    return;
  }

  // Validar rol 
  if(!found.roles || !found.roles.includes(rol)){
    showStatus('El rol seleccionado no está habilitado para este usuario.', 'error');
    rolSel?.focus();
    return;
  }

  
  saveSession(found, rol, !!(remember && remember.checked));
  showStatus(`¡Bienvenido, ${found.user}! Rol: ${rol}. Redirigiendo…`, 'ok');

  setTimeout(() => { window.location.href = 'index.html'; }, 900);
}

function togglePassword(){
  if(!clave) return;
  const isText = clave.type === 'text';
  clave.type = isText ? 'password' : 'text';
  if(toggle) toggle.textContent = isText ? 'Ver' : 'Ocultar';
}


function hydrateIfRemembered(){
  const saved = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  if(!saved) return;
  try{
    const data = JSON.parse(saved);
    if(usuario && data?.email) usuario.value = data.email;
    if(rolSel && data?.role)   rolSel.value = data.role;
  }catch{}
}

document.addEventListener('DOMContentLoaded', ()=>{
  hydrateIfRemembered();
  form?.addEventListener('submit', handleSubmit);
});
