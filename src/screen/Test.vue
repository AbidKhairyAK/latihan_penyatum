<template>
	<view class="container">
		<touchable-opacity :on-press="() => zooming('https://i.ytimg.com/vi/MpfRV9-2sDc/mqdefault.jpg')">
			<image
				class="img"
				:source="{uri: 'https://i.ytimg.com/vi/MpfRV9-2sDc/mqdefault.jpg'}"
			></image>
		</touchable-opacity>
		<zoom v-if="status" :src="cur" :close="closeZoom"></zoom>
	</view>
</template>

<script>
	import Zoom from '../item/Zoom';

	export default {
		components: {Zoom},
		data: () => ({
			status: false,
			cur: null,
		}),
		methods: {
			closeZoom() {
				this.cur = null;
				this.status = false;
			},
			zooming(src) {
				this.cur = src;
				this.status = true;
			}
		}
	}
</script>

<style>
	.container {
		flex: 1;
		justify-content: center;
		align-items: center;
	}
	.img {
		width: 300;
		height: 300;
		resize-mode: center;
	}
</style>