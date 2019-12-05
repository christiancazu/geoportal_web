<template>
<el-button
  :type="type"
  :icon="icon"
  :disabled="disabled"
  size="small"
  :circle="!btnName"
  @click="open"
>
  <template v-if="btnName">{{ btnName }}</template>
</el-button>
</template>

<script>
export default {
  props: {
    accion: { type: String, default: 'deleted' },
    title: { type: String, default: '' },
    bodyText: { type: String, default: '' },
    itemSelected: { type: Object, default: null },
    disabled: { type: Boolean, default: false },
    input: { type: Boolean, default: false },
    inputType: { type: String, default: 'text' },
    inputPlaceholder: { type: String, default: 'Message' },
    btnName: { type: String, default: null },
  },

  data () {
    return {
      valueInput: ''
    }
  },

  computed: {
    type () {
      if (this.accion === 'deleted' || this.accion === 'rejected') {
        return 'danger'
      } else if (this.accion === 'accepted' || this.accion === 'shared') {
        return 'success'
      } else {
        return 'info'
      }
    },

    icon () {
      switch (this.accion) {
      case 'deleted':
        return 'el-icon-delete'
      case 'accepted':
        return 'el-icon-check'
      case 'rejected':
        return 'el-icon-close'
      case 'shared':
        return 'el-icon-share'
      default:
        return 'el-icon-info'
      }
    },

    typeConfirm () {
      if (this.accion === 'deleted' || this.accion === 'rejected') {
        return 'error'
      } else if (this.accion === 'accepted') {
        return 'success'
      } else {
        return 'info'
      }
    }
  },

  methods: {
    open () {
      this.$confirm(this.bodyText, this.title, {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Si, estoy seguro',
        cancelButtonText: 'Cancelar',
        type: this.typeConfirm,
        center: true,
        showInput: this.input,
        inputType: this.inputType,
        inputPlaceholder: this.inputPlaceholder,
        inputValue: this.valueInput,
        closeOnClickModal: false
      })
        .then((value) => {
          const data = {
            itemSelected: this.itemSelected,
            inputValue: value
          }
          this.$emit('confirmed-action', data)
        })
    }
  }
}
</script>
