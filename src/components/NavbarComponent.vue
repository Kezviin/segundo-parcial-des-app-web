<template>
  <nav class="navbar navbar-expand-lg navbar-dark px-4" style="background-color: #131921;">
    <span class="navbar-brand fw-bold fs-4" style="color: #FF9900;">
      🛒 Take-Fast
    </span>
    <div class="ms-auto d-flex align-items-center gap-3">
      <span class="text-white small">👤 Admin</span>
      <button
        class="btn btn-sm fw-bold"
        style="background-color: #FF9900; color: #131921;"
        @click="cerrarSesion"
      >
        Cerrar Sesión
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
  methods: {
    cerrarSesion() {
      localStorage.removeItem('usuarioLogueado')
      this.$router.push('/login')
    }
  }
}
</script>