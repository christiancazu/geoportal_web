<template>
  <div class="container contact text-xs-center">
    <h2 class="pt-5 ma-0">CONTACTO</h2>
    <el-row class="py-4">
      <el-col
        :xs="24"
        :sm="12"
      >
        <ul class="pl-0">
          <li>
            <i class="el-icon-location-information"></i>
            <span>Avenida #502</span>
          </li>
          <li>
            <i class="el-icon-phone-outline">
            </i>
            <span>054 7896455</span>
          </li>
          <li>
            <i class="el-icon-message">
            </i>
            <span>info@geoportal.com.pe</span>
          </li>
        </ul>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        class="text-xs-center"
      >
        <div
          class="hover-remove mt-1"
          @click="$router.push('/')"
        >
          <img
            class="el-menu-item"
            src="/image/unat_blanco.png"
            style="max-height:100%;"
            alt=""
          >
        </div>
        <ul class="flat-socials pl-0">
          <li class="facebook">
            <i class="fa fa-facebook"></i>
          </li>
          <li class="twitter">
            <i class="fa fa-twitter"></i>
          </li>
          <li class="google-plus">
            <i class="fa fa-google-plus"></i>
          </li>
          <li class="linkedin">
            <i class="fa fa-linkedin"></i>
          </li>
          <li class="youtube">
            <i class="fa fa-youtube-play"></i>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<style>
</style>