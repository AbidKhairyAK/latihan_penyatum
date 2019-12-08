<template>
	<nb-header class="header" :hasTabs="hasTabs">
		<status-bar backgroundColor="#255d00" :translucent="false" barStyle="light-content" />
		<nb-left v-if="left" class="left">
			<nb-button transparent :on-press="() => navigation.goBack()">
				<nb-icon name="arrow-back" />
			</nb-button>
		</nb-left>
		<nb-left v-if="out" class="left">
			<nb-button transparent :on-press="() => logout()" v-if="!loading">
				<nb-icon name="sign-out-alt" type="FontAwesome5" class="out"/>
			</nb-button>
			<activity-indicator :size="30" color="#fff" v-if="loading"/>
		</nb-left>
		<nb-body>
			<nb-title></nb-title>
		</nb-body>
		<nb-right class="right">
			<lang-button class="lang" white></lang-button>
		</nb-right>
		<text class="title">{{ title }}</text>
	</nb-header>
</template>

<script>
	import LangButton from './LangButton';

	export default {
		components: {LangButton},
		props: {
				navigation: Object,
				left: {default: false},
				out: {default: false},
				hasTabs: {default: false},
				title: {default: 'PestBook'}
		},
		data: () => ({
			loading: false,
		}),
		methods: {
			async logout() {
				this.loading = true;
				const userToken = await this.$storage.getItem('@userToken');
				this.$axios.post('/api/auth/logout', {}, {
					headers: {'authorization' : 'Bearer '+userToken}
				})
				.finally(() => {
					this.loading = false;
					this.$storage.removeItem('@userToken');
					this.$storage.removeItem('@onesignal_id');
					this.navigation.navigate('AuthStack');
				});
			}
		}
	}
</script>

<style scoped>
	.header {
		background-color: #558b2f;
	}
	.title {
		position: absolute;
		left: 0; right: 0; top: 10;
		text-align: center;
		font-family: Dosis-ExtraBold;
		font-size: 25; 
		color: #eee;
	}
	.left {
		z-index: 1;
	}
	.right {
		z-index: 1;
	}
	.lang {
		align-self: center;
	}
	.out {
		transform: scaleX(-1);
	}
</style>