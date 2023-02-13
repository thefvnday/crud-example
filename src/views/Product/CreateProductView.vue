<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Product</h4>
            </div>
            <form @submit.prevent="submitForm">
                <div class="card-body">
                    <div class="mb-3">
                        <label for="">Name</label>
                        <input type="text" class="form-control" v-model="product.title" />
                    </div>
                    <div class="mb-3">
                        <label for="">Description</label>
                        <input type="text" class="form-control" v-model="product.description" />
                    </div>
                    <div class="mb-3">
                        <label for="">Price</label>
                        <input type="text" class="form-control" v-model="product.price" />
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary"> Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script >
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {

    components: {

    },
    setup() {
        const router = useRouter();

        let product = reactive({
            title: "",
            description: "",
            price: ""
        });

        let error = ref('')

        const submitForm = async () => {
            await axios.post(
                'http://127.0.0.1:8000/api/products', product, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(res =>{
                router.push("/dashboard")
            })
        }



        return {
            product,
            submitForm,
            error
        }
    }

}
</script>