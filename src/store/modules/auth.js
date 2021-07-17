export const auth = {
  namespaced: true, //getters, mutations, actions 에 모듈명을 넣게 함 ['모듈명/이름']
  state: {
    user: {},
  },
  getters: {
    //getUser: (state) => state.user.id,
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    },
  },
};
