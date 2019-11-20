<template>
	<nb-container>
		<navbar :navigation="navigation" left/>

	    <view class="container">

	    	<c-text class="title" size="sm" color="dark-green" weight="semi-bold">Semua Notifikasi</c-text>

				<activity-indicator :style="{marginTop: 30}" :size="50" color="#255d00" v-if="loading"/>

	    	<view class="accordion" v-if="!loading">
  	      <nb-accordion
  	        :dataArray="notifs"
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
	import { TouchableOpacity } from "react-native";

	import Navbar from '../item/Navbar';
	import CText from '../item/CText';

	export default {
		components: {Navbar, CText},
		props: ['navigation'],
		data: () => ({
			notifs: [],
			loading: true,
		}),
		methods: {
			navigate(to) {
				this.navigation.navigate(to);
			},
			async getNotifs() {
				this.loading = true;
				const userToken = await this.$storage.getItem('@userToken');

				this.$axios.post('/api/notifications?limit=30', null, {
					headers: {'authorization' : 'Bearer '+userToken}
				})
				.then((res) => {
					this.notifs = res.data;
				})
				.catch((e) => {
					alert('gagal memuat notifikasi!');
				})
				.finally(() => {
					this.loading = false;
				});
			},
			_renderContent: function(data) {
	      return (
	      	<View style={{ backgroundColor: "#f4f4f4", padding: 10 }}>
		        <CText style={{ lineHeight: 20}}>
		          {data.body}
		        </CText>
		        <TouchableOpacity onPress={() => this.openNotif(data)}>
		        	<CText weight="bold" align="r" color="dark-green">Lihat Detail >></CText>
		        </TouchableOpacity>
	        </View>
	      );
	    },
	    _renderHeader: function({title, is_read}, expanded) {
	      return (
	        <View
	          style={{ backgroundColor: "#eee", borderBottomWidth: 1, borderColor: "#ccc", flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center"}}
	        >
	          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
	            {is_read 
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
	    async _onAccordionOpen(d, i) {
	    	this.notifs.filter((x) => x.id == d.id)[0].is_read = 1;

	    	const userToken = await this.$storage.getItem('@userToken');

				this.$axios.post('/api/notifications/read/'+d.id, null, {
					headers: {'authorization' : 'Bearer '+userToken}
				});
	    },
	    async openNotif(data) {
				const userToken = await this.$storage.getItem('@userToken');

				this.$axios.post('/api/notifications/read/'+data.id, null, {
					headers: {'authorization' : 'Bearer '+userToken}
				})

				switch(data.type) {
					case 'consultation':
						this.navigation.navigate('DetailPertanyaan', {itemId: data.target});
						break;
					case 'library':
						this.navigation.navigate('Detail', {id: data.target});
						break;
				}
			}
		},
		created() {
			this.getNotifs();
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