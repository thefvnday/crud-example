

<template>
    <section class="vh-100">
        <div class="container-fluid h-custom">
            
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img src="../assets/kucing.jpg" class="img-fluid" alt="Sample image">
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <h1 class="mb-5">Sign In</h1>
                    <p class="text-danger" v-if="error">{{ error }}</p>
                    <form @submit.prevent="login">
                        <!-- Email input -->
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                                v-model="form.email">
                            <label for="floatingInput">Email address</label>
                        </div>

                        <!-- Password input -->
                        <div class="form-floating  mb-3">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                                v-model="form.password">
                            <label for="floatingPassword">Password</label>
                        </div>

                        <div class="text-center text-lg-start mt-4 pt-2">
                            <button type="submit" class="btn btn-primary">Login</button>
                            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                                    class="link-danger">Register</a></p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
    setup() {
        const router = useRouter();
        const store = useStore();

        let form = reactive({
            email: '',
            password: ''
        });

        let error = ref('')

        const login = async () => {
            await axios.post('http://127.0.0.1:8000/api/login', form).then(res => {
                if (res.data.success == true) {
                    store.dispatch('setToken', res.data.token);

                    router.push({ name: 'Dashboard' })
                } else {
                    error.value = res.data.message;
                }
            });
        }

        return {
            form,
            login,
            error
        }

    }

}

</script>

<style scoped>
.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
}

.h-custom {
    height: calc(100% - 73px);
}

@media (max-width: 450px) {
    .h-custom {
        height: 100%;
    }
}

/* .login-input {
    width: 30%;
    height: 150px;

    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;

} */
</style>
