<template>
  <form @submit.prevent>
    <p>Enter 0 if not applicable.</p>

    <label>
      Building Improvements:
      <input v-model.number="coveredProperty.BuildingImprovements" type="number" min="0" step="0.01" required placeholder="Estimated Amount" @input="emitCoveredPropertyData" />
    </label>

    <label>
      Household Contents:
      <input v-model.number="coveredProperty.HouseholdContents" type="number" min="0" step="0.01" required placeholder="Estimated Amount" @input="emitCoveredPropertyData" />
    </label>

    <label>
      Swimming Pool:
      <input v-model.number="coveredProperty.SwimmingPool" type="number" min="0" step="0.01" required placeholder="Estimated Amount" @input="emitCoveredPropertyData" />
    </label>

    <label>
      Gazebo:
      <input v-model.number="coveredProperty.Gazebo" type="number" min="0" step="0.01" required placeholder="Estimated Amount" @input="emitCoveredPropertyData" />
    </label>

    <label>
      Water Tank:
      <input v-model.number="coveredProperty.WaterTank" type="number" min="0" step="0.01" required placeholder="Estimated Amount" @input="emitCoveredPropertyData" />
    </label>

    <label>
      Pump House:
      <input v-model.number="coveredProperty.PumpHouse" type="number" min="0" step="0.01" required placeholder="Estimated Amount" @input="emitCoveredPropertyData" />
    </label>

    <label>
      Dirty Kitchen:
      <input v-model.number="coveredProperty.DirtyKitchen" type="number" min="0" step="0.01" required placeholder="Estimated Amount" @input="emitCoveredPropertyData" />
    </label>

    <label>
      Concrete Fence:
      <input v-model.number="coveredProperty.ConcreteFence" type="number" min="0" step="0.01" required placeholder="Estimated Amount" @input="emitCoveredPropertyData" />
    </label>
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
