<template>
  <div>
    <h1>Insurance Application</h1>
    
    <ClientForm @update:data="updateClientData" />
    <CoveredProperty @update:data="updateCoveredPropertyData" />
    <Packages @update:data="updatePackagesData" />
    <PropertyDescription @update:data="updatePropertyDescriptionData" />
    <PropertyLocation @update:data="updatePropertyLocationData" />
    
    <button @click="submitForm">Submit</button>
  </div>
</template>

<script>
import ClientForm from './components/ClientForm.vue';
import CoveredProperty from './components/CoveredProperty.vue';
import Packages from './components/Packages.vue';
import PropertyDescription from './components/PropertyDescription.vue';
import PropertyLocation from './components/PropertyLocation.vue';
import { supabase } from './supabase';

export default {
  components: {
    ClientForm,
    CoveredProperty,
    Packages,
    PropertyDescription,
    PropertyLocation
  },
  data() {
    return {
      clientData: {},
      coveredPropertyData: {},
      packagesData: {},
      propertyDescriptionData: {},
      propertyLocationData: {}
    };
  },
  methods: {
    updateClientData(data) {
      this.clientData = data;
    },
    updateCoveredPropertyData(data) {
      this.coveredPropertyData = data;
    },
    updatePackagesData(data) {
      this.packagesData = data;
    },
    updatePropertyDescriptionData(data) {
      this.propertyDescriptionData = data;
    },
    updatePropertyLocationData(data) {
      this.propertyLocationData = data;
    },
    async submitForm() {
      try {
        console.log("Client Data:", this.clientData);
        console.log("Covered Property Data:", this.coveredPropertyData);
        console.log("Packages Data:", this.packagesData);
        console.log("Property Description Data:", this.propertyDescriptionData);
        console.log("Property Location Data:", this.propertyLocationData);

        // 🚀 Check if required client fields are present before submitting
        if (!this.clientData.lastname || this.clientData.lastname.trim() === "") {
          throw new Error("Client data is missing 'lastname'");
        }

        const { error: clientError } = await supabase.from('clients').insert([this.clientData]); 
        if (clientError) throw clientError;

        const { error: coveredError } = await supabase.from('covered_properties').insert([this.coveredPropertyData]);
        if (coveredError) throw coveredError;

        const { error: packageError } = await supabase.from('packages').insert([this.packagesData]);
        if (packageError) throw packageError;

        const { error: descError } = await supabase.from('property_description').insert([this.propertyDescriptionData]);
        if (descError) throw descError;

        const { error: locationError } = await supabase.from('property_location').insert([this.propertyLocationData]);
        if (locationError) throw locationError;

        alert("Submission successful!");
      } catch (error) {
        console.error("Error submitting data:", error);
        alert("Submission failed: " + (error.message || JSON.stringify(error)));
      }
    }
  }
};
</script>
