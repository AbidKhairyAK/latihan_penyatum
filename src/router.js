import { createStackNavigator, createSwitchNavigator } from 'vue-native-router';

import AuthLoading from './screen/AuthLoading.vue';

import Login from './screen/Login.vue';
import Register from './screen/Register.vue';

import Home from './screen/Home.vue';
import Library from './screen/Library.vue';
import Detail from './screen/Detail.vue';
import Konsultasi from './screen/Konsultasi.vue';
import Tanya from './screen/Tanya.vue';
import DetailPertanyaan from './screen/DetailPertanyaan.vue';
import Notifikasi from './screen/Notifikasi.vue';

import Test from './screen/Test.vue';

const AppStack = createStackNavigator(
	{
		Home,
		Library,
		Detail,
		Konsultasi,
		Tanya,
		DetailPertanyaan,
		Notifikasi,
	},
	{
		initialRouteName: 'Home',
		headerMode: 'none',
	}
);

const AuthStack = createStackNavigator(
	{
		Login,
		Register
	},
	{
		initialRouteName: 'Login',
		headerMode: 'none',
	}
);

const AllStack = createSwitchNavigator(
	{
		Test,
		AuthLoading,
		AuthStack,
		AppStack,
	},
	{
		initialRouteName: 'AuthLoading',
		headerMode: 'none',
	}
)

export default AllStack;