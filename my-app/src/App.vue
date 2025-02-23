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
import ClientForm from './components/ClientForm.vue';
import PropertyLocation from './components/PropertyLocation.vue';
import CoveredProperty from './components/CoveredProperty.vue';
import PropertyDescription from './components/PropertyDescription.vue';
import Packages from './components/Packages.vue';
import { supabase } from './supabase';

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
        console.log("Submitting Data:", this.clientData, this.propertyLocationData, this.coveredPropertyData, this.propertyDescriptionData, this.packagesData);
        
        if (!this.clientData.LastName || this.clientData.LastName.trim() === "") {
          throw new Error("Client data is missing 'LastName'");
        }
        if (!this.clientData.EmailAdd || !this.clientData.EmailAdd.includes("@")) {
          throw new Error("Invalid or missing Email Address");
        }
        
        await supabase.from('clients').insert([this.clientData]);
        await supabase.from('property_location').insert([this.propertyLocationData]);
        await supabase.from('covered_properties').insert([this.coveredPropertyData]);
        await supabase.from('property_description').insert([this.propertyDescriptionData]);
        await supabase.from('packages').insert([this.packagesData]);
        
        alert("Submission successful!");
      } catch (error) {
        console.error("Error submitting data:", error);
        alert("Submission failed: " + (error.message || JSON.stringify(error)));
      }
    }
  }
};
</script>