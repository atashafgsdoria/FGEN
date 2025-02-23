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
import { supabase } from './supabase'; //

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
        await supabase.from('clients').insert([this.clientData]);
        await supabase.from('covered_properties').insert([this.coveredPropertyData]);
        await supabase.from('packages').insert([this.packagesData]);
        await supabase.from('property_description').insert([this.propertyDescriptionData]);
        await supabase.from('property_location').insert([this.propertyLocationData]);

        alert('Submission successful!');
      } catch (error) {
        console.error('Error submitting data:', error.message);
        alert('Submission failed. Please try again.');
      }
    }
  }
};
</script>
