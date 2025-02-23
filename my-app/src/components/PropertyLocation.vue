<template>
  <form>
    <label>Address:</label>
    <input v-model="property.property_address" type="text" required placeholder="Street, Building, Lot No." @input="emitPropertyData" />

    <label>Country:</label>
    <input v-model="property.property_country" type="text" readonly />

    <label>Region:</label>
    <input v-model="property.property_region" type="text" required placeholder="e.g., NCR, Fourth District" @input="emitPropertyData" />

    <label>City:</label>
    <input v-model="property.property_city" type="text" required placeholder="e.g., Makati City" @input="emitPropertyData" />

    <label>Barangay:</label>
    <input v-model="property.property_barangay" type="text" required placeholder="e.g., Magallanes" @input="emitPropertyData" />

    <label>Village Name:</label>
    <input v-model="property.property_village_name" type="text" placeholder="e.g., Paseo de Magallanes" @input="emitPropertyData" />

    <label>Condo Name:</label>
    <input v-model="property.property_condo_name" type="text" placeholder="e.g., Galeria de Magallanes" @input="emitPropertyData" />
  </form>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    modelValue: Object, // Enables v-model binding in parent components
  },
  emits: ["update:data"],

  setup(props, { emit }) {
    const property = ref({
      property_address: props.modelValue?.property_address || "",
      property_country: props.modelValue?.property_country || "Philippines",
      property_region: props.modelValue?.property_region || "",
      property_city: props.modelValue?.property_city || "",
      property_barangay: props.modelValue?.property_barangay || "",
      property_village_name: props.modelValue?.property_village_name || "",
      property_condo_name: props.modelValue?.property_condo_name || "",
    });

    // Emit changes when data updates
    const emitPropertyData = () => {
      emit("update:data", { ...property.value });
    };

    // Watch for deep changes and emit updates
    watch(property, emitPropertyData, { deep: true });

    return { property, emitPropertyData };
  },
};
</script>
