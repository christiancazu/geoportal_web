<template>
  <div class="website-geoportal">
    <el-header
      height="76px"
      class="px-0 theme-purple-pink "
    >
      <NavBar />
    </el-header>
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
    <Components />

    <div class="theme-purple-pink">
      <Contact />
    </div>
    <Footer />

  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import Banner from '@/components/web/Banner.vue'
import Components from '@/components/web/Components.vue'
import Contact from '@/components/web/Contact.vue'
import Footer from '@/components/web/Footer.vue'
export default {
  auth: false,
  components: {
    NavBar,
    Banner,
    Contact,
    Footer,
    Components
  },

  mounted () { }
};
</script>

<style lang="css" scoped>
</style>
