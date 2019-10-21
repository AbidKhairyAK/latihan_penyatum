<template>
	<nb-container>
		<navbar :navigation="navigation" title="Konsultasi" left/>

	    <nb-form class="form">

				<c-text weight="semi-bold" :size="17">Judul pertanyaan:</c-text>
				<nb-item class="item input" regular>
				  <nb-input />
				</nb-item>

				<c-text weight="semi-bold" :size="17">Jenis:</c-text>
				<view class="picker-wrapper input">
					<nb-picker
						class="picker"
	          mode="dropdown"
	          :selected-value="selected"
	          :on-value-change="onValueChange"
	        >
	          <item label="Umum" value="umum" />
	          <item label="Hama" value="hama" />
	          <item label="Penyakit" value="penyakit" />
	          <item label="Abiotik" value="abiotik" />
	        </nb-picker>
	      </view>

				<c-text weight="semi-bold" :size="17">Gejala yang tampak:</c-text>
				<nb-textarea class="input" :row-span="5" bordered />

				<c-text weight="semi-bold" :size="17">Upload Foto:</c-text>
				<view class="photo-wrapper">
					<view>
						<touchable-opacity class="photo-button">
							<nb-icon name="camera" type="FontAwesome5" class="photo-icon"></nb-icon>
							<c-text weight="semi-bold">Dari Kamera</c-text>
						</touchable-opacity>
						<touchable-opacity class="photo-button">
							<nb-icon name="file-image" type="FontAwesome5" class="photo-icon"></nb-icon>
							<c-text weight="semi-bold">Dari Galeri</c-text>
						</touchable-opacity>
					</view>

					<image class="photo-image" :source="require('../../assets/img/hama1.jpg')" />
				</view>

				<nb-button full rounded class="submit" :on-press="() => navigation.goBack()">
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
	import Navbar from '../item/Navbar';
	import CText from '../item/CText';

	export default {
		components: {Navbar, CText},
		props: ['navigation'],
		data: () => ({
			selected: 'key0',
		}),
		methods: {
			navigate(to) {
				this.navigation.navigate(to);
			},
			onValueChange(val) {
				this.selected = val;
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