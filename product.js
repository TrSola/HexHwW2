const { createApp } = Vue;

createApp({
  data() {
    return {
      APIUrl: "https://ec-course-api.hexschool.io/v2",
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    seeDetails(product) {
      this.tempProduct = product;
    },
    checkLogin() {
      axios
        .post(`${this.APIUrl}/api/user/check`)
        .then((res) => this.getData())
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "index.html";
        });
    },
    getData() {
      axios
        .get(`${this.APIUrl}/api/aca101139/admin/products`)
        .then((res) => (this.products = res.data.products))
        .catch((err) => alert(err.response.data.message));
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;

    this.checkLogin();
  },
}).mount("#app");
