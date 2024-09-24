<script setup lang="ts">
//import { RouterLink, RouterView } from 'vue-router'
//import HelloWorld from './components/HelloWorld.vue'
import KanbanBoard from './components/KanbanBoard.vue'; // Import your KanbanBoard component
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->
  <kanban-board></kanban-board>
</template>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

v-container {
  width: 100%;
  height: 100%;
}

kanban-board {
  width: 100%;
  height: 100%;
}
</style>
