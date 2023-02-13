<template>
    <section class="vh-100">
        <div class="container-fluid h-custom">

            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img src="../assets/kucing.jpg" class="img-fluid" alt="Sample image">
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <h1 class="mb-5">Sign Up</h1>

                    <form @submit.prevent="register">
                        <!-- Name input -->
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="your name"
                                v-model="form.name">
                            <label for="floatingInput">Name</label>
                        </div>

                        <!-- Email Input -->
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

                        <!-- Confirmation Password -->

                        <div class="form-floating  mb-3">
                            <input type="password" class="form-control" id="floatingPasswordConfirmation"
                                placeholder="Password Confirmation" v-model="form.password_confirmation">
                            <label for="floatingPasswordConfirmation">Password Confirmation</label>
                        </div>

                        <div class="text-center text-lg-start mt-4 pt-2">
                            <button type="submit" class="btn btn-primary">Register</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </section>
    <!-- <img class="logo" src="../assets/logo.svg" > -->
    <!-- <h1 class="mb-5">Sign Up</h1>
    <div class="register-input">
        <form @submit.prevent="register">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="your name" v-model="form.name">
                <label for="floatingInput">Name</label>
            </div>
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="form.email">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating  mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="form.password">
                <label for="floatingPassword">Password</label>
            </div>
            <div class="form-floating  mb-3">
                <input type="password" class="form-control" id="floatingPasswordConfirmation"
                    placeholder="Password Confirmation" v-model="form.c_password">
                <label for="floatingPasswordConfirmation">Password Confirmation</label>
            </div>
        </form>
        <button type="button" class="btn btn-primary">Sign Up</button>
    </div> -->



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
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        });
        let errors = ref([])

        const register = async () => {
            await axios.post('http://127.0.0.1:8000/api/register', form).then(res => {
                if (res.data.success == true) {
                    // store.dispatch('setToken', res.data.token);
                    router.push({ name: 'Login' })
                }
            }).catch(e => {
                errors.value = e.response.data.message
            })
        }
        return {
            form,
            register,
            errors
        }
    }

}
</script>


<style>
.logo {
    width: 100px;
}

.register-input {
    width: 30%;
    height: 200px;

    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;

}
</style>