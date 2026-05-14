<template>
  <div class="d-flex flex-column min-vh-100">
    <NavbarComponent />
    <div class="d-flex flex-grow-1">
      <SidebarComponent />
      <main class="flex-grow-1 p-4" style="background-color: #F3F3F3;">
        <router-view />
      </main>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import SidebarComponent from '../components/SidebarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

export default {
  name: 'DashboardView',
  components: { NavbarComponent, SidebarComponent, FooterComponent }
}
</script>