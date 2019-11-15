<template>
	<nb-container>
		<navigation-events :on-will-focus="() => getData()"></navigation-events>

		<navbar :navigation="navigation" title="Konsultasi" left/>

    <view class="container">
    	<nb-button full rounded class="ask" :on-press="() => navigate('Tanya')">
        <c-text
        	color="light"
        	weight="medium"
        	:size="17"
        >Ajukan pertanyaan ></c-text>
      </nb-button>

    	<c-text class="respon-title" size="sm" color="dark-green" weight="semi-bold">Respon pertanyaan anda</c-text>

    	<scroll-view>
			<activity-indicator v-if="loading" :style="{marginTop: 30}" :size="50" color="#255d00"/>
	    	<view class="respon-table" v-else>
	    		<touchable-opacity class="respon-row" 
	    			:style=" i%2 ? {backgroundColor: '#eee'} : ''" 
	    			v-for="(item, i) in items"
	    			:on-press="() => navigate('DetailPertanyaan', {itemId: item.id})"
	    		>
	    			<c-text class="respon-question respon-col">{{ item.title }}</c-text>
	    			<c-text class="respon-status respon-col">{{ item.status }}</c-text>
	    		</touchable-opacity>
	    	</view>
	    </scroll-view>
    </view>

	</nb-container>
</template>

<script>
	import axios from 'axios';
	import { NavigationEvents } from 'vue-native-router';
	import AsyncStorage from '@react-native-community/async-storage';

	import Navbar from '../item/Navbar';
	import CText from '../item/CText';

	export default {
		components: {Navbar, CText, NavigationEvents},
		props: ['navigation'],
		data: () => ({
			items: [],
			loading: true,
		}),
		methods: {
			async getData() {
				const userToken = await AsyncStorage.getItem('@userToken');

				this.loading = true;
				axios.post(`${this.$url}/api/consultations/list`, {}, {
					headers: {'authorization' : 'Bearer '+userToken}
				})
				.then((r) => {
					this.items = r.data.data;
					this.loading = false;
				})
				.catch((e) => {
					alert(e.message);
					console.log(e.response);
				});
			},
			navigate(to, param) {
				this.navigation.navigate(to, param);
			},
		},
		created() {
			this.getData();
		}
	}
</script>

<style>
	.container {
		padding-vertical: 30;
		padding-horizontal: 15;
		flex: 1;
	}
	.ask {
		background-color: #255d00;
		margin-bottom: 30;
	}
	.respon-title {
		margin-bottom: 15;
	}
	.respon-table {
		border-width: 1;
		border-color: #255d00;
	}
	.respon-row {
		flex-direction: row;
	}
	.respon-col {
		padding: 5;
	}
	.respon-question {
		flex: 2;
		border-right-width: 1;
		border-right-color: #255d00;
	}
	.respon-status {
		flex: 1;
	}
</style>