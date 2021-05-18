Vue.component('error', {
    data() {
        return {
            text: ''
        }
    },
    methods: {
        setError(error) {
            this.text = error
        }
    },
    computed: {
        isVisible() {
            return this.text !== ''
        }
    },
    template: `
            <div class="empty" v-if="isVisible"> 
                <p>
                    {{ text }}
                </p>
            </div>
    `

        
});