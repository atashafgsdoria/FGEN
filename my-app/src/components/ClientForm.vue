<template>
  <form>
    <label>Last Name:</label>
    <input v-model="client.LastName" type="text" required placeholder="Dela Cruz" />

    <label>Given Name:</label>
    <input v-model="client.GivenName" type="text" required placeholder="Juan" />

    <label>Middle Name:</label>
    <input v-model="client.MiddleName" type="text" placeholder="Cruz" />

    <label>Date of Birth:</label>
    <input v-model="client.DateOfBirth" type="date" required :max="maxDate" />

    <label>Client's Interest on Property:</label>
    <div>
      <input type="radio" id="owner" value="owner" v-model="client.InterestOnProperty" required />
      <label for="owner">Owner</label>

      <input type="radio" id="lessee" value="lessee" v-model="client.InterestOnProperty" required />
      <label for="lessee">Lessee</label>

      <input type="radio" id="mortgagee" value="mortgagee" v-model="client.InterestOnProperty" required />
      <label for="mortgagee">Mortgagee</label>

      <input type="radio" id="others" value="others" v-model="client.InterestOnProperty" required />
      <label for="others">Others</label>
    </div>

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
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const client = ref({
      LastName: "",
      GivenName: "",
      MiddleName: "",
      DateOfBirth: "",
      InterestOnProperty: "",
      MobileNum: "",
      EmailAdd: "",
      MailingAdd: "",
      TelResNum: "",
      TelOffNum: "",
    });

    // Restrict Date of Birth to avoid minors
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);
    const formattedMaxDate = maxDate.toISOString().split("T")[0];

    return { client, maxDate: formattedMaxDate };
  }
};
</script>
