<template>
	<nb-container>
		<navbar :navigation="navigation" :left="true" hasTabs />
		<nb-tabs class="tabs">
			<nb-tab heading="Hama"
				:tabStyle="tab.tabStyle"
				:activeTabStyle="tab.activeTabStyle"
				:textStyle="tab.textStyle"
				:activeTextStyle="tab.activeTextStyle"
			>
				<library-list title="hama" :navigation="navigation"/>
			</nb-tab>
			<nb-tab heading="Penyakit"
				:tabStyle="tab.tabStyle"
				:activeTabStyle="tab.activeTabStyle"
				:textStyle="tab.textStyle"
				:activeTextStyle="tab.activeTextStyle"
			>
				<library-list title="penyakit" :navigation="navigation"/>
			</nb-tab>
			 <nb-tab heading="Abiotik"
				:tabStyle="tab.tabStyle"
				:activeTabStyle="tab.activeTabStyle"
				:textStyle="tab.textStyle"
				:activeTextStyle="tab.activeTextStyle"
			>
				<library-list title="abiotik" :navigation="navigation"/>
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