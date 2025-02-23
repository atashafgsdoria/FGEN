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
    </select>

    <div v-if="typeOfConstruction">
      <h3>Class | Materials</h3>
      <p v-if="typeOfConstruction === 'Class A'">Reinforced Concrete, Concrete Hollow Blocks, Bricks...</p>
      <p v-if="typeOfConstruction === 'Class B'">Concrete and Timber, Entirely of timber...</p>
      <p v-if="typeOfConstruction === 'Class C'">Bamboo, Sawali, Nipa...</p>
    </div>

    <h3>Other Property Information</h3>

    <label>Is the property located in a congested area?</label>
    <select v-model="locationCongestedArea" required>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>

    <label>Does the property have explosives?</label>
    <select v-model="locationExplosives" required>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>

    <label>Is the property located in a flood-prone area?</label>
    <select v-model="locationFloodProne" required>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>

    <label>Have you ever had a fire loss in this premises?</label>
    <input type="checkbox" v-model="fireLoss" />
    <input v-if="fireLoss" type="date" v-model="fireLossDate" required />

    <label>Have you ever had a policy of fire insurance cancelled?</label>
    <input type="checkbox" v-model="policyCancelled" />
    <input v-if="policyCancelled" type="date" v-model="policyCancelledDate" required />
    <input v-if="policyCancelled" type="text" v-model="policyCancelledCompany" placeholder="If yes, please specify company." required />

    <label>Have you ever had this risk declined by any other company?</label>
    <input type="checkbox" v-model="riskDeclined" />
    <input v-if="riskDeclined" type="date" v-model="riskDeclinedDate" required />
    <input v-if="riskDeclined" type="text" v-model="riskDeclinedCompany" placeholder="If yes, please specify company." required />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      storey: 1,
      yearBuilt: "", // 🔹 Fixed to store numbers correctly
      floorArea: 0, // 🔹 Default to 0 to prevent errors
      roofing: "",
      roofingOther: "",
      occupancy: "",
      occupancyOther: "",
      tenants: 0, // 🔹 Use default 0 to match v-model.number
      boundaryFront: 0,
      boundaryRight: 0,
      boundaryLeft: 0,
      boundaryRear: 0,
      typeOfConstruction: "",
      locationCongestedArea: "",
      locationExplosives: "",
      locationFloodProne: "",
      fireLoss: false,
      fireLossDate: null,
      policyCancelled: false,
      policyCancelledCompany: "",
      policyCancelledDate: null,
      riskDeclined: false,
      riskDeclinedCompany: "",
      riskDeclinedDate: null
    };
  }
};
</script>
