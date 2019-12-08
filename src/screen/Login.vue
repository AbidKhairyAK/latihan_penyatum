<template>
	<nb-container>
		<status-bar backgroundColor="transparent" translucent barStyle="light-content" />

			<image-background :source="require('../../assets/img/nature1.jpg')" class="container">

				<view class="logo">
					<c-text class="logo-item" size="sm">LOGO</c-text>
					<c-text class="logo-item" size="sm">LOGO</c-text>
				</view>

				<c-text size="xl" weight="bold" color="dark-green" align="c" class="app-title">PestBook</c-text>

				<nb-form class="form">

					<view class="subtitle-wrapper">
						<c-text class="subtitle" color="dark-green" size="md" weight="semi-bold">{{ ui.head_title }}</c-text>
						<lang-button></lang-button>
					</view>

					<c-text color="dark-green" class="label">Email</c-text>
					<nb-item class="item" regular>
						<nb-input class="input" v-model="form.email" auto-capitalize="none" keyboard-type="email-address" text-content-type="emailAddress" auto-complete-type="email"/>
					</nb-item>

					<c-text color="dark-green" class="label">Password</c-text>
					<view class="pass">
						<nb-item class="item pass-item" regular>
							<nb-input class="input" secureTextEntry v-model="form.password"/>
						</nb-item>

						<nb-button success full small class="button" :on-press="() => login()" v-if="!loading"><c-text weight="bold" color="light">Login >></c-text></nb-button>
						<activity-indicator :style="{marginTop: 5, flex: 3}" :size="30" color="#255d00" v-if="loading"/>

					</view>
				
				<touchable-opacity :on-press="() => navigation.navigate('Register')"><c-text class="reg-button" color="dark-green">{{ ui.register }}</c-text></touchable-opacity>
				</nb-form>
			</image-background>

	</nb-container>
</template>

<script>
import CText from '../item/CText';
import LangButton from '../item/LangButton';

export default {
	components: {CText, LangButton},
	props: ['navigation'],
	data: () => ({
		loading: false,
		form: {
			email: null, password: null
		}
	}),
	computed: {
		ui() {
			return this.$store.getters.ui.loginScreen;
		}
	},
	methods: {
		login() {
			if (this.form.email == null || this.form.password == null) {
				alert('Semua kolom harus terisi!');
				return;
			}

			this.loading = true;

			this.$axios.post('/api/auth/login/', this.form)
			.then((res) => {
				this.$storage.setItem('@userToken', res.data.access_token);
				this.navigation.navigate('AppStack');
			})
			.catch((e) => {
				if (e.response && e.response.status == 401) {
					alert('Maaf, anda belum terdaftar. Silahkan Registrasi terlebih dahulu.');
				} else {
					alert('Terjadi kesalahan dengan kode '+e+'. silahkan hubungi admin');
				}
			})
			.finally(() => {
				this.loading = false;
			});

		}
	}
}
</script>

<style>
.container {
	flex: 1;
	justify-content: center;
	padding-right: 30;
	padding-left: 30;
	width: 100%;
}
.logo {
	flex-direction: row;
	justify-content: space-between;
}
.logo-item {
	border-width: 1;
	border-color: #333333;
	padding: 10;
}
.app-title {
	padding-top: 30;
	flex: 2;
}
.form {
	flex: 5;
}
.subtitle-wrapper {
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.subtitle {
	margin-bottom: 20;
}
.item {
	margin-left: 0;
	border-color: #33333355;
	height: 30;
	margin-top: 5;
	margin-bottom: 10;
}
.pass {
	flex-direction: row;
}
.pass-item {
	flex: 7;
	margin-right: 10;
}
.button {
	flex: 3;
	margin-top: 5;
}
.reg-button {
	textDecorationLine: underline;
	padding-bottom: 30;
}
</style>