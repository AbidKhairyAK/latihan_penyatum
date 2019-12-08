<template>
  <app-navigator></app-navigator>
</template>

<script>
  import React from 'react';
  import Vue from 'vue-native-core';
  import { VueNativeBase } from 'native-base';
  import { createAppContainer } from 'vue-native-router';
  import AsyncStorage from '@react-native-community/async-storage';
  import axios from 'axios';

  import StackNavigator from './src/router.js';
  import Store from './src/store.js';

  Vue.use(VueNativeBase);

  // const base_url = 'http://root-5k4r.localhost.run';
  const base_url = 'http://209.97.169.78:4367';

  Vue.prototype.$store = Store;
  Vue.prototype.$url = base_url;
  Vue.prototype.$storage = AsyncStorage;
  Vue.prototype.$axios = axios.create({
    baseURL: base_url,
  });


  const AppNavigator = createAppContainer(StackNavigator);

  export default {
    components: { AppNavigator }
  }
</script>