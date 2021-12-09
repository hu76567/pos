<template>
  <router-view v-if="IsRouterAlive"></router-view>
</template>

<script>
export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      IsRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.IsRouterAlive = false
      this.$nextTick(function () {
        this.IsRouterAlive = true
      })
    }
  }
}
</script>

<style lang="less">
</style>
