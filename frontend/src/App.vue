<template>
  <div>
    <div class="app-headings">Weather Report</div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
.app-headings {
  color:white;
  background-color:  #4A4090;
  /* padding:8px; */
  padding: 16px 8px;
  text-align: center;
  font-family: "Times New Roman";
  font-size:30px;
  margin-bottom: 40px;
}
@media (max-width: 425px) {
  .app-headings {
    display: block;
  }
}
</style>
