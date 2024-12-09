export const state = () => ({
    user: null,
    token: null,
  })
  
  export const mutations = {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  }
  
  export const actions = {
    async login({ commit }, payload) {
      try {
        const res = await fetch(`${process.env.API_BASE_AUTH}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(await res.text());
        const { token } = await res.json();
        commit('setToken', token);
        return token;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async register({ dispatch }, payload) {
      try {
        const res = await fetch(`${process.env.API_BASE_AUTH}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(await res.text());
        await dispatch('login', payload);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  }
  