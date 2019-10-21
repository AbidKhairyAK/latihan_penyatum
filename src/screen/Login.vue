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

		    	<c-text class="subtitle" color="dark-green" size="md" weight="semi-bold">Form Login</c-text>

		      <c-text color="dark-green" class="label">Username</c-text>
		      <nb-item class="item" regular>
		        <nb-input class="input"/>
		      </nb-item>

			    <c-text color="dark-green" class="label">Password</c-text>
		      <view class="pass">
			      <nb-item class="item pass-item" regular>
			        <nb-input class="input" secureTextEntry />
			      </nb-item>

		      	<nb-button success full small class="button" :on-press="() => navigate('Home')"><c-text weight="bold" color="light">Login >></c-text></nb-button>
			    </view>
				
				<touchable-opacity :on-press="() => navigate('Register')"><c-text class="reg-button" color="dark-green">Belum punya akun? Registrasi</c-text></touchable-opacity>
		    </nb-form>
		  </image-background>

	</nb-container>
</template>

<script>
import CText from '../item/CText';

export default {
	components: {CText},
	props: ['navigation'],
	methods: {
		navigate(to) {
			this.navigation.navigate(to);
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