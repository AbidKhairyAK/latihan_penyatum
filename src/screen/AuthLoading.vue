<template>
	<view>
		<activity-indicator :style="{marginTop: 30}" :size="50" color="#255d00"/>
	</view>
</template>

<script>

	export default {
		props: ['navigation'],
		async created() {
			const userToken = await this.$storage.getItem('@userToken');
			const lang = await this.$storage.getItem('@lang');

			if (lang) {
				this.$store.dispatch('changeLang', lang);
			}

			if (userToken) {
				this.$axios.post('/api/auth/me', {}, {
					headers: {'authorization' : 'Bearer '+userToken},
				})
				.then((res) => {
					this.navigation.navigate('AppStack');
				})
				.catch((e) => {
					if(e.response && e.response.status == 401) { 
						this.$storage.removeItem('@userToken'); 
						this.navigation.navigate('AuthStack');
					}
					this.navigation.navigate('AppStack');
				})
			} else {
				this.navigation.navigate('AuthStack');
			}
		}
	}
</script>