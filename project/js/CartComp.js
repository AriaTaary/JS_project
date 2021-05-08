Vue.component('cart', {
    data(){
      return {
          imgCart: 'https://placehold.it/50x100',
          cartUrl: '/getBasket.json',
          cartItems: [],
          showCart: false,
      }
    },
    methods: {
        addProduct(product){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1) {
                        if(item.quantity > 1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
    },
    mounted(){
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
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
