<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">MEVN Stack</a>
        </nav>

        <div class="container">
            <div class="row pt-5">
                <div class="col-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="addTask">
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
                                <button class="btn btn-primary btn-block">Agregar</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-5">
                    <pre>
                        {{ task }}
                    </pre>
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
        }
    }),
    methods: {
        addTask() {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.task),
                headers: {
                    'Accept': 'application/json',
                    'COntent-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.task.title = '';
                this.task.description = '';
            })
            .catch(error => console.log(error));
        },
    },
}
</script>