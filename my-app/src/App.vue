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
    console.log("Submitting data...");

    // ✅ Clients Table
    const { data: clientResponse, error: clientError } = await supabase
      .from("clients")
      .insert([this.clientData])
      .select(); // Fetch inserted row
    console.log("Inserted into clients:", clientResponse);
    if (clientError) throw clientError;

    // ✅ Covered Properties Table
    const { data: coveredResponse, error: coveredError } = await supabase
      .from("covered_properties")
      .insert([this.coveredPropertyData])
      .select();
    console.log("Inserted into covered_properties:", coveredResponse);
    if (coveredError) throw coveredError;

    // ✅ Packages Table
    const { data: packageResponse, error: packageError } = await supabase
      .from("packages")
      .insert([this.packagesData])
      .select();
    console.log("Inserted into packages:", packageResponse);
    if (packageError) throw packageError;

    // ✅ Property Description Table
    const { data: descResponse, error: descError } = await supabase
      .from("property_description")
      .insert([this.propertyDescriptionData])
      .select(); // ✅ Add `.select()` for consistency
    console.log("Inserted into property_description:", descResponse);
    if (descError) throw descError;


    // ✅ Property Location Table
    const { data: locationResponse, error: locationError } = await supabase
      .from("property_information")
      .insert([this.propertyLocationData])
      .select();
    console.log("Inserted into property_information:", locationResponse);
    if (locationError) throw locationError;

    alert("Submission successful!");
  } catch (error) {
    console.error("Error submitting data:", error);
    alert("Submission failed: " + (error.message || JSON.stringify(error)));
  }
}
};
</script>