<template>
    <div>
        <button v-if="showClearCompletedButton" @click="clearCompletedButton">
            Удалить Завершенные
        </button>
    </div>
</template>

<script>
export default {
    name: 'todo-clear-completed',
    props: {
        showClearCompletedButton: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        clearCompletedButton() {
            eventBus.$emit('clearCompletedTodos');
        }
    }
};
</script>

<style></style>
