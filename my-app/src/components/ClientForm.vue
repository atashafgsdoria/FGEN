<template>
  <form>
    <label>Last Name:</label>
    <input v-model="client.last_name" type="text" required placeholder="Dela Cruz" @input="emitClientData" autocomplete="off" />

    <label>Given Name:</label>
    <input v-model="client.given_name" type="text" required placeholder="Juan" @input="emitClientData" autocomplete="off" />

    <label>Middle Name:</label>
    <input v-model="client.middle_name" type="text" placeholder="Cruz" @input="emitClientData" autocomplete="off" />

    <label>Date of Birth:</label>
    <input v-model="client.date_of_birth" type="date" required :max="maxDate" @input="emitClientData" />

    <label>Mobile Number:</label>
    <input v-model="client.mobile_num" type="text" required pattern="[0-9]{11}" placeholder="09000000000" @input="emitClientData" autocomplete="off" />

    <label>Email Address:</label>
    <input v-model="client.email_add" type="email" required placeholder="juandelacruz@domain.com" @input="emitClientData" autocomplete="off" />

    <label>Mailing Address:</label>
    <textarea v-model="client.mailing_add" required @input="emitClientData"></textarea>

    <label>Telephone Number (Residential):</label>
    <input v-model="client.tel_res_num" type="text" pattern="[0-9]{10}" placeholder="028852932" @input="emitClientData" autocomplete="off" />

    <label>Telephone Number (Office):</label>
    <input v-model="client.tel_off_num" type="text" pattern="[0-9]{10}" placeholder="0288529232" @input="emitClientData" autocomplete="off" />

    <label>Client's Interest on Property:</label>
    <select v-model="client.interest_on_property" required @change="emitClientData">
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
      last_name: "",
      given_name: "",
      middle_name: "",
      date_of_birth: "",
      mobile_num: "",
      email_add: "",
      mailing_add: "",
      tel_res_num: "",
      tel_off_num: "",
      interest_on_property: ""
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
