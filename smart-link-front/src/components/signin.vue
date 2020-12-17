<template class="row d-flex flex-column justify-content-center">
  <div class="row justify-content-center">
    <div class="col-lg-6 col-12">
      <h4>Welcome to</h4>
      <h3><strong>Smart Links Generator</strong></h3>
      <form @submit.prevent="signin">
        <div class="text-red" v-if="error">{{ error }}</div>

        <div class="form-group d-flex flex-column align-items-start">
          <label for="email" class="form-group mb-0">E-mail</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
        </div>

        <div class="form-group d-flex flex-column align-items-start">
          <label for="password" class="form-group mb-0">Password</label>
          <input type="password" class="form-control" id="password" aria-describedby="emailHelp" placeholder="Enter Password">
        </div>

        <button type="submit" class="btn btn-outline-success btn-lg btn-block">Sign In</button>

        <div>
          <router-link to="/signup" class="blockquote-footer" style="text-align: start;">Sign Up</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  created() {
    this.checkSignedIn();
  },
  updated() {
    this.checkSignedIn();
  },
  methods: {
    signin() {
      this.$http.plain.post('/signin');
    },
  },
};
</script>
