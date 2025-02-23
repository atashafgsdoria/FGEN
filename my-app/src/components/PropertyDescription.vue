<template>
  <div>
    <p>Enter 0 if not applicable.</p>
    
    <label>Number of Storey</label>
    <input type="number" v-model.number="storey" min="1" required />

    <label>Year Built</label>
    <input type="number" v-model.number="yearBuilt" :max="currentYear" required />
    
    <label>Floor Area (sqm)</label>
    <input type="number" v-model.number="floorArea" min="0" required step="0.01" />

    <label>Roofing</label>
    <select v-model="roofing" required>
      <option value="galvanized-iron">Galvanized Iron</option>
      <option value="asbestos">Asbestos</option>
      <option value="brick">Brick</option>
      <option value="concrete">Concrete</option>
      <option value="other">Other</option>
    </select>
    <input v-if="roofing === 'other'" type="text" v-model="roofingOther" placeholder="If yes, please specify" required />

    <label>Occupancy</label>
    <select v-model="occupancy" required>
      <option value="office">Office</option>
      <option value="apartment-townhouse">Apartment/Townhouse</option>
      <option value="retail-store">Retail Store</option>
      <option value="clinic">Clinic</option>
      <option value="warehouse">Warehouse</option>
      <option value="residential">Residential</option>
      <option value="condominium">Condominium</option>
      <option value="restaurant">Restaurant</option>
      <option value="school">School</option>
      <option value="industrial-factory">Industrial/Factory</option>
    </select>
    <input v-if="occupancy === 'warehouse' || occupancy === 'industrial-factory'" type="text" v-model="occupancyOther" placeholder="If yes, please specify" required />

    <label>Number of Tenants</label>
    <input type="number" v-model.number="tenants" min="0" required />
    
    <h3>Boundaries (meters)</h3>
    <label>Front</label>
    <input type="number" v-model.number="boundaryFront" min="0" required step="0.01" />
    
    <label>Right</label>
    <input type="number" v-model.number="boundaryRight" min="0" required step="0.01" />
    
    <label>Left</label>
    <input type="number" v-model.number="boundaryLeft" min="0" required step="0.01" />
    
    <label>Rear</label>
    <input type="number" v-model.number="boundaryRear" min="0" required step="0.01" />
    
    <label>Type of Construction (Exterior Walls Only)</label>
    <select v-model="typeOfConstruction" required>
      <option value="Class A">Class A</option>
      <option value="Class B">Class B</option>
      <option value="Class C">Class C</option>
      <option value="Homecare Compre">Homecare Compre</option>
    </select>
    
    <div v-if="typeOfConstruction">
      <h3>Class | Materials</h3>
      <p v-if="typeOfConstruction === 'Class A'">Reinforced Concrete, Concrete Hollow Blocks, Bricks...</p>
      <p v-if="typeOfConstruction === 'Class B'">Concrete and Timber, Entirely of timber...</p>
      <p v-if="typeOfConstruction === 'Class C'">Bamboo, Sawali, Nipa...</p>
      <p v-if="typeOfConstruction === 'Homecare Compre'">Fire/Lightning, Typhoon, Flood...</p>
    </div>
    
    <h3>Other Property Information</h3>
    <PropertyInfoDropdown label="Is the property located in a congested area?" v-model="locationCongestedArea" />
    <PropertyInfoDropdown label="Does the property have explosives?" v-model="locationExplosives" />
    <PropertyInfoDropdown label="Is the property located in a flood-prone area?" v-model="locationFloodProne" />
    <PropertyInfoConditional label="Have you ever had a fire loss in this premises?" v-model="fireLoss" date-model="fireLossDate" />
    <PropertyInfoConditional label="Have you ever had a policy of fire insurance cancelled?" v-model="policyCancelled" date-model="policyCancelledDate" text-model="policyCancelledCompany" placeholder="If yes, please specify company." />
    <PropertyInfoConditional label="Have you ever had this risk declined by any other company?" v-model="riskDeclined" date-model="riskDeclinedDate" text-model="riskDeclinedCompany" placeholder="If yes, please specify company." />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      storey: 1,
      yearBuilt: "",
      floorArea: "",
      roofing: "",
      roofingOther: "",
      occupancy: "",
      occupancyOther: "",
      tenants: 0,
      boundaryFront: "",
      boundaryRight: "",
      boundaryLeft: "",
      boundaryRear: "",
      typeOfConstruction: "",
      locationCongestedArea: "",
      locationExplosives: "",
      locationFloodProne: "",
      fireLoss: "",
      fireLossDate: "",
      policyCancelled: "",
      policyCancelledCompany: "",
      policyCancelledDate: "",
      riskDeclined: "",
      riskDeclinedCompany: "",
      riskDeclinedDate: ""
    };
  }
};
</script>
