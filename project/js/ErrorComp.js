Vue.component('error', {
    data() {
        return {
            error: false
        }
    },
    methods: {
        setError() {
            this.error = true;
        }
    },
    template: ` 
        <div v-if="error" class="empty">
            <p>Ошибка получения данных</p>
        </div>`
});