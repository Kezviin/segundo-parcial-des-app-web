<template>
  <div class="card h-100 shadow-sm" style="border-top: 3px solid #FF9900;">
    <div class="card-body">
      <span class="badge mb-2" style="background-color: #FF9900; color: #131921;">
        {{ producto.categoria }}
      </span>
      <h6 class="card-title fw-bold">{{ producto.nombre }}</h6>
      <p class="card-text text-success fw-bold">${{ producto.precio.toLocaleString('es-CO') }}</p>
      <p class="card-text small text-muted">Stock: {{ producto.stock }} unidades</p>
    </div>
    <div class="card-footer d-flex gap-2">
      <button class="btn btn-sm btn-warning flex-fill" @click="$emit('editar', producto)">✏️ Editar</button>
      <button class="btn btn-sm btn-danger flex-fill" @click="$emit('eliminar', producto.id)">🗑️ Eliminar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCardComponent',
  props: {
    producto: {
      type: Object,
      required: true
    }
  },
  emits: ['editar', 'eliminar']
}
</script>