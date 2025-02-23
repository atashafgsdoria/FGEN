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
      packagesData: {}
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

        // 🚨 **Check for missing required fields**
        if (!this.clientData || !this.clientData.LastName || !this.clientData.GivenName || !this.clientData.EmailAdd) {
          alert("Client information is incomplete.");
          return;
        }

        if (!this.propertyLocationData || !this.propertyLocationData.PropertyAddress) {
          alert("Property location information is incomplete.");
          return;
        }

        // ✅ **Insert into Clients Table**
        const { data: clientResponse, error: clientError } = await supabase
          .from("clients")
          .insert([{ ...this.clientData }])
          .select()
          .single();

        if (clientError) throw new Error(`Client insertion failed: ${clientError.message}`);
        console.log("Inserted into clients:", clientResponse);

        const clientId = clientResponse?.id;
        if (!clientId) throw new Error("Client ID not returned.");

        // ✅ **Insert into Properties Table (linked to client)**
        const propertyData = { ...this.propertyLocationData, client_id: clientId };
        const { data: locationResponse, error: locationError } = await supabase
          .from("properties")
          .insert([propertyData])
          .select()
          .single();

        if (locationError) throw new Error(`Property insertion failed: ${locationError.message}`);
        console.log("Inserted into properties:", locationResponse);

        const locationId = locationResponse?.id;
        if (!locationId) throw new Error("Property ID not returned.");

        // ✅ **Insert into Covered Properties Table**
        const coveredPropertyData = { ...this.coveredPropertyData, client_id: clientId, property_id: locationId };
        const { data: coveredResponse, error: coveredError } = await supabase
          .from("covered_properties")
          .insert([coveredPropertyData])
          .select();

        if (coveredError) throw new Error(`Covered properties insertion failed: ${coveredError.message}`);
        console.log("Inserted into covered_properties:", coveredResponse);

        // ✅ **Insert into Property Description Table**
        const propertyDescData = { ...this.propertyDescriptionData, property_id: locationId };
        const { data: descResponse, error: descError } = await supabase
          .from("property_description")
          .insert([propertyDescData])
          .select();

        if (descError) throw new Error(`Property description insertion failed: ${descError.message}`);
        console.log("Inserted into property_description:", descResponse);

        // ✅ **Insert into Packages Table**
        const packageData = { ...this.packagesData, client_id: clientId };
        const { data: packageResponse, error: packageError } = await supabase
          .from("packages")
          .insert([packageData])
          .select();

        if (packageError) throw new Error(`Packages insertion failed: ${packageError.message}`);
        console.log("Inserted into packages:", packageResponse);

        alert("Submission successful!");
      } catch (error) {
        console.error("Error submitting data:", error);
        alert("Submission failed: " + (error.message || JSON.stringify(error)));
      }
    }
  }
};
</script>
