<template>
	<nb-container>
		<navbar :navigation="navigation" :title="ui.title" left/>

	    <nb-form class="form">

				<c-text weight="semi-bold" :size="17">{{ ui.judul }}:</c-text>
				<nb-item class="item input" regular>
				  <nb-input v-model="form.title"/>
				</nb-item>

				<c-text weight="semi-bold" :size="17">{{ ui.jenis }}:</c-text>
				<view class="picker-wrapper input">
					<nb-picker
						class="picker"
	          mode="dropdown"
	          :selected-value="selected"
	          :on-value-change="onValueChange"
	        >
	          <item :label="ui.opthama" :value="1" />
	          <item :label="ui.optpenyakit" :value="2" />
	          <item :label="ui.optabiotik" :value="3" />
	        </nb-picker>
	      </view>

				<c-text weight="semi-bold" :size="17">{{ ui.gejala }}:</c-text>
				<nb-textarea class="input" :row-span="5" bordered v-model="form.indication"/>

				<c-text weight="semi-bold" :size="17">{{ ui.upload }}:</c-text>
				<view class="photo-wrapper">
					<view>
						<touchable-opacity class="photo-button" :on-press="() => getImage('camera')">
							<nb-icon name="camera" type="FontAwesome5" class="photo-icon"></nb-icon>
							<c-text weight="semi-bold">{{ ui.camera }}</c-text>
						</touchable-opacity>
						<touchable-opacity class="photo-button" :on-press="() => getImage('galery')">
							<nb-icon name="file-image" type="FontAwesome5" class="photo-icon"></nb-icon>
							<c-text weight="semi-bold">{{ ui.galery }}</c-text>
						</touchable-opacity>
					</view>

					<image class="photo-image" :source="{uri: preview}" />
				</view>

				<activity-indicator :style="{marginTop: 30}" :size="50" color="#255d00" v-if="loading"/>

				<nb-button v-else full rounded class="submit" :on-press="() => sendData()">
			    <c-text
			    	color="light"
			    	weight="semi-bold"
			    	:size="17"
			    >SUBMIT</c-text>
			  </nb-button>
			</nb-form>

	</nb-container>
</template>

<script>
	import ImagePicker from 'react-native-image-picker';

	import Navbar from '../item/Navbar';
	import CText from '../item/CText';

	export default {
		components: {Navbar, CText},
		props: ['navigation'],
		data: () => ({
			loading: false,
			selected: 1,
			preview: null,
			form: {
				title: null, type_id: 1, indication: null, image: null
			}
		}),
		computed: {
			ui() {
				return this.$store.getters.ui.tanyaScreen;
			}
		},
		methods: {
			navigate(to) {
				this.navigation.navigate(to);
			},
			onValueChange(val) {
				this.selected = val;
				this.form.type_id = val;
			},
			getImage(mode) {
				const opt = {mediaType: 'photo'};
				if (mode == 'galery') {
					ImagePicker.launchImageLibrary(opt, (response) => {
					  this.preview = 'data:'+response.type+';base64,'+response.data;
					  this.form.image = response;
					});
				} else if (mode == 'camera') {
					ImagePicker.launchCamera(opt, (response) => {
					  this.preview = 'data:'+response.type+';base64,'+response.data;
					  this.form.image = response;
					});
				}
			},
			async sendData() {
				const f = this.form;
				const userToken = await this.$storage.getItem('@userToken');

				if (f.title==null || f.type_id==null || f.indication==null) {
					return alert('Kolom judul, tipe, dan gejala tidak boleh kosong!');
				}
				this.loading = true;
				this.$axios.post(`/api/consultations/save`, f, {
					headers: {'authorization' : 'Bearer '+userToken}
				})
				.then((r) => {
					// console.log(r.data);
					// this.loading = false;
					this.navigation.goBack();
				})
				.catch((e) => {
					this.loading = false;
					alert(e.message);
					console.log(e.response);
				});
			}
		}
	}
</script>

<style>
	.form {
		padding: 30;
	}
	.item {
		margin-left: 0;
		max-height: 40;
	}
	.input {
		border-color: #33333355;
		border-width: 1;
		margin-top: 5;
		margin-bottom: 20;
	}
	.picker-wrapper {
		overflow: hidden;
		max-height: 40;
	}
	.picker {
		margin-top: -7;
	}
	.photo-wrapper {
		flex-direction: row;
		justify-content: space-between;
		margin-top: 10;
	}
	.photo-button {
		flex-direction: row;
		align-items: center;
		margin-bottom: 20;
	}
	.photo-icon {
		font-size: 30;
		color: #555;
		width: 35;
	}
	.photo-image {
		width: 120;
		height: 80;
		resize-mode: cover;
	}
	.submit {
		background-color: #255d00;
		margin-top: 20;
	}
</style>