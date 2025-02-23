<template>
  <form @input="emitCoveredPropertyData" @submit.prevent>
    <p>Enter 0 if not applicable.</p>

    <label>Building Improvements:</label>
    <input v-model.number="coveredProperty.BuildingImprovements" type="number" min="0" step="0.01" required placeholder="Estimated Amount" />

    <label>Household Contents:</label>
    <input v-model.number="coveredProperty.HouseholdContents" type="number" min="0" step="0.01" required placeholder="Estimated Amount" />

    <label>Swimming Pool:</label>
    <input v-model.number="coveredProperty.SwimmingPool" type="number" min="0" step="0.01" required placeholder="Estimated Amount" />

    <label>Gazebo:</label>
    <input v-model.number="coveredProperty.Gazebo" type="number" min="0" step="0.01" required placeholder="Estimated Amount" />

    <label>Water Tank:</label>
    <input v-model.number="coveredProperty.WaterTank" type="number" min="0" step="0.01" required placeholder="Estimated Amount" />

    <label>Pump House:</label>
    <input v-model.number="coveredProperty.PumpHouse" type="number" min="0" step="0.01" required placeholder="Estimated Amount" />

    <label>Dirty Kitchen:</label>
    <input v-model.number="coveredProperty.DirtyKitchen" type="number" min="0" step="0.01" required placeholder="Estimated Amount" />

    <label>Concrete Fence:</label>
    <input v-model.number="coveredProperty.ConcreteFence" type="number" min="0" step="0.01" required placeholder="Estimated Amount" />
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  emits: ["update:data"],
  setup(_, { emit }) {
    const coveredProperty = ref({
      BuildingImprovements: 0,
      HouseholdContents: 0,
      SwimmingPool: 0,
      Gazebo: 0,
      WaterTank: 0,
      PumpHouse: 0,
      DirtyKitchen: 0,
      ConcreteFence: 0,
    });

    // Emit data changes
    const emitCoveredPropertyData = () => {
      emit("update:data", { ...coveredProperty.value });
    };

    return { coveredProperty, emitCoveredPropertyData };
  }
};
</script>
