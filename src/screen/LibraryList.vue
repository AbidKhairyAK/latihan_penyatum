<template>
	<view class="container">
		<view class="search-wrapper">
			<nb-item rounded class="search-item">
		    <nb-input class="search-input" :placeholder="'Cari '+title+'...'"/>
		    <touchable-opacity>
			    <nb-icon name="search" class="search-icon"/>
			  </touchable-opacity>
		  </nb-item>
		</view>

	  <scroll-view>
	  	<view class="list">
	  		<touchable-opacity :on-press="() => navigate(listItem[title][n%3])" v-for="n in 22" class="list-item" :key="n">
		  		<view>
		  			<view class="list-image-wrapper" :on-layout="(event) => getListWidth(event)">
		  				<image class="list-image" 
		  					resize-mode="contain" 
		  					:source="listItem[title][n%3].img" 
		  					:style="{height: listWidth}"
		  				/>
		  			</view>
		  			<c-text class="list-title" align="c" :size="11">{{ listItem[title][n%3].title }}</c-text>
		  		</view>
		  	</touchable-opacity>
	  	</view>
	  </scroll-view>
	</view>
</template>

<script>
	import CText from '../item/CText';

	export default {
		components: {CText},
		props: ['navigation', 'title'],
		data: () => ({
			listWidth: 0,
			listItem:{
				hama: [
					{title: 'Tungau', img: require(`../../assets/img/hama1.jpg`)},
					{title: 'Ulat Grayak', img: require(`../../assets/img/hama2.jpg`)},
					{title: 'Kutu Putih', img: require(`../../assets/img/hama3.jpg`)},
				],
				penyakit: [
					{title: 'Hawar Daun Bakteri', img: require(`../../assets/img/penyakit1.jpg`)},
					{title: 'Layu Fusarium', img: require(`../../assets/img/penyakit2.jpg`)},
					{title: 'Bercak Daun', img: require(`../../assets/img/penyakit3.jpg`)},
				],
				abiotik: [
					{title: 'Kurang Nutrisi', img: require(`../../assets/img/abiotik1.jpg`)},
					{title: 'Overwatering', img: require(`../../assets/img/abiotik2.jpg`)},
					{title: 'Suhu', img: require(`../../assets/img/abiotik3.jpg`)},
				]
			}
		}),
		methods: {
			getListWidth(event) {
				this.listWidth = event.nativeEvent.layout.width;
			},
			navigate(item) {
				this.navigation.navigate('Detail', {item});
			}
		}
	}
</script>

<style scoped>
	.search-wrapper {
		margin-horizontal: 15;
		margin-top: 30;
		margin-bottom: 10;
	}
	.search-item {
		padding-horizontal: 10;
	}
	.search-input {
		font-family: Dosis-Regular;
	}
	.search-icon {
		background-color: #558b2f;
		padding-vertical: 5;
		border-radius: 20;
		color: #eee;
	}
	.list {
		padding-top: 20;
		padding-bottom: 100;
		padding-horizontal: 15;
		flex-direction: row;
		flex-wrap: wrap;
		/*justify-content: space-between;*/
	}
	.list-item {
		width: 22%;
		background-color: #fff;
		border-radius: 10;
		overflow: hidden;
		elevation: 5;
		margin-bottom: 15;
		margin-horizontal: 1.5%;
	}
	.list-image-wrapper {
		width: 100%;
		aspect-ratio: 1;
		overflow: hidden;
	}
	.list-image {
		width: 200%;
		align-self: center;
	}
	.list-title {
		padding: 5;
	}
</style>