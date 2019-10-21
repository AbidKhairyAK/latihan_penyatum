<template>
  <app-navigator></app-navigator>
</template>

<script>
  import React from 'react';
  import Vue from 'vue-native-core';
  import { VueNativeBase } from 'native-base';
  import StackNavigator from './src/router.js';
  import { createAppContainer } from 'vue-native-router';
  // import Store from './src/store.js';

  Vue.use(VueNativeBase);

  // Vue.prototype.$store = Store;

  const AppNavigator = createAppContainer(StackNavigator);

  export default {
    components: { AppNavigator }
  }
</script>