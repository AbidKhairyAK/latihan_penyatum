<template>
	<nb-container>
		<navbar :navigation="navigation" title="Konsultasi" left/>

		<view class="container">
			<scroll-view>
				<view class="wrapper">

					<view class="image-wrapper">
						<image class="image" :source="require('../../assets/img/hama3.jpg')" />
					</view>

					<nb-badge class="badge">
		          <c-text weight="semi-bold" color="light">Hama</c-text>
		      </nb-badge>
					<c-text class="question" size="sm" weight="semi-bold" color="dark-green">Etiam iaculis felis quam, vel cursus erat Nulla euismod arcu?</c-text>

					<c-text class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet pretium ornare. Fusce ut ipsum finibus mi lacinia iaculis eget ac lacus. Pellentesque mi nunc, dignissim ut massa nec, pulvinar porta lacus.
					{{'\n'}}> eget ac lacus.{{'\n'}}> Fusce ut.{{'\n'}}> pulvinar porta lacus.{{'\n'}}> retium ornare.
					{{'\n'}}Vestibulum eleifend sodales dui a auctor. Nam tempus enim nec imperdiet tristique?
					</c-text>

					<c-text class="question" size="sm" weight="semi-bold" color="dark-green">Jawaban:</c-text>

					<c-text class="desc">Mauris pharetra vehicula semper. Vestibulum nec libero pharetra, volutpat turpis eget, posuere justo. Maecenas lobortis facilisis lorem, vel porttitor mauris hendrerit sit amet. Vestibulum justo dolor, tristique et ultricies id, feugiat vel velit. Sed nunc lectus, accumsan.
					{{'\n'}}Mauris pharetra vehicula semper. Vestibulum nec libero pharetra, volutpat turpis eget, posuere justo. Maecenas lobortis facilisis lorem, vel porttitor mauris hendrerit sit amet. Vestibulum justo dolor, tristique et ultricies id, feugiat vel velit. Sed nunc lectus, accumsan.
					</c-text>


				</view>
			</scroll-view>
		</view>

	</nb-container>
</template>

<script>
	import Navbar from '../item/Navbar';
	import CText from '../item/CText';

	export default {
		props: ['navigation'],
		components: {Navbar, CText},
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