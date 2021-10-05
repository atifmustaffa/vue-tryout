// Products object
const products = [
  {
    id: 123,
    brand: 'The Good Brand',
    name: 'Socks',
    description: 'This is a desription for socks',
    selectedVariant: 0,
    onSale: true,
    details: ['80% cotton', '20% polyester', 'Gender-neutral'],
    reviews: [],
    variants: [
      {
        id: 1212,
        color: 'green',
        inventory: 0,
        imageLink:
          'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
      },
      {
        id: 1214,
        color: 'blue',
        inventory: 3,
        imageLink:
          'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
      },
    ],
  },
  {
    id: 124,
    brand: 'Canvorse',
    name: 'Shoes',
    description: 'This is the best shoe made bu Canvorse',
    selectedVariant: 0,
    onSale: true,
    details: ['90% cotton', '10% polyester', 'Gender-neutral'],
    reviews: [],
    variants: [
      {
        id: 1215,
        color: 'black',
        inventory: 6,
        imageLink:
          'https://static01.nyt.com/images/2014/10/15/business/15trademark-pic1/15trademark-pic1-articleLarge.jpg',
      },
    ],
  },
]

/* Vue elements starts */

// Product
const productComponent = Vue.component('product', {
  props: ['premium', 'id'],
  template: `
    <div class="product">
        <router-link :to="productLink">Product {{ id }}</router-link>
        <div class="product-image">
          <img :src="image" />
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
          <p v-if="inventory > 0 && inventory <= 5">Low in stock</p>
          <p v-else-if="inventory > 0">In stock</p>
          <p v-else>Out of stock</p>
          <p>Shipping: {{ shipping }}</p>
          <p v-show="product.onSale">On Sale!</p>
          <ul>
            <li v-for="detail in product.details">{{ detail }}</li>
          </ul>
          <ul>
            <li
              v-for="(variant, index) in product.variants"
              :key="variant.id"
              class="color-box"
              :style="{ backgroundColor: variant.color }"
              @mouseover="updateProductSelection(index)"
            ></li>
          </ul>
          <button
            v-on:click="addToCart"
            :disabled="inventory === 0"
            :class="{ disabledButton: inventory === 0 }"
          >
            Add to Cart
          </button>
        </div>

        <div>
          <h2>Reviews</h2>
          <p v-if="product.reviews.length === 0">There are no reviews yet.</p>
          <ul>
            <li v-for="review in product.reviews">
              <p>{{ review.name }}</p>
              <p>{{ review.review }}</p>
              <p>Rating: {{ review.rating }}</p>
            </li>
          </ul>

        <product-review @review-submitted="addReview"></product-review>
      </div>
      </div>
      `,
  methods: {
    addToCart: function () {
      this.$emit(
        'add-to-cart',
        this.product.variants[this.product.selectedVariant].id
      )
    },
    updateProductSelection: function (index) {
      this.product.selectedVariant = index
    },
    addReview: function (productReview) {
      this.product.reviews.push(productReview)
    },
  },
  computed: {
    product: function () {
      return products.find((p) => p.id === +this.id) // Cast to number for id passed from route params
    },
    productLink: function () {
      if (this.$route.params.id) return this.$route.path
      else return this.$route.path + '/' + this.id
    },
    title: function () {
      return this.product.brand + ' ' + this.product.name
    },
    image: function () {
      return this.product.variants[this.product.selectedVariant].imageLink
    },
    inventory: function () {
      return this.product.variants[this.product.selectedVariant].inventory
    },
    shipping: function () {
      return this.premium ? 'Free' : 2.99
    },
  },
})

// Product review compoent
Vue.component('product-review', {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">

  <p v-if="errors.length">
    <b>Please correct the following erros:</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>
  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name">
  </p>
  <p>
    <label for="review">Review:</label>
    <textarea id="name" v-model="review"></textarea>
  </p>
  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option> 
    </select>
  </p>
  <button type="submit">Submit</button>
  </form>
  `,
  data: function () {
    return {
      name: null,
      review: null,
      rating: null,
      errors: [],
    }
  },
  methods: {
    onSubmit: function () {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
        }
        this.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
      } else {
        this.errors = []
        if (!this.name) this.errors.push('Name is required')
        if (!this.review) this.errors.push('Review is required')
        if (!this.rating) this.errors.push('Rating is required')
      }
    },
  },
})

const home = {
  template: `
  <div>Home</div>
  `,
}

const productsComponent = {
  template: `
  <div>
    <div class="cart">
      <p>Cart ({{ cart.length }})</p>
    </div>
    
    <product v-for="product in products" v-bind:id="product.id"
    v-bind:key="product.id" :premium="premium" @add-to-cart="updateCart"></product>
  </div>
  `,
  data() {
    return {
      cart: [],
      products,
      premium: true,
    }
  },
  methods: {
    updateCart: function (id) {
      this.cart.push(id)
    },
  },
}

const routes = [
  {
    path: '/home',
    components: {
      default: home,
      // Named views
      a: {
        template: `<div>View A</div>`,
      },
      b: {
        template: `<div>View B</div>`,
      },
    },
  },
  {
    path: '/products',
    component: productsComponent,
  },
  {
    path: '/products/:id',
    component: productComponent,
    props: true,
  },
  {
    path: '/error',
    component: {
      template: `<div>Error 404:Not found</div>`,
    },
  },
  {
    path: '*',
    redirect: '/error',
  },
]

const router = new VueRouter({
  routes,
})

// Similar to router-link :to
// setTimeout(() => {
//   router.push({ path: 'home' })
// }, 3000)

var app = new Vue({
  i18n,
  el: '#app',
  data: {},
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
  },
  router,
  computed: {
    username() {
      return this.$route.query.username
    },
  },
  watch: {
    $route(to, from) {
      // console.log(to, from)
    },
  },
})
