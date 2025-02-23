<template>
  <div>
    <h1>Insurance Application</h1>

    <ClientForm @update:data="updateClientData" />
    <PropertyLocation @update:data="updatePropertyLocationData" />
    <CoveredProperty @update:data="updateCoveredPropertyData" />
    <PropertyDescription @update:data="updatePropertyDescriptionData" />
    <Packages @update:data="updatePackagesData" />

    <button @click="submitForm">Submit</button>
  </div>
</template>

<script>
import ClientForm from "./components/ClientForm.vue";
import PropertyLocation from "./components/PropertyLocation.vue";
import CoveredProperty from "./components/CoveredProperty.vue";
import PropertyDescription from "./components/PropertyDescription.vue";
import Packages from "./components/Packages.vue";
import { supabase } from "./supabase";

export default {
  components: {
    ClientForm,
    PropertyLocation,
    CoveredProperty,
    PropertyDescription,
    Packages
  },
  data() {
    return {
      clientData: {},
      propertyLocationData: {},
      coveredPropertyData: {},
      propertyDescriptionData: {},
      packagesData: {},
      currentYear: new Date().getFullYear()
    };
  },
  methods: {
    updateClientData(data) {
      this.clientData = { ...data };
    },
    updatePropertyLocationData(data) {
      this.propertyLocationData = { ...data };
    },
    updateCoveredPropertyData(data) {
      this.coveredPropertyData = { ...data };
    },
    updatePropertyDescriptionData(data) {
      this.propertyDescriptionData = { ...data };
    },
    updatePackagesData(data) {
      this.packagesData = { ...data };
    },

    async submitForm() {
      try {
        console.log("Submitting data...");

        // 🚨 Validate required fields
        if (!this.clientData.last_name || !this.clientData.given_name || !this.clientData.email_add) {
          alert("Client information is incomplete.");
          return;
        }

        if (!this.propertyLocationData.property_address) {
          alert("Property location information is incomplete.");
          return;
        }

        // ✅ Insert Client Record
        const { data: clientResponse, error: clientError } = await supabase
          .from("clients")
          .insert([{ ...this.clientData }])
          .select()
          .single();

        if (clientError) throw clientError;
        console.log("Client inserted:", clientResponse);

        const clientId = clientResponse.id;

        // ✅ Insert Property Record
        const propertyData = { ...this.propertyLocationData, client_id: clientId };
        const { data: propertyResponse, error: propertyError } = await supabase
          .from("properties")
          .insert([propertyData])
          .select()
          .single();

        if (propertyError) throw propertyError;
        console.log("Property inserted:", propertyResponse);

        const propertyId = propertyResponse.id;

        // ✅ Insert Covered Property
        const coveredPropertyData = { ...this.coveredPropertyData, client_id: clientId, property_id: propertyId };
        await supabase.from("covered_properties").insert([coveredPropertyData]);

        // ✅ Insert Property Description
        const propertyDescData = { ...this.propertyDescriptionData, property_id: propertyId };
        await supabase.from("property_description").insert([propertyDescData]);

        // ✅ Insert Package
        const packageData = { ...this.packagesData, client_id: clientId };
        await supabase.from("packages").insert([packageData]);

        alert("Submission successful!");
      } catch (error) {
        console.error("Submission failed:", error);
        alert("Submission failed: " + error.message);
      }
    }
  }
};
</script>
