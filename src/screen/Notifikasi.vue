<template>
	<nb-container>
		<navbar :navigation="navigation" left/>

	    <view class="container">

	    	<c-text class="title" size="sm" color="dark-green" weight="semi-bold">Semua Notifikasi</c-text>
	    	<view class="accordion">
  	      <nb-accordion
  	        :dataArray="dataArray"
				    :renderHeader="_renderHeader"
				    :renderContent="_renderContent"
				    :onAccordionOpen="_onAccordionOpen"
  	      />
  	    </view>
	    </view>

	</nb-container>
</template>

<script>
	import React from "react";
	import { View, Text, Icon } from "native-base";

	import Navbar from '../item/Navbar';
	import CText from '../item/CText';

	export default {
		components: {Navbar, CText},
		props: ['navigation'],
		computed: {
			dataArray() {
				let arr = [];
				for (var i = 30; i >= 0; i--) {
					arr[i] = { 'status': (i>4), 'title': `Judul Notifikasi ${i}`, 'content': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in sagittis urna, vitae tempus ligula. Duis hendrerit orci velit, at fringilla erat aliquet at. Nam aliquet semper pellentesque. Cras imperdiet dapibus faucibus. Quisque ut eros tempor, vestibulum libero eu, rhoncus massa." };
				}
				return arr;
			}
		},
		methods: {
			navigate(to) {
				this.navigation.navigate(to);
			},
			_renderContent: function({content}) {
	      return (
	        <CText style={{ backgroundColor: "#f4f4f4", padding: 10, lineHeight: 20}}>
	          {content}
	        </CText>
	      );
	    },
	    _renderHeader: function({title, status}, expanded) {
	      return (
	        <View
	          style={{ backgroundColor: "#eee", borderBottomWidth: 1, borderColor: "#ccc", flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center"}}
	        >
	          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
	            {status 
	            	? <Icon style={{ fontSize: 13, width: 25, color: '#555' }} name="check"  type="FontAwesome5"/> 
	            	: <Icon style={{ fontSize: 13, width: 25, color: '#555' }} name="exclamation"  type="FontAwesome5"/> 
	            }
	            	<CText size={17}>{title}</CText>
	          </View>
	          {expanded
	            ? <Icon style={{ fontSize: 18, color: '#555' }} name="angle-down" type="FontAwesome5" />
	            : <Icon style={{ fontSize: 18, color: '#555' }} name="angle-right" type="FontAwesome5" />
	          }
	        </View>
	      );
	    },
	    _onAccordionOpen(d, i) {
	    	this.dataArray[i].status = true;
	    }
		}
	}
</script>

<style>
	.container {
		padding-vertical: 30;
		padding-horizontal: 15;
		margin-bottom: 30;
		flex: 1;
	}
	.title {
		margin-bottom: 15;
	}
	.accordion {
		border-radius: 10;
		overflow: hidden;
	}
</style>