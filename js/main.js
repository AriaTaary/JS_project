'use strict';

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];

        this.fetchGoods();
        this.render();
    }

    fetchGoods() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }

    sum() {
        return this.goods.reduce(function (sum, { price }) {
            return sum + price;
        }, 0);
    }

    render() {
        const block = document.querySelector(this.container);

        for (const good of this.goods) {
            const productObject = new ProductItem(good);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('afterbegin', productObject.render());
        }

        block.insertAdjacentHTML('afterend', 'Общая стоимость товаров: ' + this.sum() + ' ₽');
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                    <img class="product-img" src="${this.img}" alt="Some img">
                    <div class="product-item-info">
                        <h3>${this.title}</h3>
                        <p>${this.price} ₽</p>
                    </div>
                    <button class="by-btn">Добавить в корзину</button>
                </div>`;  
    }
}

const pl = new ProductList();


class BasketList{
    //я думаю, что здесь понадобятся такие же методы, как и в ProductList
    //то есть, тоже нужен некий fetchGoods, хранящий массив товаров в корзине
    //и обязательно render для отрисовки данных корзины
    //вероятно, также метод общей стоимости товаров, так как в корзине это необходимо для итога
}

class BasketItem{
    //те же методы, что и в ProductItem: constructor с необходимыми данными
    //и render для отрисовки элемента
}