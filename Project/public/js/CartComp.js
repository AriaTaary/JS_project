Vue.component('cart-page', {
    data() {
        return {
            // cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 });
                find.quantity++;
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
        },
    },
    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
        <div class="cart-page">
                    <div class="empty" v-if="!cartItems.length">
                    <p>Корзина пуста</p>
                    </div>
                    <cart-page-item class="basket-items"
                    v-for="item of cartItems" 
                    :key="item.id_product"
                    :cart-item="item" 
                    :img="item.product_img"
                    :quantity="item.quantity"
                    @remove="remove">
                    </cart-page-item>
        </div>`
});

Vue.component('cart-page-item', {
    props: ['cartItem', 'img', 'quantity'],
    template: `
                <div class="product-block">
                <a href="product.html"><img :src="img" alt="img"></a>
                <div class="product-info">
                    <div class="product-info-title">
                        <a href="product.html">
                            <h4>{{cartItem.product_title}}</h4>
                        </a>
                        <button class="del-btn" @click="$emit('remove', cartItem)"><img src="./img/cross.svg" alt="cross"></button>
                    </div>
                    <p>Price: <span class="main-text">$ {{cartItem.quantity * cartItem.price}}</span></p>
                    <p>Color: Red</p>
                    <p class="product-info-p-last-child">Size: XL</p>
                    <div class="quantity">
                        <label for="quantity">Quantity:</label>
                        <input type="number" id=quantity :value="quantity">
                    </div>
                </div>
            </div>
    `
});


Vue.component('cart', {
    data() {
        return {
            // cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 });
                find.quantity++;
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
        },
    },
    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
        <div class="cart">
            <a href="shopping-cart.html">
                <button class="btn-cart" type="button" @mouseover="showCart = !showCart">
                    <img src="img/cart.svg" alt="cart">
                </button>
            </a>
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="item.product_img"
                :quantity="item.quantity"
                @remove="remove">
                </cart-item>
            </div>
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img', 'quantity'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" class="cart-img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_title}}</p>
                            <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}}$ за единицу</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}$</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
});

