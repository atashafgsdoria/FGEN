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
      clientData: null,
      propertyLocationData: null,
      coveredPropertyData: null,
      propertyDescriptionData: null,
      packagesData: null
    };
  },
  methods: {
    updateClientData(data) {
      this.clientData = data;
    },
    updatePropertyLocationData(data) {
      this.propertyLocationData = data;
    },
    updateCoveredPropertyData(data) {
      this.coveredPropertyData = data;
    },
    updatePropertyDescriptionData(data) {
      this.propertyDescriptionData = data;
    },
    updatePackagesData(data) {
      this.packagesData = data;
    },

    async submitForm() {
      try {
        console.log("Submitting data...");

        // 🚨 **Check if required data is missing**
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
          .insert([this.clientData])
          .select()
          .single();

        if (clientError) throw clientError;
        console.log("Inserted into clients:", clientResponse);

        const clientId = clientResponse.id;

        // ✅ **Insert into Properties Table (linked to client)**
        this.propertyLocationData.client_id = clientId;
        const { data: locationResponse, error: locationError } = await supabase
          .from("properties")
          .insert([this.propertyLocationData])
          .select()
          .single();

        if (locationError) throw locationError;
        console.log("Inserted into properties:", locationResponse);

        const locationId = locationResponse.id;

        // ✅ **Insert into Covered Properties Table**
        this.coveredPropertyData.client_id = clientId;
        this.coveredPropertyData.property_id = locationId;
        const { data: coveredResponse, error: coveredError } = await supabase
          .from("covered_properties")
          .insert([this.coveredPropertyData])
          .select();

        if (coveredError) throw coveredError;
        console.log("Inserted into covered_properties:", coveredResponse);

        // ✅ **Insert into Property Description Table**
        this.propertyDescriptionData.property_id = locationId;
        const { data: descResponse, error: descError } = await supabase
          .from("property_description")
          .insert([this.propertyDescriptionData])
          .select();

        if (descError) throw descError;
        console.log("Inserted into property_description:", descResponse);

        // ✅ **Insert into Packages Table**
        this.packagesData.client_id = clientId;
        const { data: packageResponse, error: packageError } = await supabase
          .from("packages")
          .insert([this.packagesData])
          .select();

        if (packageError) throw packageError;
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
