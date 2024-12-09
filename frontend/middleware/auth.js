// middleware/auth.js
export default function ({ store, redirect }) {
    // Check if the token is present in the store
    if (!store.state.token) {
      return redirect('/login'); // Redirect to the login page if not authenticated
    }
  }
  