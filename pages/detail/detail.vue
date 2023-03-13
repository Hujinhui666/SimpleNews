<template>
	<view class="detail">

		<view class="titel">
			{{detailList.title}}
		</view>

		<view class="info">
			<view class="author">
				{{detailList.author}}
			</view>
			<view class="time">
				发布时间:{{detailList.posttime}}
			</view>
		</view>

		<view class="content">
			<rich-text :nodes="detailList.content"></rich-text>
		</view>

		<view class="description">
			版权声明
		</view>
	</view>
</template>

<script>
	import {
		parseTime
	} from "@/utils/tools.js"
	export default {
		data() {
			return {
				option: {},
				detailList: []
			};
		},
		onLoad(e) {
			this.option = e,
				this.getDetail()
		},
		methods: {
			getDetail() {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/detail.php",
					data: this.option,
					success: res => {
						// 解决 小程序端 问题
						res.data.content = res.data.content.replace(/<img/gi, '<img style="max-width:100%"')
						// 时间戳 转 时间  库
						res.data.posttime = parseTime(res.data.posttime)

						uni.setNavigationBarTitle({
							title: res.data.title
						});
						this.detailList = res.data

						this.historyDetail()
					}
				})
			},
			// 存储历史记录
			historyDetail() {
				let historyArr = uni.getStorageSync("historyArr") || []
				let item = {
					title: this.detailList.title,
					id: this.detailList.id,
					classid: this.detailList.classid,
					picurl: this.detailList.picurl,
					looktime: parseTime(Date.now())
				}
				// let historyArr={historyArr, ...item}
			
				// 除重
				let index=historyArr.findIndex(i=>{
					return i.id == this.detailList.id
				})
				if(index>=0){
					historyArr.splice(index,1)
				}

				historyArr.unshift(item)

			// 只要前十条记录
			historyArr=historyArr.splice(0,11)
				
				// let arr = [...new Set(historyArr)]

				uni.setStorageSync("historyArr", historyArr)
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 15rpx;
	}

	.title {
		font-size: 46rpx;
		color: #333;
		padding-bottom: 10rpx !important;
	}

	// 作者 时间
	.info {
		margin-top: 10rpx;
		background: #F6F6F6;
		display: flex;
		padding: 18rpx 15rpx;
		justify-content: space-between;
		font-size: 25rpx;
		color: #666
	}

	.content {

		padding-bottom: 50rpx;
		// /deep/ img{ //解决了 H5端 但并没解决 小程序端的图片问题
		// 	max-width: 100%;
		// }
	}

	.description {
		background: #FEF0F0;
		font-size: 26rpx;
		padding: 20rpx;
		color: #F89898;
		line-height: 1.8em;

	}
</style>
