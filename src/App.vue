<template>
  <div
    id="app"
  >
    <div class="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view
      name="aside"
      class="aside"
    />
    <div class="header">
      <router-view
        name="header"
        class="flex-grow"
      />
      <window-controls />
    </div>
    <router-view class="main" />
  </div>
</template>

<script>
import WindowControls from '@/components/WindowControls.vue';

export default {
  components: {
    WindowControls,
  },
};
</script>


<style lang="postcss" scoped>
#app {
  @apply text-grey bg-black select-none;

  display: grid;
  height: 100vh;
  grid-template-columns: auto 3fr;
  grid-template-rows: auto 1fr;
  grid-gap: 0;
  grid-template-areas:
    "Window Header"
    "Aside Main"
  ;
}

.nav {
  @apply relative flex;
  grid-area: Window;
}

.header {
  @apply relative flex;
  grid-area: Header;
}

.nav,
.header {
  @apply text-grey-dark;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-app-region: drag;
}

.nav > *,
.header > * {
  -webkit-app-region: no-drag;
}

.aside {
  @apply relative flex flex-col w-64;
  grid-area: Aside;
}

.main {
  @apply relative z-10 flex flex-col;
  grid-area: Main;
}
</style>
