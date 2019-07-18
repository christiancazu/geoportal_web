<template>
  <div class="website-geoportal">
    <Banner />
    <div class="container text-xs-center">
      <h2>¿QUIENES SOMOS?</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sapiente soluta tenetur obcaecati consequuntur repellat libero, saepe et accusamus culpa distinctio impedit quibusdam illo ullam veniam veritatis voluptatibus provident adipisci.
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto ipsam culpa ipsa accusamus atque sequi necessitatibus reiciendis similique. Repellat asperiores, fugit nisi unde fuga numquam quos quia dolore sint. Explicabo?
      </p>
      <div>

      </div>
    </div>
    <div class="container">
      <h2 class="text-xs-center">COMPONENTES</h2>
      <div>

      </div>
    </div>
    <div class="theme-purple-pink">
      <Contact />
    </div>
    <Footer />

  </div>
</template>
<script>
import Banner from '@/components/web/Banner.vue'
import Contact from '@/components/web/Contact.vue'
import Footer from '@/components/web/Footer.vue'
export default {
  auth: false,
  components: {
    Banner,
    Contact,
    Footer
  },

  mounted () { }
};
</script>

<style lang="css" scoped>
</style>
