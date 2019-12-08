<template>
	<touchable-opacity class="wrapper" :on-press="() => changeLang()">
			<nb-icon class="button" 
				name="language" 
				type="MaterialIcons"
				:style="{color: white ? '#fff' : '#1b5e20'}"
			></nb-icon>
			<c-text class="label" 
				:color="white ? 'light' : 'dark-green'" 
				weight="bold"
			>{{ lang }}</c-text>
	</touchable-opacity>
</template>

<script>
	import CText from './CText';

	export default {
		components: {CText},
		props: ['white'],
		computed: {
			lang() {
				return this.$store.state.lang;
			}
		},
		methods: {
			changeLang() {
				let changeTo = this.lang == 'IND' ? 'ENG' : 'IND';
				this.$store.dispatch('changeLang', changeTo);
			}
		}
	}
</script>

<style>
	.wrapper {
		align-items: center;
		flex-direction: row;
	}
	.button {
		font-size: 20;
	}
</style>