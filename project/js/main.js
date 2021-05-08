'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let getRequest = (url) => {
    return new Promise((error, success) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status !== 200){
                    error('Error');
                } else {
                    success(xhr.responseText);
                }
            }
        };
        xhr.send();
    })
};

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];

        this._getProducts()
            .then((data) => {
                this._goods = data;
                this._render();
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then((response) => response.json())
            .catch((error) => {
                console.log(error);
            });
    }

    _render() {
        const block = document.querySelector(this.container);

        for (const good of this._goods) {
            const productObject = new ProductItem(good);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('afterbegin', productObject.render());
        }
    }

    sum() {
        return this._goods.reduce((sum, { price }) => sum + price, 0);
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/300x200') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                    <img class="product-img" src="${this.img}" alt="Some img">
                    <div class="product-item-info">
                        <h3>${this.title}</h3>
                        <p>${this.price} \u20bd</p>
                    </div>
                    <button class="buy-btn"
                      data-id="${this.id}"
                      data-name="${this.title}"
                      data-price="${this.price}">Добавить в корзину</button>
                </div>`;  
    }
}

const pl = new ProductList();

class BasketList {
    constructor(container = '.basket', maincontainer = '.products', url = "/getBasket.json") {
        this.container = container;
        this.maincontainer = maincontainer;
        this.url = url;
        this._goods = [];
        this._basketProducts = [];
        this._init();
    }

    _init() {
        document.querySelector(this.maincontainer).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                this.addProduct(e.target);
            }
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                this.removeProduct(e.target);
            }
        })
    }

    addProduct(product) {
        let productId = +product.dataset['id'];
        let productItem = this._goods.find(product => product.id_product === productId);
        if (productItem) {
            productItem.quantity++;
            this._updateBasket(productItem);
        } else {
            let newProduct = {
                id_product: productId,
                price: +product.dataset['price'],
                product_name: product.dataset['name'],
                quantity: 1
            };
            this._goods.push(newProduct);
            this._updateBasket(newProduct);
        }
    }

    removeProduct(product) {
        let productId = +product.dataset['id'];
        let productItem = this._goods.find(product => product.id_product === productId);
        if (productItem.quantity == 1) {
            this._goods.splice(this._goods.indexOf(productItem), 1);
            document.querySelector(`.basket-item[data-id="${productId}"]`).remove();
        } else {
            productItem.quantity--;
            this._updateBasket(productItem);
        }
    }

    _updateBasket(product) {
        const block = document.querySelector(this.container);
        let productItem = document.querySelector(`.basket-item[data-id="${product.id_product}"]`);

        if (productItem != null) {
            let newblock = document.querySelector(`.basket-item[data-id="${product.id_product}"]`);
            newblock.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
            newblock.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
        }

        else{
            const productObject = new BasketItem(product);
            this._basketProducts.push(productObject);
            block.insertAdjacentHTML('afterbegin', productObject.render());
        }
    }
}

class BasketItem {
    constructor(product, img = 'https://via.placeholder.com/300x200') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        this.quantity = product.quantity;
    }
    render() {
        return `<div class="basket-item" data-id="${this.id}">

                <img class="product-img" src="${this.img}" alt="Some image">
                <div class="product-item-info">
                        <h3>${this.title}</h3>
                        <p class="product-quantity">Количество: ${this.quantity}</p>
                        <p class="product-price">Итого: ${this.quantity * this.price} \u20bd</p>
                </div>

                <button class="del-btn" data-id="${this.id}">Удалить 1 шт.</button>
            </div>`
    }
}

const bl = new BasketList();