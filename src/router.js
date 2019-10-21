import { createStackNavigator } from 'vue-native-router';

import Login from './screen/Login.vue';
import Register from './screen/Register.vue';
import Home from './screen/Home.vue';
import Library from './screen/Library.vue';
import Detail from './screen/Detail.vue';
import Konsultasi from './screen/Konsultasi.vue';
import Tanya from './screen/Tanya.vue';
import DetailPertanyaan from './screen/DetailPertanyaan.vue';
import Notifikasi from './screen/Notifikasi.vue';

const StackNavigatior = createStackNavigator(
	{
		Login,
		Register,
		Home,
		Library,
		Detail,
		Konsultasi,
		Tanya,
		DetailPertanyaan,
		Notifikasi,
	},
	{
		initialRouteName: 'Login',
		headerMode: 'none',
	}
);

export default StackNavigatior;