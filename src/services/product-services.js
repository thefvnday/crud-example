import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default function productServices() {
  const products = ref([]);
  const product = ref([]);
  const router = useRouter();
  const errors = ref("");


  const getProducts = async () => {
    let response = await axios.get("http://127.0.0.1:8000/api/products");
    products.value = response.data.products;
  };

  const getProduct = async (id) => {
    let response = await axios.get('http://127.0.0.1:8000/api/products/'+id);
    console.log(response.data.product);
    product.value = response.data.product;
  };

  const addProduct = async () => {
    await axios.post(
        'http://127.0.0.1:8000/api/products', product, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    }).then(() =>{
        router.push("/dashboard")
    })
}

  const editProduct = async (id) => {
    console.log(id)
    console.log(product.value)
    errors.value=''
    await axios.put(`http://127.0.0.1:8000/api/products/${id}`,product.value, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
  };

  const destroyProduct = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/products/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
    });
  };

  return {
    product,
    products,
    errors,
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    destroyProduct,
  };
}
