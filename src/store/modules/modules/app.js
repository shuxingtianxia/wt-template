import cookies from '@/libs/util.cookies'
export default {
  namespaced: true,
  state: {
    language: cookies.get('lang')
  },
  mutations: {
  }
}
