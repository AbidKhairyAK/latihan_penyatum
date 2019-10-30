<template>
	<nb-container>
		<navbar :navigation="navigation" title="Konsultasi" left/>

		<view class="container">
			<activity-indicator v-if="loading" :style="{marginTop: 30}" :size="50" color="#255d00"/>

			<scroll-view v-else>
				<view class="wrapper">

					<view class="image-wrapper">
						<image class="image" :source="{uri: 'http://209.97.169.78:4367/consultations/image/'+item.image}" />
					</view>

					<nb-badge class="badge">
		          <c-text weight="semi-bold" color="light">{{ item.type.name }}</c-text>
		      </nb-badge>
					<c-text class="question" size="sm" weight="semi-bold" color="dark-green">{{ item.title }}</c-text>

					<markdown>{{ item.indication }}</markdown>

					<c-text class="question" size="sm" weight="semi-bold" color="dark-green">Jawaban:</c-text>

					<markdown>{{ item.answer }}</markdown>


				</view>
			</scroll-view>
		</view>

	</nb-container>
</template>

<script>
	import axios from 'axios';
	import Markdown from 'react-native-markdown-renderer';

	import Navbar from '../item/Navbar';
	import CText from '../item/CText';

	export default {
		props: ['navigation'],
		components: {Navbar, CText, Markdown},
		data: () => ({
			loading: true,
			item: {}
		}),
		methods: {
			getData() {
				const itemId = this.navigation.getParam('itemId', '0');

				axios.get(`http://209.97.169.78:4367/consultations/detail/${itemId}`)
				.then((r) => {
					this.item = r.data;
					this.loading = false;
				});
			}
		},
		created() {
			this.getData();
		}
	}
</script>

<style>
	.container {
		padding-vertical: 30;
		flex: 1;
	}
	.wrapper {
		padding-horizontal: 15;
	}
	.image-wrapper {
		elevation: 5;
		margin-bottom: 15;
		border-radius: 10;
		background-color: white;
		overflow: hidden;
	}
	.image {
		width: 100%;
		height: 100;
		resize-mode: cover;
	}
	.badge {
		background-color: #255d00;
		margin-top: -30;
		elevation: 6;
		width: 100;
		align-items: center;
	}
	.question {
		line-height: 30;
		margin-bottom: 15;
	}
	.desc {
		line-height: 20;
	}
</style>