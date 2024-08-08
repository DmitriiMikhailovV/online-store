<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/catalog">Catalog</router-link>
    </nav>
    <router-view class="content" />
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.content {
  height: 100vh;
  padding-top: 35px;
}

nav {
  height: 35px;
  position: fixed;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
