<template>
	<nb-container>
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
		    	<view class="respon-table">
		    		<touchable-opacity class="respon-row" 
		    			:style=" n%2 ? {backgroundColor: '#eee'} : ''" 
		    			v-for="n in 30"
		    			:on-press="() => navigate('DetailPertanyaan')"
		    		>
		    			<c-text class="respon-question respon-col">Pertanyaan {{ n }}</c-text>
		    			<c-text class="respon-status respon-col">{{ n%2 ? 'Terjawab' : 'belum' }}</c-text>
		    		</touchable-opacity>
		    	</view>
		    </scroll-view>
	    </view>

	</nb-container>
</template>

<script>
	import Navbar from '../item/Navbar';
	import CText from '../item/CText';

	export default {
		components: {Navbar, CText},
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
		flex-direction: column-reverse;
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