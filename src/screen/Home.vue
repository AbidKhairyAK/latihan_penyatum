<template>
	<nb-container>
		<navbar />

		<view class="menu-wrapper">
				<view class="menu-item-wrapper">
					<touchable-opacity :on-press="() => navigate('Library')">
						<view class="menu-item">
							<nb-icon name="pagelines" type="FontAwesome5" class="menu-icon" />
							<view class="menu-caption">
								<c-text class="menu-title" size="md" color="dark-green" weight="semi-bold">Library HPT</c-text>
								<c-text class="menu-subtitle" size="sm">Phasellus et blandit elit. Suspendisse sit amet vulputate libero.</c-text>
							</view>
						</view>
					</touchable-opacity>
				</view>
				<view class="menu-item-wrapper">
					<touchable-opacity :on-press="() => navigate('Konsultasi')">
						<view class="menu-item">
							<nb-icon name="camera-retro" type="FontAwesome5" class="menu-icon" />
							<view class="menu-caption">
								<c-text class="menu-title" size="md" color="dark-green" weight="semi-bold">Konsultasi</c-text>
								<c-text class="menu-subtitle" size="sm">Phasellus et blandit elit. Suspendisse sit amet vulputate libero.</c-text>
							</view>
						</view>
					</touchable-opacity>
				</view>
		</view>

		<view class="notif-wrapper">
			<c-text class="notif-header" color="dark-green" size="sm" weight="semi-bold">Notifikasi:</c-text>

			<c-text class="notif-item">> Phasellus et blandit elit. Suspendisse sit amet...</c-text>
			<c-text class="notif-item">> Phasellus et blandit elit. Suspendisse sit amet...</c-text>
			<c-text class="notif-item">> Phasellus et blandit elit. Suspendisse sit amet...</c-text>

			<touchable-opacity class="notif-more" :on-press="() => navigate('Notifikasi')">
				<c-text color="dark-green" weight="semi-bold">Lihat semua notifikasi ></c-text>
			</touchable-opacity>
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
			},
		}
	}
</script>

<style>
	.menu-wrapper {
		flex: 4;
		justify-content: center;
		align-items: center;
	}
	.menu-item-wrapper {
		width: 80%;
	}
	.menu-item {
		flex-direction: row;
	}
	.menu-icon {
		color: #558b2f;
		font-size: 70;
		flex: 2
	}
	.menu-caption {
		flex: 4;
		margin-bottom: 50;
	}
	.menu-title {
		margin-bottom: 5;
	}
	.notif-wrapper {
		flex: 1;
		margin-horizontal: 15;
		margin-bottom: 15;
		elevation: 1;
		padding: 5;
		border-radius: 10;
		border-width: 2;
		border-color: #558b2f;
	}
	.notif-header {
		margin-bottom: 5;
	}
	.notif-item {
		margin-bottom: 5;
	}
	.notif-more {
		position: absolute;
		bottom: 5; right: 5;
	}

</style>