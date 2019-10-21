<template>
	<nb-container>
		<navbar title="Konsultasi" left/>

		<view class="container">
			<scroll-view>

				<view class="wrapper">
					<c-text class="title" size="sm" weight="semi-bold">Pertanyaan:</c-text>
					<c-text class="content" size="sm">Etiam iaculis felis quam, vel cursus erat.</c-text>
				</view>

				<view class="wrapper">
					<c-text class="title" size="sm" weight="semi-bold">Jenis:</c-text>
					<c-text class="content" size="sm">Hama</c-text>
				</view>

				<view class="wrapper">
					<c-text class="title" size="sm" weight="semi-bold">Gambar:</c-text>
					<image class="image" :source="require('../../assets/img/hama1.jpg')" />
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
	}
</script>

<style>
	.container {
		padding-horizontal: 15;
		padding-vertical: 30;
		flex: 1;
	}
	.wrapper {
		flex-direction: row;
		align-items: flex-start;
		margin-bottom: 20;
	}
	.title {
		margin-right: 10;
	}
	.image {
		width: 200;
		height: 150;
		resize-mode: cover;
	}
</style>