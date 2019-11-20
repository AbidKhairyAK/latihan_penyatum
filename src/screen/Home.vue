<template>
	<nb-container>
		<navbar :navigation="navigation" right/>

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

		<activity-indicator :style="{marginTop: 30}" :size="50" color="#255d00" v-if="loading"/>

		<view class="notif-wrapper" v-if="!loading">
			<c-text class="notif-header" color="dark-green" size="sm" weight="semi-bold">Notifikasi:</c-text>

			<touchable-opacity v-for="notif in notifs" :on-press="() => openNotif(notif)">
				<c-text 
					class="notif-item" 
					:weight="notif.is_read ? null : 'bold'"
					:color="notif.is_read ? null : 'dark-green'"
				>> {{ notif.title }}</c-text>
			</touchable-opacity>

			<touchable-opacity class="notif-more" :on-press="() => navigate('Notifikasi')">
				<c-text color="dark-green" weight="semi-bold">Lihat semua notifikasi ></c-text>
			</touchable-opacity>
		</view>

	</nb-container>
</template>

<script>
	import Navbar from '../item/Navbar';
	import CText from '../item/CText';
	import OneSignal from 'react-native-onesignal';

	export default {
		components: {Navbar, CText},
		props: ['navigation'],
		data: () => ({
			notifs: [],
			loading: true,
		}),
		methods: {
			navigate(to) {
				this.navigation.navigate(to);
			},
			async getNotif() {
				this.loading = true;
				const userToken = await this.$storage.getItem('@userToken');

				this.$axios.post('/api/notifications?limit=3', null, {
					headers: {'authorization' : 'Bearer '+userToken}
				})
				.then((res) => {
					this.notifs = res.data;
				})
				.catch((e) => {
					alert('gagal memuat notifikasi!');
				})
				.finally(() => {
					this.loading = false;
				})

			},
			onOpened(openResult) {
				const data = openResult.notification.payload.additionalData;

				this.openNotif(data);
			},
			onReceived() {
			    this.getNotif();
			},
			async onIds(device) {
				const savedId = await this.$storage.getItem('@onesignal_id');
				const userToken = await this.$storage.getItem('@userToken');

				if (savedId != device.userId) {
					this.$axios.post('/api/auth/onesignal/'+device.userId, null, {
						headers: {'authorization' : 'Bearer '+userToken}
					})
					.then(() => {
						this.$storage.setItem('@onesignal_id', device.userId);
					})
				}
			},
			async openNotif(data) {
				this.notifs.filter(x => x.id == data.id)[0].is_read = 1;

				const userToken = await this.$storage.getItem('@userToken');

				this.$axios.post('/api/notifications/read/'+data.id, null, {
					headers: {'authorization' : 'Bearer '+userToken}
				});

				switch(data.type) {
					case 'consultation':
						this.navigation.navigate('DetailPertanyaan', {itemId: data.target});
						break;
					case 'library':
						this.navigation.navigate('Detail', {id: data.target});
						break;
				}
			}
		},
		created() {
			OneSignal.init("3a21a614-4fe5-4024-a3fd-9f055d3c8786");
			OneSignal.addEventListener('received', this.onReceived);
		    OneSignal.addEventListener('opened', this.onOpened);
		    OneSignal.addEventListener('ids', this.onIds);

		    this.getNotif();
		},
		destroyed() {
		    OneSignal.removeEventListener('opened', this.onOpened);
		    OneSignal.removeEventListener('ids', this.onIds);
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