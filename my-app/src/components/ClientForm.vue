<template>
  <form @input="emitClientData">
    <label>Last Name:</label>
    <input v-model="client.LastName" type="text" required placeholder="Dela Cruz" />

    <label>Given Name:</label>
    <input v-model="client.GivenName" type="text" required placeholder="Juan" />

    <label>Middle Name:</label>
    <input v-model="client.MiddleName" type="text" placeholder="Cruz" />

    <label>Date of Birth:</label>
    <input v-model="client.DateOfBirth" type="date" required :max="maxDate" />

    <label>Mobile Number:</label>
    <input v-model="client.MobileNum" type="text" required pattern="[0-9]{11}" placeholder="09000000000" />

    <label>Email Address:</label>
    <input v-model="client.EmailAdd" type="email" required placeholder="juandelacruz@domain.com" />

    <label>Mailing Address:</label>
    <textarea v-model="client.MailingAdd" required></textarea>

    <label>Telephone Number (Residential):</label>
    <input v-model="client.TelResNum" type="text" pattern="[0-9]{10}" placeholder="028852932" />

    <label>Telephone Number (Office):</label>
    <input v-model="client.TelOffNum" type="text" pattern="[0-9]{10}" placeholder="0288529232" />

    <label>Client's Interest on Property</label>
    <select v-model="client.ClientInterest" required>
      <option value="owner">Owner</option>
      <option value="tenant">Tenant</option>
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
      MiddleName: "",
      DateOfBirth: "",
      MobileNum: "",
      EmailAdd: "",
      MailingAdd: "",
      TelResNum: "",
      TelOffNum: "",
      ClientInterest: ""  // ✅ Added this line
    });

    // Restrict Date of Birth (18+ years)
    const maxDate = computed(() => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 18);
      return date.toISOString().split("T")[0];
    });

    // Emit client data on input change
    const emitClientData = () => {
      emit("update:data", { ...client.value });
    };

    return { client, maxDate, emitClientData };
  }
};
</script>
