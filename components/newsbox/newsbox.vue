<template>
	<view class="content">
		<view class="pic">
			<img :src="item.picurl" mode="aspectFill">
		</view>

		<view class="contentTxt">
			<view class="title">
				{{item.title}}
			</view>
			<view class="info" v-if="!isShiow">

				<text>作者:{{item.author}}</text>
				<text>--{{item.hits}}人浏览</text>
			</view>
			<view class="info" v-else>
				<view>浏览时间: {{item.looktime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "newsbox",
		data() { 
			return {
				 
			};
		},
		props: {
			item: {
				type: Object,
				default () {
					return {
						title: "默认标题",
						picurl: "../../static/images/ccontentImages/pic1.png",
						author: "张三",
						hits: "999",
						looktime: "2022-12-02 10:10:10"
					}
				}
			},
			isShiow: {
				type: Boolean,
				default: false
			}
		}

	}
</script>

<style lang="scss">
	.content {
		display: flex;
		justify-content: space-between;
	}

	.pic {
		width: 230rpx;
		height: 160rpx;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.contentTxt {
		padding-left: 20rpx;
		// flex-grow: 1;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.title {
			font-size: 36rpx;
			color: #333;

			text-overflow: -o-ellipsis-lastline;
			text-overflow: ellipsis; //溢出 省略号
			overflow: hidden;
			display: -webkit-box; // 特别显示模式
			-webkit-line-clamp: 2; // 行数
			line-clamp: 2;
			-webkit-box-orient: vertical; // 盒子中内容竖直排列
		}

		.info {
			font-size: 26rpx;
			color: #999;

			:nth-child(1) {
				margin-right: 15rpx;
			}
		}

	}
</style>
