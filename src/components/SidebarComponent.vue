<template>
  <div class="d-flex flex-column p-3" style="background-color: #232F3E; min-height: calc(100vh - 56px); width: 220px;">
    <p class="text-uppercase text-muted small fw-bold px-2 mb-2" style="font-size: 11px; color: #FEBD69 !important;">Menú</p>
    <ul class="nav flex-column gap-1">
      <li class="nav-item">
        <router-link to="/dashboard/productos" class="nav-link text-white d-flex align-items-center gap-2" active-class="active-link">
          📦 Productos
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SidebarComponent'
}
</script>

<style scoped>
.nav-link:hover {
  background-color: #FF9900;
  color: #131921 !important;
  border-radius: 6px;
}
.active-link {
  background-color: #FF9900 !important;
  color: #131921 !important;
  border-radius: 6px;
  font-weight: bold;
}
</style>