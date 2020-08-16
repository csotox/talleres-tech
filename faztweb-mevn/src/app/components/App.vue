<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">MEVN Stack</a>
        </nav>

        <div class="container">
            <div class="row pt-5">
                <!-- Form -->
                <div class="col-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="sendTask">
                                <div class="form-group">
                                    <input v-model="task.title"
                                        type="text"
                                        placeholder="Insertar una tarea"
                                        class="form-control">
                                </div>
                                <div class="form-group">
                                    <textarea v-model="task.description"
                                        cols="30" rows="10"
                                         placeholder="Insertar descripción"
                                         class="form-control"></textarea>
                                </div>
                                <template v-if="!isEdit">
                                    <button class="btn btn-primary btn-block">Agregar</button>
                                </template>
                                <template v-else>
                                    <button class="btn btn-primary btn-block">Actualizar</button>
                                </template>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- Table -->
                <div class="col-7">
                    <table class="table table-striped table-inverse table-responsive">
                        <thead class="thead-inverse">
                            <tr>
                                <th>Tarea</th>
                                <th>Descripción</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item of tasks">
                                <td scope="row">{{ item.title }}</td>
                                <td>{{ item.description }}</td>
                                <td>
                                    <button @click="delTask(item)"
                                        class="btn btn-danger">
                                        Eliminar
                                    </button>
                                    <button @click="editTask(item)"
                                        class="btn btn-secondary">
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        task: {
            title: '',
            description: '',
        },
        tasks: [],
        editId: ''
    }),
    computed: {
        isEdit() {
            return this.editId !== '';
        },
    },
    created() {
        this.getTask();
    },
    methods: {
        sendTask() {
            let verb = 'PUT';
            let url = '/api/tasks/' + this.editId;
            if (!this.isEdit) {
                verb = 'POST';
                url = '/api/tasks';
            }

            fetch(url, {
                method: verb,
                body: JSON.stringify(this.task),
                headers: {
                    'Accept': 'application/json',
                    'COntent-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.clearAndGetTask();
            })
            .catch(error => console.log(error));
        },
        getTask() {
            fetch('/api/tasks', {
                method: 'GET',
            })
            .then(res => res.json())
            .then(data => {
                this.tasks = data;
            })
            .catch(error => console.log('getTask', error));
        },
        delTask(task) {
            fetch('/api/tasks/' + task._id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'COntent-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.getTask();
            })
            .catch(error => console.log('delTask', error));
        },
        editTask(task) {
            fetch('/api/tasks/' + task._id, {
                method: 'GET',
            })
            .then(res => res.json())
            .then(data => {
                this.editId = data._id;
                this.task.title = data.title;
                this.task.description = data.description;
            })
            .catch(error => console.log('getTask', error));
        },
        clear() {
            this.editId = '';
            this.task.title = '';
            this.task.description = '';
        },
        clearAndGetTask() {
            this.clear();
            this.getTask();
        }
    },
}
</script>