<template>
    <div>
        <span class="close-icon">
      <font-awesome-icon icon="times" @click="goBack" />
    </span>
    <div class="container">
        <p class="nothing">This {{whatToAdd}} is not present please add.</p>
    </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            whatToAdd: '',
        }
    },
    methods : {
        goBack() {

                this.$router.push({
                    name: 'home',
                })
        }
    },
    created() {
        this.whatToAdd = this.$route.params.comp;
    }
}
</script>

<style scoped>
.nothing {
    color: red;
    text-align: center;
}
</style>