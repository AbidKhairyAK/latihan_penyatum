<template>
	<view>
		<activity-indicator :style="{marginTop: 30}" :size="50" color="#255d00"/>
	</view>
</template>

<script>
	import AsyncStorage from '@react-native-community/async-storage';
	import axios from 'axios';

	export default {
		props: ['navigation'],
		data: () => ({
			check: false
		}),
		async created() {
			const userToken = await AsyncStorage.getItem('@userToken');

			axios.post(this.$url+'/api/auth/me', {}, {
				headers: {'authorization' : 'Bearer '+userToken}
			})
			.then((res) => {
				this.check = true;
			})
			.catch((e) => {
				AsyncStorage.removeItem('@userToken');
			})
			.finally(() => {
				this.navigation.navigate(this.check ? 'AppStack' : 'AuthStack');
			});

		}
	}
</script>