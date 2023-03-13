<template>
	<view class="user">
		<view class="top">
			<img src="../../static/images/history.png" mode="" />
			<text class="text">浏览历史</text>
		</view>

		<view class="content">
			<view class="contentBox">
				<view class="row" v-for="item in Detial" :key="item.id">
					<newsbox :isShiow="true" :item="item" @click.native="goDetail(item)"></newsbox>
				</view>
			</view>
		</view>
		<view class="nohistory" v-if="!Detial.length">
			<image src="../../static/nohis.png" mode="widthFix"></image>
			<view class="text">暂无浏览记录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Detial: []
			};
		},
		methods: {
			godetail() {

			},
			// 获取缓存记录
			getDetail() {
				let hisArr = uni.getStorageSync("historyArr") || []
				this.Detial = hisArr
			},
			// 跳转 详情
			goDetail(item) {
				uni.navigateTo({
					url: `/pages/detail/detail?cid=${item.classid}&id=${item.id}`
				})
			}
		},
		onShow() {
			this.getDetail()
		},
		onLoad() {
			this.getDetail()
		}

	}
</script>

<style lang="scss">
	.user {
		.top {
			padding: 50rpx;
			background: #F8F8F8;
			color: #555;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		img {
			width: 150rpx;
			height: 150rpx;
		}

		.text {
			font-size: 38rpx;
		}
	}



	.content {
		padding: 0 5rpx;

		.row {
			border-bottom: 1px dashed #efefef;
			padding: 15rpx 0;
		}

	}

	.nohistory {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			width: 450rpx;
		}

		.text {
			font-size: 26rpx;
			color: #888;
		}
	}
</style>
