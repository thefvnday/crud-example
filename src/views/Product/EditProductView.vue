<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit</h4>
            </div>
            <form @submit.prevent="submitForm">
                <div class="card-body">
                    <div class="mb-3">
                        <label for="">Name</label>
                        <input name="title" type="text" class="form-control" v-model="product.title" />
                    </div>
                    <div class="mb-3">
                        <label for="">Description</label>
                        <input name="description" type="text" class="form-control" v-model="product.description" />
                    </div>
                    <div class="mb-3">
                        <label for="">Price</label>
                        <input name="price" type="text" class="form-control" v-model="product.price" />
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary"> Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
// import { computed, reactive, onMounted, ref } from 'vue';
// import { useRouter, useRoute } from 'vue-router';
// import axios from 'axios';

import productServices from '../../services/product-services';
import { onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';

export default {

    setup() {
        const route = useRoute();
        const router = useRouter();
        const { product, getProduct, editProduct } = productServices();
        onMounted(()=>{
            getProduct(route.params.id)
        })

        const submitForm = async () => {
            await editProduct(route.params.id)
            await router.push({
                name: "Dashboard",
        });
        }

        return {
            product,
            submitForm
        }
    }
}

// export default {
//     setup() {

//         const productValue = reactive({
//             title: '',
//             description: '',
//             price: '',
//         })

//         const router = useRouter();
//         const route = useRoute();

//         const productId = computed(() => route.params.id);

//         onMounted(async () => {
//             getProductById(route.params.id);
//         });

//         let error = ref('');

//         const getProductById = async (productId) => {
//             await axios.get(`http://127.0.0.1:8000/api/products/${productId}`).then(res => {
//                 console.log(res.data.productValue)
//                 // this.productValue = res.data;
//             })
//         }

//         const submitForm = async () => {
//             await axios.put(
//                 'http://127.0.0.1:8000/api/products', productValue, {
//                 headers: {
//                     'Authorization': 'Bearer ' + localStorage.getItem("token")
//                 }
//             }
//             ).then(res => {
//                 router.push("/dashboard")
//             })
//         }

//         return {
//             productValue,
//             submitForm,
//             error,
//             productId
//         }
//     }


// }
</script>
