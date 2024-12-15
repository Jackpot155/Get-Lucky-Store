class Cart {
    constructor() {
        this.items = [];
        this.loadFromLocalStorage();
    }

    addItem(product, discount = 0) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (!existingItem) {
            this.items.push({
                ...product,
                discount,
                originalPrice: product.price,
                finalPrice: product.price * (1 - discount / 100)
            });
        }
        this.saveToLocalStorage();
        this.updateCartCount();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToLocalStorage();
        this.updateCartCount();
    }

    calculateTotal() {
        return this.items.reduce((total, item) => total + item.finalPrice, 0).toFixed(2);
    }

    saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    loadFromLocalStorage() {
        const savedCart = localStorage.getItem('cart');
        this.items = savedCart ? JSON.parse(savedCart) : [];
        this.updateCartCount();
    }

    updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = this.items.length;
        }
    }

    clearCart() {
        this.items = [];
        this.saveToLocalStorage();
        this.updateCartCount();
    }
}

const cart = new Cart();