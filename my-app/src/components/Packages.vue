<template>
  <div>
    <p>Select a package:</p>

    <label for="package-select">Package</label>
    <select id="package-select" v-model="selectedPackage" @change="emitSelectedPackage" required>
      <option value="" disabled>Select a package</option>
      <option value="homecare-plus-2">Homecare Plus 2</option>
      <option value="homecare-enhance">Homecare Enhanced</option>
      <option value="homecare-plus-1">Homecare Plus 1</option>
      <option value="homecare-compre">Homecare Compre</option>
    </select>

    <div v-if="selectedPackage">
      <h3>Package | Inclusions</h3>
      <ul>
        <li v-for="inclusion in packageInclusions" :key="inclusion">{{ inclusion }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";

export default {
  emits: ["update:data"],
  setup(_, { emit }) {
    const selectedPackage = ref("");

    const packageInclusions = computed(() => {
      const packages = {
        "homecare-plus-2": ["Fire/Lightning", "Typhoon", "Flood", "Extended Cover", "Riot and Strike", "Malicious Damage", "Robbery/Burglary"],
        "homecare-enhance": ["Fire/Lightning", "Extended Cover"],
        "homecare-plus-1": ["Fire/Lightning", "Typhoon", "Flood", "Extended Cover", "Riot and Strike", "Malicious Damage", "Robbery/Burglary"],
        "homecare-compre": ["Fire/Lightning", "Typhoon", "Flood", "Extended Cover", "Riot and Strike", "Malicious Damage", "Robbery/Burglary", "Broad Water Damage", "Burst Pipe"] // ✅ Fixed 'Bowtap' to 'Burst Pipe'
      };
      return packages[selectedPackage.value] || [];
    });

    const emitSelectedPackage = () => {
      emit("update:data", selectedPackage.value);
    };

    // Watch for changes and emit immediately
    watch(selectedPackage, emitSelectedPackage);

    return { selectedPackage, packageInclusions, emitSelectedPackage };
  }
};
</script>
