<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <input type="checkbox" v-model="completed" @change="doneEdit" />
            <div
                v-if="!editing"
                @dblclick="editTodo"
                :class="{ completed: completed }"
                class="todo-item-label"
            >
                {{ title }}
            </div>
            <input
                v-else
                class="todo-item-edit"
                type="text"
                v-model="title"
                @blur="doneEdit"
                @keyup.enter="doneEdit"
                @keyup.esc="cancelEdit"
                v-focus
            />
        </div>
        <div class="remove-item" @click="removedTodo(index)">
            &times;
        </div>
    </div>
</template>

<script>
export default {
    name: 'todo-item',
    props: {
        todo: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        checkAll: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            id: this.todo.id,
            title: this.todo.title,
            completed: this.todo.completed,
            editing: this.todo.editing,
            beforeEditCashe: ''
        };
    },
    directives: {
        focus: {
            inserted: function(el) {
                el.focus();
            }
        }
    },
    watch: {
        checkAll() {
            this.completed = this.checkAll ? true : this.todo.completed;
        }
    },
    methods: {
        removedTodo(index) {
            this.$emit('removedTodo', index);
        },
        editTodo() {
            this.beforeEditCashe = this.title;
            this.editing = true;
        },
        doneEdit() {
            if (this.title.trim() == '') {
                this.title = this.beforeEditCashe;
            }
            this.editing = false;
            this.$emit('finishedEdit', {
                index: this.index,
                todo: {
                    id: this.id,
                    title: this.title,
                    completed: this.completed,
                    editing: this.editing
                }
            });
        },
        cancelEdit() {
            this.title = this.beforeEditCashe;
            this.editing = false;
        }
    }
};
</script>

<style></style>
