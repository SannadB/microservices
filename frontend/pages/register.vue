<template>
  <form @submit.prevent="register">
    <input v-model="name" type="text" placeholder="Name" required />
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Register</button>
  </form>
</template>

<script>
export default {
  data() {
    return { name: '', email: '', password: '' };
  },
  methods: {
    async register() {
      try {
        await this.$store.dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.$toast.success('Registered successfully!');
        this.$router.push('/');
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>
<style scoped>
/* Form container */
form {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

/* Input fields */
input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

/* Button */
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

/* Form spacing and alignment */
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: stretch;
}

/* Responsive design */
@media (max-width: 480px) {
  form {
    padding: 15px;
  }
  input,
  button {
    font-size: 14px;
  }
}
</style>

