<template>
	<nb-container>
		<navbar :navigation="navigation" :left="true" hasTabs />

		<c-text class="title" color="dark-green" size="md" weight="semi-bold" align="c">{{ data.name }}</c-text>

		<carousel
			:data="entries"
			:item-width="screenWidth * 80 / 100"
			:slider-width="screenWidth"
			:render-item="renderSlider"
			:containerCustomStyle="{maxHeight: screenWidth * 0.6}"
			loop
		/>

		<view class="desc">

			<view class="desc-nav">
	      <touchable-opacity v-for="(n,i) in title" 
	      	class="desc-touch"
	      	:key="i"
	      	:on-press="() => changeDesc(i+1)"
	      >
	      	<view :class="['desc-button', {'desc-button-active': active == i+1}]">
		        <c-text class="desc-title"
		        	align="c"
		        	:weight="active == i+1 ? 'semi-bold' : 'regular'"
		        	:color="active == i+1 ? 'dark-green' : 'light'"
		        >{{ n }}</c-text>
		      </view>
	      </touchable-opacity>
	    </view>

		    <view class="desc-content">
		    	<scroll-view>
			    	<markdown>{{ content }}</markdown>
			    </scroll-view>
		    </view>

		</view>

		<zoom v-if="zooms.status" :src="zooms.img" :close="closeZoom"></zoom>

	</nb-container>
</template>

<script>
	import React from 'react';
	import { Dimensions, Image, View, TouchableOpacity } from 'react-native';
	import { Icon } from 'native-base';
	import axios from 'axios';
	import Markdown from 'react-native-markdown-renderer';
	import Carousel from 'react-native-snap-carousel';

	import Navbar from '../item/Navbar';
	import CText from '../item/CText';
	import Zoom from '../item/Zoom';

	export default {
		components: {Navbar, CText, Carousel, Markdown, Zoom},
		props: ['navigation'],
		data: () => ({
			active: 1,
			entries: [],
			data: {},
			title: ['Deskripsi', 'Gejala', 'Pengendalian'],
			content: '',
			zooms: {img: null, status: false}
		}),
		computed: {
			screenWidth() {
				return Dimensions.get('window').width;
			}
		},
		methods: {
			getData() {
				let id = this.navigation.getParam('id', 0);
				axios.get(this.$url+'/libraries/detail/'+id)
				.then(({data}) => {
					this.data = data;
					this.content = data.description;
					this.entries = data.images;
				});
			},
			navigate(to) {
				this.navigation.navigate(to);
			},
			changeDesc(i) {
				this.active = i;
				switch(i){
					case 1: this.content = this.data.description; break;
					case 2: this.content = this.data.indication; break;
					case 3: this.content = this.data.control; break;
				}
			},
			zooming(src) {
				this.zooms.img = src;
				this.zooms.status = true;
			},
			closeZoom() {
				this.zooms.img = null;
				this.zooms.status = false;
			},
			renderSlider({item, index}) {
				const imgwidth = this.screenWidth * 75 / 100;
				const width = this.screenWidth * 80 / 100;
				const height = this.screenWidth * 50 / 100;
				const base_url = this.$url;
				return(
					<View style={{
						justifyContent: 'center',
						alignItems: 'center',
					}}>
						<View style={{
							width: imgwidth,
							height: height,
							borderRadius: 20,
							elevation: 10,
							backgroundColor: 'white',
						}}>
							<TouchableOpacity
								onPress={() => this.zooming(base_url+'/libraries/image/'+item.thumbnail)}
								style={{
									position: 'absolute',
									top: 5, right: 5,
									zIndex: 10,
								}}
							>
								<Icon name="search-plus" type="FontAwesome5" style={{color: '#fff'}}/>
							</TouchableOpacity>
							<Image
								source={{uri: base_url+'/libraries/image/'+item.thumbnail}}
								style={{
									width: imgwidth,
									height: height,
									resizeMode: 'cover',
									borderRadius: 20,
								}}
							/>
						</View>
					</View>
				);
			}
		},
		created() {
			this.getData();
		}
	}
</script>

<style>
	.title {
		margin-vertical: 40
	}
	.desc {
		padding-horizontal: 15;
		margin-top: 20;
	}
	.desc-nav {
		flex-direction: row;
		margin-horizontal: 20;
		z-index: 1;
	}
	.desc-touch {
		flex: 1;
	}
	.desc-button {
		border-top-left-radius: 10;
		border-top-right-radius: 10;
		padding-vertical: 5;
		border-width: 1;
		background-color: #255d00;
		border-color: #558b2f;
	}
	.desc-button-active {
		background-color: white;
		border-bottom-color: white;
	}
	.desc-content {
		border-width: 1;
		border-color: #558b2f;
		padding: 10;
		margin-top: -1;
		border-radius: 10;
		max-height: 200;
	}
	.desc-text {
		line-height: 20;
	}
	
</style>