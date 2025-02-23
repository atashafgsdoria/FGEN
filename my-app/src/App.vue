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
    Packages,
  },
  data() {
    return {
      clientData: {},
      propertyLocationData: {},
      coveredPropertyData: {},
      propertyDescriptionData: {},
      packagesData: {},
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

        // 🚨 Validate Client Information
        if (!this.clientData.last_name?.trim() || 
            !this.clientData.given_name?.trim() || 
            !this.clientData.date_of_birth?.trim() || 
            !this.clientData.mobile_num?.trim() || 
            !this.clientData.email_add?.trim() || 
            !this.clientData.mailing_add?.trim() || 
            !this.clientData.interest_on_property?.trim()) {
          alert("Please fill in all required client information.");
          return;
        }

        // 🚨 Validate Property Location
        if (!this.propertyLocationData.property_address?.trim() ||
            !this.propertyLocationData.property_region?.trim() ||
            !this.propertyLocationData.property_city?.trim() ||
            !this.propertyLocationData.property_barangay?.trim()) {
          alert("Property location information is incomplete. Address, Region, City, and Barangay are required.");
          return;
        }

        // 🚨 Validate Covered Property Fields
        const coveredFields = ["BuildingImprovements", "HouseholdContents", "SwimmingPool", "Gazebo", "WaterTank", "PumpHouse", "DirtyKitchen", "ConcreteFence"];
        for (let field of coveredFields) {
          const value = this.coveredPropertyData[field];
          if (value === "" || value === null || isNaN(value) || value < 0) {
            alert(`Invalid value for ${field}. Please enter 0 if not applicable.`);
            return;
          }
        }

        // 🚨 Validate Package Selection
        if (!this.packagesData.package_name?.trim()) {
          alert("Please select a package.");
          return;
        }

        // 🚨 Validate Property Description
        if (this.propertyDescriptionData.storey < 1) {
          alert("Number of Storeys must be at least 1.");
          return;
        }

        if (!this.propertyDescriptionData.yearBuilt || this.propertyDescriptionData.yearBuilt > new Date().getFullYear()) {
          alert("Year Built must be a valid year.");
          return;
        }

        if (this.propertyDescriptionData.floorArea < 0) {
          alert("Floor Area must be 0 or greater.");
          return;
        }

        // ✅ Insert Client Record
        const { data: clientResponse, error: clientError } = await supabase.from("clients").insert([{ ...this.clientData }]).select().single();
        if (clientError) throw clientError;
        console.log("Client inserted:", clientResponse);

        const clientId = clientResponse.id;

        // ✅ Insert Property Record
        const propertyData = { ...this.propertyLocationData, client_id: clientId };
        const { data: propertyResponse, error: propertyError } = await supabase.from("properties").insert([propertyData]).select().single();
        if (propertyError) throw propertyError;
        console.log("Property inserted:", propertyResponse);

        const propertyId = propertyResponse.id;

        // ✅ Insert Covered Property
        await supabase.from("covered_properties").insert([{ ...this.coveredPropertyData, client_id: clientId, property_id: propertyId }]);

        // ✅ Insert Property Description
        await supabase.from("property_description").insert([{ ...this.propertyDescriptionData, property_id: propertyId }]);

        // ✅ Insert Package
        await supabase.from("packages").insert([{ ...this.packagesData, client_id: clientId }]);

        alert("Submission successful!");
      } catch (error) {
        console.error("Submission failed:", error);
        alert("Submission failed: " + error.message);
      }
    },
  },
};
</script>
