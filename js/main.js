'use strict';

const renderProduct = (title = 'Unknown title', price = 0) => {
    return `<div class="product-item">
                <div class="product-item-info">
                    <h3>${title}</h3>
                    <p>${price} ₽</p>
                </div>
                <button class="by-btn">Добавить в корзину</button>
            </div>`;   
};

const Catalog = {
    products: [
        { id: 1, title: 'Notebook', price: 20000 },
        { id: 2, title: 'Mouse', price: 1500 },
        { id: 3, title: 'Keyboard', price: 5000 },
        { id: 4, title: 'Gamepad', price: 4500 },
        // проверка на работоспособность значений по умолчанию
        { id: 5 },
    ],
    renderProducts() {
        const productListHTML = this.products.map((item) => renderProduct(item.title, item.price));
        // запятая выводится из-за того, что в productListHTML содержится массив данных, разделенный запятой
        // если просто напрямую вывести весь массив, то выведутся и запятые
        // document.querySelector('.products').innerHTML = productListHTML;
        // решить это можно, например, с помощью цикла, который вывод каждый элемент по отдельности
        let productList = document.querySelector('.products');
        for (let i = 0; i < productListHTML.length; i++) {
            productList.insertAdjacentHTML('beforeend', productListHTML[i]);
        };
    }
};

Catalog.renderProducts();


