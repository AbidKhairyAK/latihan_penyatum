<template>
	<nb-header class="header" :hasTabs="hasTabs">
		<status-bar backgroundColor="#255d00" :translucent="false" barStyle="light-content" />
		<nb-left v-if="left" class="left">
			<nb-button transparent :on-press="() => navigation.goBack()">
				<nb-icon name="arrow-back" />
			</nb-button>
		</nb-left>
		<nb-body>
			<nb-title></nb-title>
		</nb-body>
		<nb-right v-if="right">
		</nb-right>
		<text class="title">{{ title }}</text>
	</nb-header>
</template>

<script>
	export default {
		props: {
				navigation: Object,
				left: {default: false},
				right: {default: false},
				hasTabs: {default: false},
				title: {default: 'PestBook'}
		},
	}
</script>

<style scoped>
	.header {
		background-color: #558b2f;
	}
	.title {
		position: absolute;
		left: 0; right: 0; top: 10;
		text-align: center;
		font-family: Dosis-ExtraBold;
		font-size: 25; 
		color: #eee;
	}
	.left {
		z-index: 1;
	}
</style>