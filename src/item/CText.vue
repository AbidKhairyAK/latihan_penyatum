<template>
	<nb-text selectable :style="{ 
		fontFamily: textWeight, 
		color: textColor, 
		fontSize: textSize, 
		textAlign: textAlign, 
		textShadowColor: border_color,
		textShadowRadius: border_width,
	}">
		<slot></slot>
	</nb-text>
</template>

<script>
	export default {
		props: {
			weight: 'extra-bold' | 'semi-bold' | 'bold' | 'medium' | 'light' | 'extra-light',
			color: 'light' | 'dark' | 'dark-green' | String,
			size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Number,
			align: 'c' | 'l' | 'r',
			border_color: String,
			border_width: Number,
		},
		computed: {
			font() {
				return 'Dosis' + '-';
			},
			textWeight() {
				switch(this.weight) {
					case 'extra-bold': return this.font + 'ExtraBold'; break; 
					case 'semi-bold': return this.font + 'SemiBold'; break; 
					case 'bold': return this.font + 'Bold'; break; 
					case 'medium': return this.font + 'Medium'; break; 
					case 'light': return this.font + 'Light'; break; 
					case 'extra-light': return this.font + 'ExtraLight'; break; 
					default: return this.font + 'Regular'; break;
				}
			},
			textColor() {
				if (this.color && this.color.indexOf('#') > -1) return this.color;
				switch(this.color) {
					case 'light': return '#eee'; break;
					case 'dark': return '#333'; break;
					case 'dark-green': return '#1b5e20'; break;
					default: return '#333'; break;
				}
			},
			textSize() {
				if (this.size && Number.isInteger(this.size)) return this.size;

				switch(this.size) {
					case 'xs': return 14; break;
					case 'sm': return 20; break;
					case 'md': return 25; break;
					case 'lg': return 40; break;
					case 'xl': return 50; break;
					default: return 14; break;
				}
			},
			textAlign() {
				switch(this.align) {
					case 'c': return 'center'; break;
					case 'l': return 'left'; break;
					case 'r': return 'right'; break;
					default: return 'left'; break;
				}
			}
		}
	}
</script>