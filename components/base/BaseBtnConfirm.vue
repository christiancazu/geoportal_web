<template>
  <el-button :type="type" :icon="icon" size="small" circle @click="open" />
</template>

<script>
export default {
  props: {
    accion: {
      type: String,
      default: "deleted"
    },
    title: {
      type: String,
      default: ""
    },
    bodyText: {
      type: String,
      default: ""
    },
    itemSelected: {
      type: Object,
      default: null
    }
  },

  computed: {
    type: function() {
      if (this.accion === "deleted" || this.accion === "rejected") {
        return "danger";
      } else if (this.accion === "accepted") {
        return "success";
      } else {
        return "info";
      }
    },
    icon: function() {
      if (this.accion === "deleted") {
        return "el-icon-delete";
      } else if (this.accion === "accepted") {
        return "el-icon-check";
      } else if (this.accion === "rejected") {
        return "el-icon-close";
      } else {
        return "el-icon-info";
      }
    },
    typeConfirm: function() {
      if (this.accion === "deleted" || this.accion === "rejected") {
        return "error";
      } else if (this.accion === "accepted") {
        return "success";
      } else {
        return "info";
      }
    }
  },

  mounted() {
    // console.log(this.$break);
  },

  methods: {
    open() {
      this.$confirm(this.bodyText, this.title, {
        distinguishCancelAndClose: true,
        confirmButtonText: "Si, estoy seguro",
        cancelButtonText: "Cancelar",
        type: this.typeConfirm,
      })
        .then(() => {
          this.$emit("confirmed-action", this.itemSelected);
        })
        .catch(() => {
          //
        });
    }
  }
};
</script>
<style lang="scss">

</style>
