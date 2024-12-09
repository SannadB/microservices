<template>
  <div>
    <h1>Products</h1>
    <div v-if="!products.length">No products available.</div>
    <ul>
      <li v-for="product in products" :key="product.id">
        <h2>{{ product.name }}</h2>
        <img 
          v-if="product.image?.url" 
          :src="getImageUrl(product.image.url)" 
          :alt="product.name" 
        />
        <button @click="placeOrder(product)">Buy</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  middleware: 'auth', // Apply the auth middleware here
  data() {
    return { products: [] };
  },
  async mounted() {
    try {
      const res = await fetch(process.env.API_BASE_PRODUCTS);
      const data = await res.json();
      this.products = data.data;
      console.log(this.products)
    } catch (error) {
      this.$toast.error('Failed to load products.');
    }
  },
  methods: {
    async placeOrder(product) {
      if (!this.$store.state.token) {
        return this.$toast.error('Please login first.');
      }
      try {
        const res = await fetch(`${process.env.API_BASE_ORDERS}/place`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.$store.state.token}`,
          },
          body: JSON.stringify({ product: product.name, quantity: 1 }),
        });
        if (!res.ok) throw new Error(await res.text());
        this.$toast.success('Order placed successfully!');
      } catch (error) {
        this.$toast.error('Failed to place order.');
      }
    },
    getImageUrl(imageData) {
      return `http://localhost:1337${imageData}`;
    },
  },
};
</script>
<style scoped>
/* Page container */
div {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

/* Heading */
h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #007bff;
}

/* Product list */
ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* Product items */
li {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

li:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

/* Product title */
h2 {
  font-size: 18px;
  margin: 10px 0;
  color: #333;
}

/* Product image */
img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin: 10px 0;
}

/* Button */
button {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

/* No products message */
div > div {
  text-align: center;
  margin: 20px 0;
  font-size: 16px;
  color: #666;
}

/* Responsive design */
@media (max-width: 768px) {
  li {
    padding: 10px;
  }
  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 16px;
  }
}
</style>
