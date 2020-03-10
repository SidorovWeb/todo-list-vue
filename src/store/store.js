import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
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
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.push({
                id: todo.title,
                title: todo.title,
                completed: todo.completed,
                editing: todo.editing
            });
        },
        clearCompleted(state) {
            state.todos = state.todos.filter(todo => !todo.completed);
        },
        checkAll(state, check) {
            state.todos.forEach(todo => (todo.completed = check));
        },
        updateTodo(state, todo) {
            const index = state.todos.findIndex(item => item.id === todo.id);
            state.todos.splice(index, 1, {
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                editing: todo.editing
            });
        },
        updateFilter(state, filter) {
            state.filter = filter;
        },
        deleteTodo(state, id) {
            const index = state.todos.findIndex(item => item.id === id);
            state.todos.splice(index, 1);
        }
    },
    actions: {
        addTodo(context, todo) {
            setTimeout(() => {
                context.commit('addTodo', todo);
            }, 500);
        },
        checkAll(context, check) {
            context.commit('checkAll', check);
        },
        updateTodo(context, todo) {
            context.commit('updateTodo', todo);
        },
        updateFilter(context, filter) {
            context.commit('updateFilter', filter);
        },
        deleteTodo(context, id) {
            context.commit('deleteTodo', id);
        },
        clearCompleted(context) {
            setTimeout(() => {
                context.commit('clearCompleted');
            }, 500);
        }
    },
    getters: {
        remaining(state) {
            return state.todos.filter(todo => !todo.completed).length;
        },
        anyRemaining(state, getters) {
            return getters.remaining != 0;
        },
        todosFiltered(state) {
            if (state.filter == 'all') {
                return state.todos;
            } else if (state.filter == 'active') {
                return state.todos.filter(todo => !todo.completed);
            } else if (state.filter == 'completed') {
                return state.todos.filter(todo => todo.completed);
            }

            return state.todos;
        },
        showClearCompletedButton(state) {
            return state.todos.filter(todo => todo.completed).length > 0;
        }
    }
});
