<template>
    <div v-if="isShow">
      <div class="toast  align-items-center text-black bg-info border-0 mar-toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="d-flex">
    <div class="toast-body">
      {{comp | capitalize}} {{op | capitalize}} Successfully
    </div>
    <button type="button" class="btn-close btn-close-black me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" @click="dismisstoast"></button>
  </div>
</div>
    </div>
</template>

<script>

export default {
  name: 'notification',
  props: {
    comp : String,
    op: String
  },
  data() {
    return {
      isShow: true
    }
  },
  methods: {
    dismisstoast() {
      this.isShow = false;
    }
  },
}
</script>


<style scoped>
::v-deep .toast:not(.showing):not(.show) {
    opacity: 1;
}
.mar-toast {
  margin: auto;
}
</style>

