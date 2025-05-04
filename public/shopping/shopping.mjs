const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
    const article = document.createElement('article');
    
    const img = document.createElement('img');
    img.src = product.imageSrc;
    img.alt = product.name;
    article.appendChild(img);
    
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'product-details';
    
    const nameElem = document.createElement('h3');
    nameElem.textContent = product.name;
    detailsDiv.appendChild(nameElem);
    
    const descElem = document.createElement('p');
    descElem.textContent = product.description;
    detailsDiv.appendChild(descElem);
    
    const priceElem = document.createElement('p');
    priceElem.className = 'price';
    priceElem.textContent = `$${product.price}`;
    detailsDiv.appendChild(priceElem);
    
    const buttonContainer = document.createElement('div');
    
    const buyButton = document.createElement('button');
    buyButton.className = 'buy-button';
    buyButton.textContent = 'Add to cart';
    buyButton.addEventListener('click', () => {
        product.numInCart += 1;
        rerenderAllProducts();
        rerenderCart();
    });
    buttonContainer.appendChild(buyButton);
    
    if (product.numInCart > 0) {
        const numInCart = document.createElement('span');
        numInCart.className = 'num-in-cart';
        numInCart.textContent = `${product.numInCart} in cart`;
        buttonContainer.appendChild(numInCart);
    }
    
    detailsDiv.appendChild(buttonContainer);
    article.appendChild(detailsDiv);
    
    return article;
}

/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
    const productListSection = document.querySelector('.product-list');
    
    const heading = productListSection.querySelector('h2');
    
    productListSection.innerHTML = '';
    
    productListSection.appendChild(heading);
    
    for (let product of PRODUCTS) {
        if (shouldProductBeVisible(product)) {
            const productCard = renderProductCard(product);
            productListSection.appendChild(productCard);
            console.log(productCard);
        }
    }
}

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    
    cartItemsContainer.innerHTML = '';
    
    for (let product of PRODUCTS) {
        if (product.numInCart > 0) {
            const cartItemText = document.createElement('p');
            cartItemText.textContent = `${product.name} x${product.numInCart}`;
            cartItemsContainer.appendChild(cartItemText);
            
            const removeButton = document.createElement('button');
            removeButton.className = 'remove-button';
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                product.numInCart = 0;
                rerenderAllProducts();
                rerenderCart();
            });
            cartItemsContainer.appendChild(removeButton);
        }
    }
}

const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");

/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
    const minPriceStr = minPriceInput.value.trim();
    const maxPriceStr = maxPriceInput.value.trim();
    
    if (minPriceStr === '' && maxPriceStr === '') {
        return true;
    }
    
    const productPrice = product.price;
    
    if (minPriceStr !== '') {
        const minPrice = Number.parseFloat(minPriceStr);
        if (productPrice < minPrice) {
            return false;
        }
    }
    
    if (maxPriceStr !== '') {
        const maxPrice = Number.parseFloat(maxPriceStr);
        if (productPrice > maxPrice) {
            return false;
        }
    }
    
    return true;
}

function setupPriceFilters() {
    minPriceInput.addEventListener('change', rerenderAllProducts);
    maxPriceInput.addEventListener('change', rerenderAllProducts);
}

document.addEventListener('DOMContentLoaded', () => {
    setupPriceFilters();
    rerenderAllProducts();
    rerenderCart();
});
