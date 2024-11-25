class API {
    // Productos
    static async getProducts(filters = {}) {
        try {
            let url = '/api/productos';
            const queryParams = new URLSearchParams();

            if (filters.category) {
                queryParams.append('categoria', filters.category);
            }
            if (filters.priceRange) {
                queryParams.append('precio', filters.priceRange);
            }
            if (filters.search) {
                queryParams.append('busqueda', filters.search);
            }

            if (queryParams.toString()) {
                url += '?' + queryParams.toString();
            }

            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al obtener productos');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    static async createProduct(productData) {
        try {
            const response = await fetch('/api/productos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });
            if (!response.ok) throw new Error('Error al crear producto');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    // Usuarios
    static async getUser(userId) {
        try {
            const response = await fetch(`/api/usuarios/${userId}`);
            if (!response.ok) throw new Error('Error al obtener usuario');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    static async createUser(userData) {
        try {
            const response = await fetch('/api/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            if (!response.ok) throw new Error('Error al crear usuario');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    static async login(email, password) {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al iniciar sesión');
            }
    
            const data = await response.json();
            localStorage.setItem('usuarioId', data.id); // Guardar el ID del usuario en localStorage
            return data;
        } catch (error) {
            console.error('Error en login:', error.message);
            throw error;
        }
    }    

    // Carrito 
    static async getCart(userId) {
    try {
        const response = await fetch(`/api/carrito/${userId}`);
        if (!response.ok) throw new Error('Error al obtener el carrito');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}


    static async addToCart(userId, productId, quantity) {
        try {
            const response = await fetch('/api/carrito', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuarioId: userId, productoId: productId, cantidad: quantity }),
            });
            if (!response.ok) throw new Error('Error al agregar al carrito');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    static async updateCart(cartId, quantity) {
        try {
            const response = await fetch(`/api/carrito/${cartId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cantidad: quantity }),
            });
            if (!response.ok) throw new Error('Error al actualizar el carrito');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    static async deleteFromCart(cartId) {
        try {
            const response = await fetch(`/api/carrito/${cartId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el producto del carrito');
            }
            return await response.json();
        } catch (error) {
            console.error('Error en la API al eliminar del carrito:', error);
            throw error;
        }
    }

    // Pedidos
    static async createOrder(orderData) {
        try {
            const response = await fetch('/api/pedidos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });
            if (!response.ok) throw new Error('Error al crear pedido');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    static async getOrdersByUser(userId) {
        try {
            const response = await fetch(`/api/pedidos/usuario/${userId}`);
            if (!response.ok) throw new Error('Error al obtener pedidos del usuario');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }
    static async FiltrarTipo(filtro) {
        try {
            // const filtro = document.getElementById('category-filter').value;
            console.log(filtro);
            const response = await fetch(`/api/productos/categoria/${filtro}`);
            if (!response.ok) throw new Error('Error al obtener productos por categoría');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }
    static async FiltrarTipoNombre(filtro) {
        try {
            // const filtro = document.getElementById('category-filter').value;
            console.log(filtro);
            const response = await fetch(`/api/productos/nombre/${filtro}`);
            if (!response.ok) throw new Error('Error al obtener productos por categoría');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }
    
}