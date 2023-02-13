<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4>
                    <RouterLink to="/product/create" class="btn btn-primary float-start">
                        Add Product
                    </RouterLink>
                    <button type="button" class="btn btn-danger float-end" @click="logout">Logout</button>
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in this.products" :key="index">
                            <td>{{ product.id }}</td>
                            <td>{{ product.title }}</td>
                            <td>{{ product.description }}</td>
                            <td>{{ product.price }}</td>
                            <td>
                                <RouterLink :to="{ name: 'EditProduct', params: { id: product.id } }"
                                    class="btn btn-primary float-end">
                                    Edit</RouterLink>
                            </td>
                            <td>
                                <button class="btn btn-danger float-end"
                                    @click="deleteProduct(product.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import productServices from '../../services/product-services';
import store from "../../store";
export default {

    setup() {
        const router = useRouter();
        
        const { products, getProducts, destroyProduct } = productServices();
        onMounted(
            getProducts,
        )

        const deleteProduct = async (id) => {
            if (!window.confirm("Are you sure ?")) {
                return
            }
            await destroyProduct(id);
            await getProducts();
        }
        const logout = async () => {
            store.dispatch('removeToken')
            router.push('/login')
        };
        return {
            products,
            logout,
            deleteProduct
        }
    }

}
</script>

<style>

</style>