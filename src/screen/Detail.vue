<template>
	<nb-container>
		<navbar :navigation="navigation" :left="true" hasTabs />

		<c-text class="title" color="dark-green" size="md" weight="semi-bold" align="c">{{ item.title }}</c-text>

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
	      <touchable-opacity v-for="(n,i) in data" 
	      	class="desc-touch"
	      	:key="i"
	      	:on-press="() => changeDesc(i)"
	      >
	      	<view :class="['desc-button', {'desc-button-active': active == i}]">
		        <c-text class="desc-title"
		        	align="c"
		        	:weight="active == i ? 'semi-bold' : 'regular'"
		        	:color="active == i ? 'dark-green' : 'light'"
		        >{{ n.title }}</c-text>
		      </view>
	      </touchable-opacity>
	    </view>

		    <view class="desc-content">
		    	<scroll-view>
			    	<c-text class="desc-text">{{ data[active].content }}</c-text>
			    </scroll-view>
		    </view>

		</view>
	</nb-container>
</template>

<script>
	import React from 'react';
	import { Dimensions, Image, View } from 'react-native';

	import Navbar from '../item/Navbar';
	import CText from '../item/CText';
	import Carousel from 'react-native-snap-carousel';

	export default {
		components: {Navbar, CText, Carousel},
		props: ['navigation'],
		data: () => ({
			active: 0,
			data: [
				{
					title: 'Deskripsi', 
					content: 'Aenean sollicitudin sagittis congue. Vivamus ultrices vel nibh varius efficitur. Suspendisse feugiat urna nisl, vehicula egestas nisi finibus et. Morbi bibendum imperdiet elit nec tristique.'
				},
				{
					title: 'Gejala', 
					content: '> Nulla bibendum \n> urna maximus \n> lectus \n> hendrerit scelerisque \n> Nam lobortis \n> nisi sit amet \n> orci consequat blandit'
				},
				{
					title: 'Pengendalian', 
					content: '		Donec fringilla quis est tempor lobortis. Quisque orci turpis, condimentum lacinia vulputate malesuada, finibus condimentum quam. Duis viverra porttitor finibus. Quisque tincidunt varius cursus. Integer bibendum, turpis et pretium malesuada, ex ligula volutpat arcu, ac condimentum ex massa nec elit. Donec mattis est eget felis sagittis efficitur. Curabitur non varius dui, sit amet commodo quam. \n\n 		Pellentesque volutpat magna nisl, quis placerat massa sagittis a. Donec eget nunc nec erat scelerisque euismod nec et velit. Etiam vel erat convallis, consectetur sapien in, ullamcorper nisi. Morbi accumsan convallis sem, a vehicula tortor interdum eu. Vivamus felis nibh, sodales vel venenatis eget, auctor et urna. Quisque et lacus sem. Integer mattis bibendum ornare. Nullam at justo euismod, viverra felis non, rhoncus lectus. Phasellus sed sollicitudin dui. Duis lacinia odio sit amet nisl feugiat convallis.\n\n 		Pellentesque volutpat magna nisl, quis placerat massa sagittis a. Donec eget nunc nec erat scelerisque euismod nec et velit. Etiam vel erat convallis, consectetur sapien in, ullamcorper nisi. Morbi accumsan convallis sem, a vehicula tortor interdum eu. Vivamus felis nibh, sodales vel venenatis eget, auctor et urna. Quisque et lacus sem. Integer mattis bibendum ornare. Nullam at justo euismod, viverra felis non, rhoncus lectus. Phasellus sed sollicitudin dui. Duis lacinia odio sit amet nisl feugiat convallis.\n\n 		Pellentesque volutpat magna nisl, quis placerat massa sagittis a. Donec eget nunc nec erat scelerisque euismod nec et velit. Etiam vel erat convallis, consectetur sapien in, ullamcorper nisi. Morbi accumsan convallis sem, a vehicula tortor interdum eu. Vivamus felis nibh, sodales vel venenatis eget, auctor et urna. Quisque et lacus sem. Integer mattis bibendum ornare. Nullam at justo euismod, viverra felis non, rhoncus lectus. Phasellus sed sollicitudin dui. Duis lacinia odio sit amet nisl feugiat convallis.'
				},
			]
		}),
		computed: {
			entries() {
				let ent = [];
				for (var i = 5; i >= 0; i--) {
					ent[i] = this.item.img;
				}

				return ent;
			},
			item() {
				return this.navigation.getParam('item', {});
			},
			screenWidth() {
				return Dimensions.get('window').width;
			}
		},
		methods: {
			navigate(to) {
				this.navigation.navigate(to);
			},
			changeDesc(i) {
				this.active = i;
			},
			renderSlider({item, index}) {
				const imgwidth = this.screenWidth * 75 / 100;
				const width = this.screenWidth * 80 / 100;
				const height = this.screenWidth * 50 / 100;
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
							<Image
								source={item}
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