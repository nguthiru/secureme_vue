<template>
  <div class="home">
    <!-- <div class="video-container">
      
      <video  autoplay loop muted>

        <source src="@/assets/videos/home-video.mp4">
      </video>
    </div> -->

    <div class="hero-content">
      <h1>Welcome To <span> Secureme </span></h1>
      <p>Secureme is a web application that provides a platform for the police department to manage and analyze crime data.</p>
      <router-link :to="{ name: 'login' }">
      <button class="primary-btn">Get Started</button>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  }
}
</script>
