'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://via.placeholder.com/300x150',
        searchLine: '',
        isVisibleCart: false,
        cartProducts: [],
        filtered: []
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartProducts.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            let item = Object.assign({ quantity: 1 }, product);
                            this.cartProducts.push(item);
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        removeProduct(product) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartProducts.find(el => el.id_product === product.id_product);
                        if (find.quantity > 1) { // если товара > 1, то уменьшаем количество на 1
                            find.quantity--;
                        } else { // удаляем
                            let item = Object.assign(product);
                            this.cartProducts.splice(item);
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        filterGoods() {
            console.log('hi');
            const regexp = new RegExp(this.searchLine, 'i'); 
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        }
    },
    beforeCreate() { },
    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
    },
    beforeMount() { },
    mounted() { },
    beforeUpdate() { },
    updated() { },
    beforeDestroy() { },
    destroyed() { },
});
