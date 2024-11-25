// auth.js - Manejo de autenticación

// Función para manejar el inicio de sesión
async function handleLogin(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Verificar que los inputs existan
    if (!emailInput || !passwordInput) {
        console.error('Elementos del formulario no encontrados.');
        return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        alert('Por favor, ingresa tu correo y contraseña.');
        return;
    }

    try {
        const { user, token } = await API.login(email, password);

        // Guardar en localStorage
        saveSession(user, token);

        // Mensaje de bienvenida y redirección
        alert(`Inicio de sesión exitoso, bienvenido ${user.nombre}`);
        redirectTo('/');
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert(error.message || 'Ocurrió un error al intentar iniciar sesión.');
    }
}

// Función para manejar el cierre de sesión
function handleLogout() {
    clearSession();

    alert('Has cerrado sesión.');
    redirectTo('/login.html');
}

// Guardar sesión en localStorage
function saveSession(user, token) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('usuarioId', user.id); // Guardamos también el ID de usuario
}

// Limpiar sesión de localStorage
function clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('usuarioId'); // Limpiar el ID del usuario al cerrar sesión
}

// Redirigir a una página específica
function redirectTo(path) {
    window.location.href = path;
}

// Verificar sesión al cargar la página
function checkSession() {
    const user = localStorage.getItem('user');
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const welcomeMessage = document.getElementById('welcomeMessage');

    if (user) {
        const parsedUser = JSON.parse(user);

        if (welcomeMessage && parsedUser) {
            welcomeMessage.textContent = `Bienvenido, ${parsedUser.nombre}`;
            welcomeMessage.style.textAlign = 'center'; 
        }
        

        // Mostrar solo botón de cerrar sesión
        if (loginForm) loginForm.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'block';
    } else {
        // Mostrar formulario de login
        if (loginForm) loginForm.style.display = 'block';
        if (logoutButton) logoutButton.style.display = 'none';
    }
}

// Eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    checkSession();

    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});
