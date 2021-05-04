'use strict'

// не смогла решить проблему:
// если все поля верные, то цикл "опаздывает", то есть валидация проходит только на следующий ход
// это из-за того, что поздно убирается метка "invalid", тем самым создавая потребность пройти цикл ещё раз

class Form {
    constructor(form) {
        this.patterns = {
            name: /[a-z,а-я]$/i, //без учета регистра
            phone: /\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /[a-z._-]+@[a-z]+\.ru$/i, //без учета регистра
            comment: /./ //один любой символ, кроме переноса строки
        };
        this.errorMessages = {
            name: 'Имя содержит только буквы',
            phone: 'Телефон должен иметь вид +7(000)000-0000',
            email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru',
            comment: 'Введите комментарий'
        };
        this.form = form;
        this.init();
    }
    init() {
        // проверяем, сколько инпутов инвалидных
        // если больше 0, то запускаем новый цикл валидации
        let test = document.querySelectorAll('.invalid');
        if (test.length > 0) {
            //удаляем старые сообщения при обновлении формы
            let messages = document.querySelectorAll(`.error-message`);
            for (let message of messages) {
                message.remove();
            }
            //для каждого инпута вызываем метод
            let inputs = document.getElementById(this.form).querySelectorAll('.form-input');
            for (let input of inputs) {
                this.validate(input);
            }
        }
        else {
            console.log('Валидация пройдена');
        }
    }
    validate(input) {
        let pattern = this.patterns[input.id];
        let value = input.value;
        //тестируем паттер на совпадение со значением
        if (pattern.test(value)) {
            input.classList.remove('invalid');
        }
        else {
            let error = `<p class="error-message">${this.errorMessages[input.id]}</p>`;
            input.insertAdjacentHTML('afterend', error);
        }
    }
}
