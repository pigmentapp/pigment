<template>
  <div
    id="app"
  >
    <div class="nav">
      <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </div>
    <router-view
      name="aside"
      class="aside"
    />
    <router-view
      name="header"
      class="header"
    />
    <router-view class="main" />
  </div>
</template>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
#app {
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto 1fr;
  grid-gap: 0;
  grid-template-areas:
    "Window Header"
    "Aside Main"
  ;
}

.nav {
  position: relative;
  display: flex;
  flex-direction: column;
  grid-area: Window;
}

.header {
  position: relative;
  display: flex;
  flex-direction: column;
  grid-area: Header;
}

.aside {
  position: relative;
  display: flex;
  flex-direction: column;
  grid-area: Aside;
}

.main {
  position: relative;
  display: flex;
  flex-direction: column;
  grid-area: Main;
}
</style>
