<template>
  <div>
    <Banner />
    <About />
    <Environment />
    <Contact />
    <Footer />
  </div>
</template>
<script>
import Banner from "@/components/web/Banner.vue";
import About from "@/components/web/About.vue";
import Environment from "@/components/web/Environment.vue";
import Contact from "@/components/web/Contact.vue";
import Footer from "@/components/web/Footer.vue";
export default {
  auth: false,
  layout: "web",
  components: {
    Banner,
    Contact,
    Footer,
    About,
    Environment
  },

  mounted() {}
};
</script>

<style lang="css">
</style>
