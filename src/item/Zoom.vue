<template>
	<view class="container">
		<image-zoom 
			:crop-width="win.width"
			:crop-height="win.height"
			:image-width="win.width"
			:image-height="win.height"
		>
            <image 
            	class="photo"
            	resize-mode="contain"
				:source="{uri: src}"
				:on-load-start="() => load(true)"
				:on-load-end="() => load(false)"
            /></image>
        </image-zoom>
		<activity-indicator class="loading" :size="50" color="#558b2f" v-if="loading"/>
		<touchable-opacity class="close-wrapper" :on-press="close">
			<nb-icon class="close" type="FontAwesome5" name="times"></nb-icon>
		</touchable-opacity>
	</view>
</template>

<script>
	import ImageZoom from 'react-native-image-pan-zoom';
	import { Dimensions } from 'react-native';

	export default {
		components: {ImageZoom},
		props: ['src', 'close'],
		data: () => ({
			loading: true,
			win: Dimensions.get('window'),
		}),
		methods: {
			load(status) {
				this.loading = status;
			}
		}
	}
</script>

<style>
	.container {
		flex: 1;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0; bottom: 0; left: 0; right: 0;
		z-index: 10;
		background-color: #000;
	}
	.photo {
		width: 100%;
		height: 100%;
	}
	.close-wrapper {
		position: absolute;
		bottom: 30;
	}
	.close {
		color: #000;
		background-color: #558b2f;
		width: 30;
		height: 30;
		text-align: center;
		border-radius: 15;
	}
	.loading {
		position: absolute;
	}
</style>