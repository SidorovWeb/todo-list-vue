<template>
    <div>
        <input
            type="text"
            class="todo-input"
            placeholder="Напишите сюда"
            v-model="newTodo"
            @keyup.enter="addTodo"
        />
        <transition-group
            name="fade"
            enter-active-class="animated fadeInRight"
            leave-active-class="animated fadeOutRight"
        >
            <todo-item
                v-for="(todo, index) in todosFiltered"
                :key="todo.id"
                :todo="todo"
                :index="index"
                :checkAll="!anyRemaining"
            >
            </todo-item>
        </transition-group>
        <div class="extra-container">
            <todo-check-all></todo-check-all>
            <todo-items-remaining></todo-items-remaining>
        </div>
        <div class="extra-container">
            <todo-filtered></todo-filtered>
            <div>
                <transition name="fade">
                    <todo-clear-completed></todo-clear-completed>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoCheckAll from './TodoCheckAll';
import TodoFiltered from './TodoFiltered';
import TodoClearCompleted from './TodoClearCompleted';
export default {
    name: 'todo-list',
    components: {
        TodoItem,
        TodoItemsRemaining,
        TodoCheckAll,
        TodoFiltered,
        TodoClearCompleted
    },
    data() {
        return {
            newTodo: '',
            idForTodo: 3,
            beforeEditCashe: ''
        };
    },
    computed: {
        remaining() {
            return this.$store.getters.remaining;
        },
        anyRemaining() {
            return this.$store.getters.anyRemaining;
        },
        todosFiltered() {
            return this.$store.getters.todosFiltered;
        },
        showClearCompletedButton() {
            return this.$store.getters.showClearCompletedButton;
        }
    },

    methods: {
        addTodo() {
            if (this.newTodo.trim().length == 0) {
                return;
            }
            this.$store.dispatch('addTodo', {
                id: this.idForTodo,
                title: this.newTodo,
                completed: false,
                editing: false
            });
            this.newTodo = '';
            this.idForTodo++;
        }
    }
};
</script>

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css');

.todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus {
        outline: 0;
    }
}

.todo-item {
    display: flex;
    margin-bottom: 12px;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
}

.remove-item {
    cursor: pointer;
    margin-left: 14px;

    &:hover {
        color: black;
    }
}

.todo-item-left {
    display: flex;
    align-items: center;
}

.todo-item-label {
    padding: 10px;
    bottom: 1px solid white;
    margin-left: 12px;
}

.todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;

    &:focus {
        outline: none;
    }
}

.completed {
    text-decoration: line-through;
    color: gray;
}

.extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;

    button {
        font-size: 14px;
        appearance: none;

        &:hover {
            background-color: lightgrey;
        }
        &:focus {
            outline: none;
        }
    }
}

.active {
    background-color: green;
    color: white;
}

input[type='checkbox'],
button {
    cursor: pointer;
}

// transition
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
