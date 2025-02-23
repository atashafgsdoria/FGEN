<template>
  <form>
    <label>Address:</label>
    <input v-model="property.PropertyAddress" type="text" required placeholder="3 Humabon, Kalakhang Maynila" />

    <label>Country:</label>
    <input v-model="property.PropertyCountry" type="text" required disabled />

    <label>Region:</label>
    <input v-model="property.PropertyRegion" type="text" required placeholder="NCR, Fourth District" />

    <label>City:</label>
    <input v-model="property.PropertyCity" type="text" required placeholder="Makati City" />

    <label>Barangay:</label>
    <input v-model="property.PropertyBarangay" type="text" required placeholder="Magallanes" />

    <label>Village Name:</label>
    <input v-model="property.PropertyVillageName" type="text" placeholder="Paseo de Magallanes" />

    <label>Condo Name:</label>
    <input v-model="property.PropertyCondoName" type="text" placeholder="Galeria de Magallanes" />
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const property = ref({
      PropertyAddress: "",
      PropertyCountry: "Philippines", // Default and uneditable
      PropertyRegion: "",
      PropertyCity: "",
      PropertyBarangay: "",
      PropertyVillageName: "",
      PropertyCondoName: "",
    });

    return { property };
  }
};
</script>
