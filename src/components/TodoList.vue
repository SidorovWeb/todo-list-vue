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
                @removedTodo="removedTodo"
                @finishedEdit="finishedEdit"
            >
            </todo-item>
        </transition-group>
        <div class="extra-container">
            <label>
                <input
                    type="checkbox"
                    :checked="!anyRemaining"
                    @change="checkAllTodos"
                />
                Выбрать все
            </label>
            <div>{{ remaining }} items left</div>
        </div>
        <div class="extra-container">
            <div>
                <button
                    :class="{ active: filter == 'all' }"
                    @click="filter = 'all'"
                >
                    Все
                </button>
                <button
                    :class="{ active: filter == 'active' }"
                    @click="filter = 'active'"
                >
                    Активные
                </button>

                <button
                    :class="{ active: filter == 'completed' }"
                    @click="filter = 'completed'"
                >
                    Завершенные
                </button>
            </div>
            <div>
                <transition name="fade">
                    <button
                        v-if="showClearCompletedButton"
                        @click="clearCompletedButton"
                    >
                        Удалить Завершенные
                    </button>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem';
export default {
    name: 'todo-list',
    components: { TodoItem },
    data() {
        return {
            newTodo: '',
            idForTodo: 3,
            beforeEditCashe: '',
            filter: 'all',
            todos: [
                {
                    id: 1,
                    title: 'Finish Vue Scr',
                    completed: false,
                    editing: false
                },
                {
                    id: 2,
                    title: 'Take over world',
                    completed: false,
                    editing: false
                }
            ]
        };
    },
    computed: {
        remaining() {
            return this.todos.filter(todo => !todo.completed).length;
        },
        anyRemaining() {
            return this.remaining != 0;
        },
        todosFiltered() {
            if (this.filter == 'all') {
                return this.todos;
            } else if (this.filter == 'active') {
                return this.todos.filter(todo => !todo.completed);
            } else if (this.filter == 'completed') {
                return this.todos.filter(todo => todo.completed);
            }

            return this.todos;
        },
        showClearCompletedButton() {
            return this.todos.filter(todo => todo.completed).length > 0;
        }
    },

    methods: {
        addTodo() {
            if (this.newTodo.trim().length == 0) {
                return;
            }
            this.todos.push({
                id: this.idForTodo,
                title: this.newTodo,
                completed: false
            });
            this.newTodo = '';
            this.idForTodo++;
        },
        removedTodo(index) {
            this.todos.splice(index, 1);
        },
        checkAllTodos() {
            this.todos.forEach(todo => (todo.completed = event.target.checked));
        },
        clearCompletedButton() {
            this.todos = this.todos.filter(todo => !todo.completed);
        },
        finishedEdit(data) {
            this.todos.splice(data.index, 1, data.todo);
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
