<template>
  <div>
    <p>Select a package:</p>

    <label for="package-select">Package</label>
    <select id="package-select" v-model="packageData.package_name" @change="emitSelectedPackage" required>
      <option value="" disabled>Select a package</option>
      <option value="homecare-plus-2">Homecare Plus 2</option>
      <option value="homecare-enhance">Homecare Enhanced</option>
      <option value="homecare-plus-1">Homecare Plus 1</option>
      <option value="homecare-compre">Homecare Compre</option>
    </select>

    <div v-if="packageData.package_name">
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
    const packageData = ref({ package_name: "" });

    const packageInclusions = computed(() => {
      const packages = {
        "homecare-plus-2": ["Fire/Lightning", "Typhoon", "Flood", "Extended Cover", "Riot and Strike", "Malicious Damage", "Robbery/Burglary"],
        "homecare-enhance": ["Fire/Lightning", "Extended Cover"],
        "homecare-plus-1": ["Fire/Lightning", "Typhoon", "Flood", "Extended Cover", "Riot and Strike", "Malicious Damage", "Robbery/Burglary"],
        "homecare-compre": ["Fire/Lightning", "Typhoon", "Flood", "Extended Cover", "Riot and Strike", "Malicious Damage", "Robbery/Burglary", "Broad Water Damage", "Burst Pipe"]
      };
      return packages[packageData.value.package_name] || [];
    });

    const emitSelectedPackage = () => {
      emit("update:data", { ...packageData.value });
    };

    // Watch for changes and emit immediately
    watch(() => packageData.value.package_name, emitSelectedPackage);

    return { packageData, packageInclusions, emitSelectedPackage };
  }
};
</script>
