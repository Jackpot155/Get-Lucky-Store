function generateHomePageProducts() {
    const categories = ['gaming', 'electronics', 'furniture', 'fitness'];
    const carouselContainer = document.querySelector('.product-carousel');

    if (carouselContainer) {
        categories.forEach(category => {
            const categoryProducts = products[category];
            const selectedProducts = categoryProducts
                .sort(() => 0.5 - Math.random())
                .slice(0, 4)
                .map(product => ({
                    ...product,
                    discount: Math.floor(Math.random() * 41) + 10 // 10-50% discount
                }));

            selectedProducts.forEach(product => {
                const productTile = document.createElement('div');
                productTile.classList.add('product-tile');
                productTile.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Original Price: $${product.price}</p>
                    <p>Discount: ${product.discount}%</p>
                    <p>Final Price: $${(product.price * (1 - product.discount / 100)).toFixed(2)}</p>
                `;
                productTile.addEventListener('click', () => {
                    cart.addItem(product, product.discount);
                });
                carouselContainer.appendChild(productTile);
            });
        });
    }
}

function populateCategoryPages() {
    const categories = ['gaming', 'electronics', 'furniture', 'fitness'];
    categories.forEach(category => {
        const productList = document.querySelector(`#${category}-products`);
        if (productList) {
            const categoryProducts = products[category];
            categoryProducts.forEach(product => {
                const productTile = document.createElement('div');
                productTile.classList.add('product-tile');
                productTile.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price}</p>
                `;
                productTile.addEventListener('click', () => {
                    cart.addItem(product);
                });
                productList.appendChild(productTile);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    generateHomePageProducts();
    populateCategoryPages();
});