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

				<c-text class="subtitle" color="dark-green" size="md" weight="semi-bold">Form Register</c-text>

				<c-text color="dark-green" class="label">Username</c-text>
				<nb-item class="item" regular>
					<nb-input class="input" v-model="form.name"/>
				</nb-item>

				<c-text color="dark-green" class="label">Email</c-text>
				<nb-item class="item" regular>
					<nb-input class="input" v-model="form.email" auto-capitalize="none" keyboard-type="email-address" text-content-type="emailAddress" auto-complete-type="email"/>
				</nb-item>

				<c-text color="dark-green" class="label">No Handphone</c-text>
				<nb-item class="item" regular>
					<nb-input class="input" v-model="form.phone" keyboard-type="number-pad"/>
				</nb-item>

				<view class="pass-wrapper">
					<view class="pass-item">
						<c-text color="dark-green" class="label">Password</c-text>
						<nb-item class="item" regular>
							<nb-input class="input" secureTextEntry v-model="form.password"/>
						</nb-item>
					</view>
					<view class="pass-item">
						<c-text color="dark-green" class="label">Ulangi Password</c-text>
						<nb-item class="item" regular>
							<nb-input class="input" secureTextEntry v-model="form.password_confirm"/>
						</nb-item>
					</view>
				</view>

				<view class="button-wrapper">
					<nb-button :on-press="() => navigation.goBack()" light small class="button"><c-text color="dark"><< Kembali</c-text></nb-button>

					<nb-button :on-press="() => reg()" success small class="button" v-if="!loading"><c-text weight="bold" color="light">Daftar >></c-text></nb-button>
					<activity-indicator :size="30" color="#255d00" v-if="loading"/>
				</view>

			</nb-form>
		</image-background>

	</nb-container>
</template>

<script>
import CText from '../item/CText';

export default {
	components: {CText},
	props: ['navigation'],
	data: () => ({
		loading: false,
		form: {
			name: null, email: null, phone: null, password: null, password_confirm: null, 
		}
	}),
	methods: {
		reg() {
			const f = this.form;
			if (f.name == null || f.email == null || f.phone == null || f.password == null || f.password_confirm == null) {
				alert('Semua kolom harus terisi!');
				return;
			}
			if (f.password != f.password_confirm) {
				alert('Kolom "Password" tidak sama dengan kolom "Ulangi Password"')
				return;
			}

			this.loading = true;
			this.$axios.post('/api/auth/register', this.form)
			.then((res) => {
				alert('registrasi berhasil!');
				this.navigation.navigate('Login');
			})
			.catch((e) => {
				const stat = e.response.status;
				if (stat == 403) {
					alert('Email sudah terpakai, Coba email lain!');
				} else {
					alert('Terjadi kesalahan dengan kode '+stat+'. silahkan hubungi admin.');
					console.log(e.response);
				}
			})
			.finally(() => {
				this.loading = false;
			})
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
	flex: 1;
}
.form {
	flex: 5;
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
.pass-wrapper {
	flex-direction: row;
	margin-right: -10;
}
.pass-item {
	flex: 1;
	margin-right: 10;
}
.button-wrapper {
	margin-top: 5;
	flex-direction: row;
	justify-content: space-between;
}
.button {
	/*align-self: flex-end;*/
}
</style>