<template>
  <div>
    <p>Select a package:</p>
    
    <label>Package</label>
    <select v-model="selectedPackage" required>
      <option value="homecare-plus-2">Homecare Plus 2</option>
      <option value="homecare-enhance">Homecare Enhanced</option>
      <option value="homecare-plus-1">Homecare Plus 1</option>
      <option value="homecare-compre">Homecare Compre</option>
    </select>
    
    <div v-if="selectedPackage">
      <h3>Package | Inclusions</h3>
      <ul v-if="selectedPackage === 'homecare-plus-2'">
        <li>Fire/Lightning</li>
        <li>Typhoon</li>
        <li>Flood</li>
        <li>Extended Cover</li>
        <li>Riot and Strike</li>
        <li>Malicious Damage</li>
        <li>Robbery/Burglary</li>
      </ul>
      <ul v-if="selectedPackage === 'homecare-enhance'">
        <li>Fire/Lightning</li>
        <li>Extended Cover</li>
      </ul>
      <ul v-if="selectedPackage === 'homecare-plus-1'">
        <li>Fire/Lightning</li>
        <li>Typhoon</li>
        <li>Flood</li>
        <li>Extended Cover</li>
        <li>Riot and Strike</li>
        <li>Malicious Damage</li>
        <li>Robbery/Burglary</li>
      </ul>
      <ul v-if="selectedPackage === 'homecare-compre'">
        <li>Fire/Lightning</li>
        <li>Typhoon</li>
        <li>Flood</li>
        <li>Extended Cover</li>
        <li>Riot and Strike</li>
        <li>Malicious Damage</li>
        <li>Robbery/Burglary</li>
        <li>Broad Water Damage</li>
        <li>Bowtap</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedPackage: ""
    };
  }
};
</script>
