<template>
	<nb-container>
		<navbar :navigation="navigation" :left="true" hasTabs />
		<nb-tabs class="tabs" :onScroll="(e) => onScroll(e)" :onChangeTab="(e) => onChangeTab(e)">
			<nb-tab heading="Hama"
				:tabStyle="tab.tabStyle"
				:activeTabStyle="tab.activeTabStyle"
				:textStyle="tab.textStyle"
				:activeTextStyle="tab.activeTextStyle"
			>
				<library-list title="hama" :navigation="navigation" v-if="pos == 1"/>
				<activity-indicator :style="{marginTop: 30}" :size="50" color="#255d00" v-else/>
			</nb-tab>
			<nb-tab heading="Penyakit"
				:tabStyle="tab.tabStyle"
				:activeTabStyle="tab.activeTabStyle"
				:textStyle="tab.textStyle"
				:activeTextStyle="tab.activeTextStyle"
			>
				<library-list title="penyakit" :navigation="navigation" v-if="pos == 2"/>
				<activity-indicator :style="{marginTop: 30}" :size="50" color="#255d00" v-else/>
			</nb-tab>
			 <nb-tab heading="Abiotik"
				:tabStyle="tab.tabStyle"
				:activeTabStyle="tab.activeTabStyle"
				:textStyle="tab.textStyle"
				:activeTextStyle="tab.activeTextStyle"
			>
				<library-list title="abiotik" :navigation="navigation" v-if="pos == 3"/>
				<activity-indicator :style="{marginTop: 30}" :size="50" color="#255d00" v-else/>
			</nb-tab>
		</nb-tabs>
	</nb-container>
</template>

 <script>
	import Navbar from '../item/Navbar';
	import CText from '../item/CText';
	import LibraryList from './LibraryList';

	let tabStyle = { backgroundColor: "#558b2f"	};
	let activeTabStyle = { backgroundColor: "#558b2f"	};
	let textStyle = { color: "#eeeeee99", fontFamily: "Dosis-SemiBold"	};
	let activeTextStyle = { color: "#eee", fontFamily: "Dosis-SemiBold"	};

	export default {
		components: {Navbar, CText, LibraryList},
		props: ['navigation'],
		data: () => ({
			tab: { tabStyle, activeTabStyle, textStyle, activeTextStyle },
			pos: false,
			prev: false,
		}),
		methods: {
			navigate(to) {
				this.navigation.navigate(to);
			},
			onScroll(e) {
				this.pos = false;

				setTimeout(() => {
					if (this.pos === false) {
						this.pos = this.prev;
					}
				}, 2000)
			},
			onChangeTab(e) {
				setTimeout(() => {
					this.pos = e.i + 1;
					this.prev = e.i + 1;
				}, 100);
			}
		},
		mounted() {
			this.pos = 1;
			this.prev = 1;
		}
	}
 </script>

 <style>
 	.tabs {
 		overflow: hidden;
 	}
 </style>