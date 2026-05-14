<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center" style="background-color: #131921;">
    <div class="card shadow-lg" style="width: 390px; border-top: 4px solid #FF9900;">
      <div class="card-body p-4">

        <!-- Logo -->
        <div class="text-center mb-4">
          <h2 class="fw-bold" style="color: #FF9900;">🛒 TiendaMax</h2>
          <p class="text-muted small">Sistema de gestión de inventario</p>
        </div>

        <!-- Alerta de error -->
        <div v-if="error" class="alert alert-danger alert-dismissible" role="alert">
          ⚠️ {{ error }}
          <button type="button" class="btn-close" @click="error = ''"></button>
        </div>

        <!-- Campos -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Usuario</label>
          <input
            type="text"
            class="form-control"
            v-model="usuario"
            placeholder="Ingresa tu usuario"
            @keyup.enter="iniciarSesion"
          />
        </div>
        <div class="mb-4">
          <label class="form-label fw-semibold">Contraseña</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Ingresa tu contraseña"
            @keyup.enter="iniciarSesion"
          />
        </div>

        <button
          class="btn w-100 fw-bold"
          style="background-color: #FF9900; color: #131921;"
          @click="iniciarSesion"
        >
          Iniciar Sesión
        </button>

        <p class="text-muted text-center mt-3" style="font-size: 11px;">
          ⚠️ Esta validación es solo educativa y no representa un sistema de autenticación real.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import usuarios from '../data/usuarios.json'

export default {
  name: 'LoginView',
  data() {
    return {
      usuario: '',
      password: '',
      error: ''
    }
  },
  methods: {
    iniciarSesion() {
      if (!this.usuario || !this.password) {
        this.error = 'Por favor completa todos los campos.'
        return
      }
      const encontrado = usuarios.find(
        u => u.usuario === this.usuario && u.password === this.password
      )
      if (encontrado) {
        localStorage.setItem('usuarioLogueado', encontrado.usuario)
        localStorage.setItem('rolUsuario', encontrado.rol)
        this.$router.push(encontrado.rol === 'admin' ? '/dashboard' : '/tienda')
      } else {
        this.error = 'Usuario o contraseña incorrectos. Intenta de nuevo.'
      }
    }
  }
}
</script>