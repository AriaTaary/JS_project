//реакция на нажатие на кнопку "создать"
document.getElementById('submit').addEventListener('click', () => {
    //появляется ранее скрытый блок с итоговыми данными
    document.getElementById('total').classList.add('open');
    let burger = new BurgerConstructor('size', 'fill', 'topings');
    burger.showSum('#price', '#calories');
})

class BurgerItem {
    constructor(burger) {
        //+ нужен для преобразования строки в числа
        this.price = +burger.dataset['price'];
        this.calories = +burger.dataset['calories'];
    }
}

class BurgerConstructor {
    constructor(size, fill, topping) {
        this.size = this._select(size);
        console.log(this.size );
        this.fill = this._select(fill);
        this.toppings = this._getToppings(topping);
    }

    _select(name) {
        return new BurgerItem(document.querySelector(`input[name="${name}"]:checked`));
    }

    _getToppings(name) {
        let result = [];
        this._selectAll(name).forEach(el => result.push(new BurgerItem(el)));
        return result;
    }

    _selectAll(name) {
        return [...document.querySelectorAll(`input[name="${name}"]:checked`)];
    }

    _sumPrice() {
        let result = this.size.price + this.fill.price;
        this.toppings.forEach(topping => result += topping.price);
        return result;
    }

    _sumCalories() {
        let result = this.size.calories + this.fill.calories;
        this.toppings.forEach(topping => result += topping.calories);
        return result;
    }

    showSum(price, calories) {
        document.querySelector(price).textContent = this._sumPrice();
        document.querySelector(calories).textContent = this._sumCalories();
    }
}
