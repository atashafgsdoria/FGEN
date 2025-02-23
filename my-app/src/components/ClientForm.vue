<template>
  <form>
    <label>Last Name:</label>
    <input v-model="client.LastName" type="text" required placeholder="Dela Cruz" @input="emitClientData" />

    <label>Given Name:</label>
    <input v-model="client.GivenName" type="text" required placeholder="Juan" @input="emitClientData" />

    <label>Middle Name:</label>
    <input v-model="client.MiddleName" type="text" placeholder="Cruz" @input="emitClientData" />

    <label>Date of Birth:</label>
    <input v-model="client.DateOfBirth" type="date" required :max="maxDate" @input="emitClientData" />

    <label>Mobile Number:</label>
    <input v-model="client.MobileNum" type="text" required pattern="[0-9]{11}" placeholder="09000000000" @input="emitClientData" />

    <label>Email Address:</label>
    <input v-model="client.EmailAdd" type="email" required placeholder="juandelacruz@domain.com" @input="emitClientData" />

    <label>Mailing Address:</label>
    <textarea v-model="client.MailingAdd" required @input="emitClientData"></textarea>

    <label>Telephone Number (Residential):</label>
    <input v-model="client.TelResNum" type="text" pattern="[0-9]{10}" placeholder="028852932" @input="emitClientData" />

    <label>Telephone Number (Office):</label>
    <input v-model="client.TelOffNum" type="text" pattern="[0-9]{10}" placeholder="0288529232" @input="emitClientData" />

    <label>Client's Interest on Property:</label>
    <select v-model="client.InterestOnProperty" required @change="emitClientData">
      <option value="owner">Owner</option>
      <option value="lessee">Lessee</option>
      <option value="mortgagee">Mortgagee</option>
      <option value="others">Others</option>
    </select>
  </form>
</template>

<script>
import { ref, computed } from "vue";

export default {
  emits: ["update:data"],
  setup(_, { emit }) {
    const client = ref({
      LastName: "",
      GivenName: "",
      MiddleName: "", // ✅ Changed from null to ""
      DateOfBirth: "",
      MobileNum: "",
      EmailAdd: "",
      MailingAdd: "",
      TelResNum: "",
      TelOffNum: "",
      InterestOnProperty: ""
    });

    const maxDate = computed(() => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 18);
      return date.toISOString().split("T")[0];
    });

    const emitClientData = () => {
      emit("update:data", { ...client.value });
    };

    return { client, maxDate, emitClientData };
  }
};
</script>
