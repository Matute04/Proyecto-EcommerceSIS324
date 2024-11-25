// ui.js
class UI {
    static createLoadingSpinner() {
        return `
            <div class="loading-spinner">
                <div class="spinner"></div>
            </div>
        `;
    }

    static createProductCard(product) {
        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="../img/${product.imagenes}" alt="${product.nombre}" loading="lazy">
                    <div class="product-overlay">
                        <button class="btn-quick-view" onclick="UI.showProductDetail(${product.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.nombre}</h3>
                    <p class="product-category">${product.categoria}</p>
                    <p class="product-price">$${product.precio.toFixed(2)}</p>
                    <button class="btn-add-cart" onclick="UI.addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Agregar al carrito
                    </button>
                </div>
            </div>
        `;
    }

    static createProductGrid(products) {
        return `
            <div class="products-grid">
                ${products.map(product => this.createProductCard(product)).join('')}
            </div>
        `;
    }

    static createFilters() {
        return `
            <div class="filters-container">
                <div class="search-box">
                    <input type="text" id="search-input" placeholder="Buscar productos...">
                    <i class="fas fa-search" ></i>

                </div>
                <div class="filter-group">
                    <select id="category-filter">
                        <option value="">Todas las categorías</option>
                        <option value="Mujer">Mujer</option>
                        <option value="Hombre">Hombre</option>
                        <option value="cehe">Otros</option>
                    </select>
                    
                    <button id="apply-filters" class="btn-filter" onclick="UI.FiltarTipoUI()">
                        <i class="fas fa-filter"></i> Aplicar filtros
                    </button>
                    <button id="apply-filters-name" class="btn-search" onclick="UI.FiltrarTipoNombre()">
                        <i class="fas fa-filter"></i> Buscar Nombre
                    </button>
                </div>
            </div>
        `;
    }
    static async FiltarTipoUI(){
        const mainContent = document.getElementById('main-content');
        var filtro = document.getElementById('category-filter').value;
        console.log(filtro);
        const products = await API.FiltrarTipo(filtro);
        console.log(products);
                    var content = `
                        ${this.createFilters()}
                        ${this.createProductGrid(products)}
                    `;
                    mainContent.innerHTML = content;
    }

    static async FiltrarTipoNombre(){
        const mainContent = document.getElementById('main-content');
        var filtro = document.getElementById('search-input').value;
        console.log(filtro);
        const products = await API.FiltrarTipoNombre(filtro);
        console.log(products);
                    var content = `
                        ${this.createFilters()}
                        ${this.createProductGrid(products)}
                    `;
                    mainContent.innerHTML = content;
    }

    static async loadContent(section) {
        const mainContent = document.getElementById('main-content');
        
        // Mostrar animación de carga
        mainContent.innerHTML = this.createLoadingSpinner();
        
        // Simular retardo de carga (0.5s)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        try {
            let content = '';
            switch (section) {
                case 'inicio':
                    content = `
                        <section class="history-section">
                            <h2>De Europa a Bolivia</h2>
                            <h3>1940</h3>
                            <div class="history-image">
                                <img src="index/manaco.jpg" alt="Historia de Manaco" />
                            </div>
                            <br>
                            <br>
                            <p>
                                Impregnado de las ideas y pensamientos de <strong>THOMAS BATA</strong>, el padre de la industria del calzado en el mundo, 
                                un grupo de jóvenes entusiastas llega a Bolivia. Checoslovacos – europeos, al frente de Zvonko Mauorek, con la determinación de 
                                instalarse en la ciudad de Cochabamba, fundaron una empresa manufacturera destinada a la fabricación y comercialización de calzado.
                            </p>
                            
                            <div class="history-highlights">
                                <blockquote>
                                    <em>"De Europa a Bolivia"</em>
                                </blockquote>
                                <blockquote>
                                    <em>"Perspectiva de un gran impacto social"</em>
                                </blockquote>
                                <blockquote>
                                    <em>"El primer par de calzados"</em>
                                </blockquote>
                                <blockquote>
                                    <em>"La mayor organización de calzados del país"</em>
                                </blockquote>
                            </div>
                        </section>
                    `;
                    break;
                case 'mas-vendidos':
                    content = `mas vendidos remplazar en ui.js pagina principal`
                    break;
                case 'productos':
                    const products = await API.getProducts();
                    content = `
                        ${this.createFilters()}
                        ${this.createProductGrid(products)}
                    `;
                    break;
                case 'descuentos':
                    content = `descuentos remplazar en ui.js pagina principal`
                    break;
                case 'contacto':
                    content = 
                    `<div class="contact-form">
                        <h1>Contáctanos</h1>
                        <p>¿Tienes alguna pregunta o comentario? Por favor, completa el formulario y te responderemos lo antes posible.</p>
                        
                        <form id="contactForm" onsubmit="UI.handleContactForm(event)">
                            <!-- Nombre -->
                            <div class="form-group">
                                <label for="name">Nombre completo:</label>
                                <input type="text" id="name" name="name" placeholder="Ingresa tu nombre completo" required>
                            </div>

                            <!-- Correo Electrónico -->
                            <div class="form-group">
                                <label for="email">Correo electrónico:</label>
                                <input type="email" id="email" name="email" placeholder="Ingresa tu correo electrónico" required>
                            </div>

                            <!-- Asunto -->
                            <div class="form-group">
                                <label for="subject">Asunto:</label>
                                <input type="text" id="subject" name="subject" placeholder="Ingresa el asunto" required>
                            </div>

                            <!-- Mensaje -->
                            <div class="form-group">
                                <label for="message">Mensaje:</label>
                                <textarea id="message" name="message" rows="5" placeholder="Escribe tu mensaje aquí" required></textarea>
                            </div>

                            <!-- Botón de Enviar -->
                            <div class="form-group">
                                <button type="submit" class="btn-submit">Enviar Mensaje</button>
                            </div>
                        </form>
                    </div>
                    `;
                    break;
                default:
                    content = 
                    `
                    <div class="error-container">
                        <i class="fas fa-exclamation-triangle error-icon"></i>
                        <h2>¡Ups! Algo salió mal</h2>
                        <p>
                            No se pudo cargar el contenido. Por favor, intenta nuevamente más
                            tarde.
                        </p>
                        <button class="retry-button">Reintentar</button>
                    </div>
                    `;
                    break;
                // Agregar más casos según necesidad
            }
            
            mainContent.innerHTML = content;
        } catch (error) {
            console.error('Error loading content:', error);
            mainContent.innerHTML = '<p class="error-message">Error al cargar el contenido</p>';
        }
    }

    static async showProductDetail(productId) {
        // Implementación del modal de detalle del producto
    }

    static async addToCart(productId) {
        // Verificar si ya existe un usuarioId guardado en localStorage
        let usuarioId = localStorage.getItem('usuarioId');
        if (!usuarioId) {
            alert('Por favor, inicia sesión para agregar productos al carrito.');
            window.location.href = '/login.html'; // Redirigir al login si no existe usuarioId
            return;
        }
    
        // Definir la cantidad por defecto (esto puede cambiar si quieres un input para la cantidad)
        const cantidad = 1;
    
        try {
            // Llamar a la función de la API para agregar el producto al carrito
            const response = await API.addToCart(usuarioId, productId, cantidad);
            if (response) {
                alert('Producto agregado al carrito.');
                UI.loadCart(usuarioId); // Si quieres actualizar la vista del carrito inmediatamente
            }
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
        }
    }
    
    static async cargarCarrito() {
        const usuarioId = localStorage.getItem('usuarioId');
        if (!usuarioId) {
            alert('Por favor, inicia sesión para ver tu carrito.');
            window.location.href = '/login.html'; // Redirige a login si no está autenticado
            return;
        }
    
        try {
            const response = await fetch(`/api/carrito/${usuarioId}`);
            const cartItems = await response.json();
    
            if (cartItems.length === 0) {
                document.getElementById('cart-container').innerHTML = '<p>Tu carrito está vacío.</p>';
                return;
            }
    
            let totalAmount = 0; // Variable para acumular el total
            let cartHTML = '<ul>';
            cartItems.forEach(item => {
                cartHTML += `
                    <li class="lista">
                        Producto: ${item.nombre} <br>
                        Descripción: ${item.descripcion} <br>
                        Cantidad: ${item.cantidad} <br>
                        Precio: $${item.precio.toFixed(2)} <br>
                        <!-- Importante: usar el id del carrito -->
                        <button class="remove-btn" data-cart-id="${item.id}">Eliminar</button>
                    </li>
                `;
                // Sumar al total el precio del producto por la cantidad
                totalAmount += item.precio * item.cantidad;
            });
            cartHTML += '</ul>';
    
            // Agregar el total al final
            cartHTML += `
                <div class="cart-total">
                    <strong>Total a pagar:</strong> $${totalAmount.toFixed(2)}
                </div>
            `;
    
            document.getElementById('cart-container').innerHTML = cartHTML;
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            document.getElementById('cart-container').innerHTML = '<p>Error al cargar el carrito.</p>';
        }
    }
    
    static async removeFromCart(cartId) {
        try {
            await API.deleteFromCart(cartId); // Llamar al método en la API
            alert('Producto eliminado del carrito exitosamente');
            this.cargarCarrito(); // Recargar el carrito
        } catch (error) {
            alert('Error al eliminar el producto del carrito');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evitar recargar la página

            const userData = {
                nombre: registerForm.nombre.value,
                email: registerForm.email.value,
                password: registerForm.password.value,
                direccion: registerForm.direccion.value,
                telefono: registerForm.telefono.value,
            };

            try {
                const response = await API.createUser(userData);
                if (response) {
                    alert('Cuenta creada exitosamente. Ahora puedes iniciar sesión.');
                    window.location.href = 'login.html'; // Redirigir al login
                } else {
                    alert('Error al registrar la cuenta.');
                }
            } catch (error) {
                console.error('Error al registrar usuario:', error);
                alert('Hubo un problema al crear la cuenta.');
            }
        });
    }
});