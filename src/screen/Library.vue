<template>
	<nb-container>
		<navbar :navigation="navigation" :left="true" hasTabs />
		<nb-tabs class="tabs">
			<nb-tab :heading="ui.uchama"
				:tabStyle="tab.tabStyle"
				:activeTabStyle="tab.activeTabStyle"
				:textStyle="tab.textStyle"
				:activeTextStyle="tab.activeTextStyle"
			>
				<library-list title="hama" :s="ui.lchama" :navigation="navigation"/>
			</nb-tab>
			<nb-tab :heading="ui.ucpenyakit"
				:tabStyle="tab.tabStyle"
				:activeTabStyle="tab.activeTabStyle"
				:textStyle="tab.textStyle"
				:activeTextStyle="tab.activeTextStyle"
			>
				<library-list title="penyakit" :s="ui.lcpenyakit" :navigation="navigation"/>
			</nb-tab>
			 <nb-tab :heading="ui.ucabiotik"
				:tabStyle="tab.tabStyle"
				:activeTabStyle="tab.activeTabStyle"
				:textStyle="tab.textStyle"
				:activeTextStyle="tab.activeTextStyle"
			>
				<library-list title="abiotik" :s="ui.lcabiotik" :navigation="navigation"/>
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
		}),
		computed: {
			ui() {
				return this.$store.getters.ui.libraryScreen;
			}
		},
		methods: {
			navigate(to) {
				this.navigation.navigate(to);
			},
		},
	}
 </script>

 <style>
 	.tabs {
 		overflow: hidden;
 	}
 </style>