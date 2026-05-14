<template>
  <div>
    <!-- Encabezado -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold mb-0">📦 Gestión de Productos</h4>
      <button
        v-if="esAdmin"
        class="btn fw-bold"
        style="background-color: #FF9900; color: #131921;"
        @click="abrirModalAgregar"
      >
        + Agregar Producto
      </button>
    </div>

    <!-- Tabla -->
    <div class="card shadow-sm mb-5">
      <div class="card-body p-0">
        <table class="table table-hover mb-0">
          <thead style="background-color: #232F3E; color: white;">
            <tr>
              <th class="py-3 px-4">#</th>
              <th class="py-3">Nombre</th>
              <th class="py-3">Categoría</th>
              <th class="py-3">Precio</th>
              <th class="py-3">Stock</th>
              <th class="py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(producto, index) in productos" :key="producto.id">
              <td class="px-4 py-3">{{ index + 1 }}</td>
              <td class="py-3 fw-semibold">{{ producto.nombre }}</td>
              <td class="py-3">
                <span class="badge" style="background-color: #FF9900; color: #131921;">
                  {{ producto.categoria }}
                </span>
              </td>
              <td class="py-3 text-success fw-bold">${{ producto.precio.toLocaleString('es-CO') }}</td>
              <td class="py-3">{{ producto.stock }}</td>
              <td class="py-3 text-center">
                <button v-if="esAdmin" class="btn btn-sm btn-warning me-2" @click="abrirModalEditar(producto)">✏️ Editar</button>
                <button v-if="esAdmin" class="btn btn-sm btn-danger" @click="eliminarProducto(producto.id)">🗑️ Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Cards -->
    <h5 class="fw-bold mb-3">Vista en Tarjetas</h5>
    <div class="row row-cols-1 row-cols-md-4 g-3">
      <div class="col" v-for="producto in productos" :key="'card-' + producto.id">
        <ProductCardComponent
          :producto="producto"
          @editar="abrirModalEditar"
          @eliminar="eliminarProducto"
        />
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="cerrarModal">
      <div class="card shadow-lg" style="width: 480px; border-top: 4px solid #FF9900;">
        <div class="card-header d-flex justify-content-between align-items-center" style="background-color: #131921; color: white;">
          <h5 class="mb-0">{{ modoEdicion ? '✏️ Editar Producto' : '➕ Agregar Producto' }}</h5>
          <button class="btn-close btn-close-white" @click="cerrarModal"></button>
        </div>
        <div class="card-body p-4">
          <div class="mb-3">
            <label class="form-label fw-semibold">Nombre del Producto</label>
            <input type="text" class="form-control" v-model="form.nombre" placeholder="Ej: Mouse Gamer" />
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Categoría</label>
            <select class="form-select" v-model="form.categoria">
              <option value="">Selecciona una categoría</option>
              <option>Gamer</option>
              <option>Electrodomésticos</option>
              <option>Aseo</option>
              <option>Deportes</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Precio (COP)</label>
            <input type="number" class="form-control" v-model="form.precio" placeholder="Ej: 150000" />
          </div>
          <div class="mb-4">
            <label class="form-label fw-semibold">Stock</label>
            <input type="number" class="form-control" v-model="form.stock" placeholder="Ej: 10" />
          </div>

          <div v-if="errorModal" class="alert alert-danger py-2 small">⚠️ {{ errorModal }}</div>

          <div class="d-flex gap-2">
            <button
              class="btn flex-fill fw-bold"
              style="background-color: #FF9900; color: #131921;"
              @click="guardarProducto"
            >
              {{ modoEdicion ? 'Guardar Cambios' : 'Agregar Producto' }}
            </button>
            <button class="btn btn-secondary flex-fill" @click="cerrarModal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productosJson from '../data/products.json'
import ProductCardComponent from '../components/ProductCardComponent.vue'

export default {
  name: 'ProductView',
  components: { ProductCardComponent },
  data() {
  return {
    productos: [],
    showModal: false,
    modoEdicion: false,
    errorModal: '',
    esAdmin: localStorage.getItem('rolUsuario') === 'admin',
    form: { id: null, nombre: '', categoria: '', precio: '', stock: '' }
  }
},
  mounted() {
    // Carga desde LocalStorage; si no hay nada, carga desde el JSON
    const guardados = localStorage.getItem('productos')
    if (guardados) {
      this.productos = JSON.parse(guardados)
    } else {
      this.productos = productosJson
      this.guardarEnLocalStorage()
    }
  },
  methods: {
    guardarEnLocalStorage() {
      localStorage.setItem('productos', JSON.stringify(this.productos))
    },
    abrirModalAgregar() {
      this.modoEdicion = false
      this.errorModal = ''
      this.form = { id: null, nombre: '', categoria: '', precio: '', stock: '' }
      this.showModal = true
    },
    abrirModalEditar(producto) {
      this.modoEdicion = true
      this.errorModal = ''
      this.form = { ...producto }
      this.showModal = true
    },
    cerrarModal() {
      this.showModal = false
    },
    guardarProducto() {
      if (!this.form.nombre || !this.form.categoria || !this.form.precio || !this.form.stock) {
        this.errorModal = 'Todos los campos son obligatorios.'
        return
      }
      if (this.modoEdicion) {
        const index = this.productos.findIndex(p => p.id === this.form.id)
        if (index !== -1) {
          this.productos[index] = {
            ...this.form,
            precio: Number(this.form.precio),
            stock: Number(this.form.stock)
          }
        }
      } else {
        const nuevoId = this.productos.length > 0
          ? Math.max(...this.productos.map(p => p.id)) + 1
          : 1
        this.productos.push({
          id: nuevoId,
          nombre: this.form.nombre,
          categoria: this.form.categoria,
          precio: Number(this.form.precio),
          stock: Number(this.form.stock)
        })
      }
      this.guardarEnLocalStorage()
      this.cerrarModal()
    },
    eliminarProducto(id) {
      if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        this.productos = this.productos.filter(p => p.id !== id)
        this.guardarEnLocalStorage()
      }
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
</style>