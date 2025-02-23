<template>
  <form @submit.prevent="handleSubmit">
    <label>Address:</label>
    <input v-model="property.PropertyAddress" type="text" required placeholder="Street, Building, Lot No." />

    <label>Country:</label>
    <input v-model="property.PropertyCountry" type="text" readonly />

    <label>Region:</label>
    <input v-model="property.PropertyRegion" type="text" required placeholder="e.g., NCR, Fourth District" />

    <label>City:</label>
    <input v-model="property.PropertyCity" type="text" required placeholder="e.g., Makati City" />

    <label>Barangay:</label>
    <input v-model="property.PropertyBarangay" type="text" required placeholder="e.g., Magallanes" />

    <label>Village Name:</label>
    <input v-model="property.PropertyVillageName" type="text" placeholder="e.g., Paseo de Magallanes" />

    <label>Condo Name:</label>
    <input v-model="property.PropertyCondoName" type="text" placeholder="e.g., Galeria de Magallanes" />

    <button type="submit">Submit</button> <!-- Optional: Only if submission is needed -->
  </form>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    modelValue: Object, // Enables v-model binding in parent components
  },
  emits: ["update:modelValue", "submit"],

  setup(props, { emit }) {
    const property = ref({
      PropertyAddress: props.modelValue?.PropertyAddress || "",
      PropertyCountry: props.modelValue?.PropertyCountry || "Philippines",
      PropertyRegion: props.modelValue?.PropertyRegion || "",
      PropertyCity: props.modelValue?.PropertyCity || "",
      PropertyBarangay: props.modelValue?.PropertyBarangay || "",
      PropertyVillageName: props.modelValue?.PropertyVillageName || "",
      PropertyCondoName: props.modelValue?.PropertyCondoName || "",
    });

    // Watch for changes and emit a cloned object to prevent reference issues
    watch(property, (newProperty) => {
      emit("update:modelValue", { ...newProperty });
    }, { deep: true });

    // Handle form submission (optional)
    const handleSubmit = () => {
      emit("submit", property.value);
    };

    return { property, handleSubmit };
  },
};
</script>
