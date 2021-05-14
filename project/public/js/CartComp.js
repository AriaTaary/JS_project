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
            <button class="btn-basket" type="button" @click="showCart = !showCart">Корзина</button>
                <div class="cart-block" v-show="showCart">
                    <div class="empty" v-if="!cartItems.length">
                    <p>Корзина пуста</p>
                    </div>
                    <cart-item class="basket-items"
                    v-for="item of cartItems" 
                    :key="item.id_product"
                    :cart-item="item" 
                    :img="imgCart"
                    @remove="remove">
                    </cart-item>
                </div>
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h3>{{cartItem.product_name}}</h3>
                        <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                        <p class="product-price">Итого: {{cartItem.quantity * cartItem.price}}₽</p>
                    </div>

                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                </div>
    `
});

