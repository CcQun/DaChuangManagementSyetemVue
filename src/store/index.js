import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// const store = new Vuex.Store({
//   state: {
//     token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
//   },
//   mutations: {
//     setToken (state,token) {
//       state.token =token;
//       localStorage.setItem("token",token.token);
//     },
//     delToken (state) {
//       state.token = '';
//       localStorage.removeItem("token");
//     }
//   }
// })


// 首先声明一个状态 state
const state = {
  msg: ''
}
// 然后给 actions 注册一个事件处理函数，当这个函数被触发时，将状态提交到 mutaions中处理
const actions = {
  saveName({commit}, msg) {
    commit('saveMsg', msg)    // 提交到mutations中处理
  }
}
// 更新状态
const mutations = {
  saveMsg(state, msg) {
    state.msg = msg;
  }
}
// 获取状态信息
const getter = {
  showState(state) {
    console.log(state.msg)
  }
}


// 下面这个相当关键了，所有模块，记住是所有，注册才能使用
export default new Vuex.Store({
  // store,
  state,
  getter,
  mutations,
  actions
})




// export default store;


