import Vue from 'vue';
import App from './App.vue';

window.eventBus = new Vue();

Vue.config.productionTip = false;

new Vue({
    render: function(h) {
        return h(App);
    }
}).$mount('#app');
