<template>
	<view class="home">

		<scroll-view scroll-x="true" class="scrollNav">
			<view class="item" :class="navIndex == index ? 'active':''" v-for="(item,index) in navlistData"
				:key="item.id" @click="clickNav(index,item.id)">{{item.classname}}</view>
		</scroll-view>

		<view class="content">

			<view class="contentBox">
				<view class="row" v-for="item in newsDta" :key="item.id">
					<newsbox @click.native="gotoDetail(item)" :item="item"></newsbox>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				navIndex: 0,
				showTime: false,
				navlistData: [],
				newsDta: [],
				cid1: 50, // 导航栏的 id
				// 节流开关
				isShowLoad: false,
				currentPage: 1,
			}
		},
		onLoad() {
			this.getNavData(); // 导航栏
			this.getNewsData(this.num); // 新闻数据
		},
		methods: {
			// 导航 跳转
			clickNav(i, b) {
				this.navIndex = i
				this.currentPage = 1
				this.cid1 = b
				this.newsDta = []
				this.getNewsData(); // 新闻数据
			},
			// 详情跳转
			gotoDetail(item) {
 
				uni.navigateTo({
					url:`/pages/detail/detail?cid=${item.classid}&id=${item.id}`
				})
			},
			// 导航条数据
			getNavData() {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/navlist.php",
					success: res => {

						this.navlistData = res.data
					}
				})
			},
			//获取新闻数据
			getNewsData() {
				// 开阀
				this.isShowLoad = true
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/newslist.php",
					data: {
						cid: this.cid1,
						page: this.currentPage
					},
					success: (res) => {
		 

						this.newsDta = [...this.newsDta, ...res.data]
						if (res.data.length === 0) return uni.$showMsg("没有更多数据了")
						this.isShowLoad = false
					},
					complete() {
						uni.stopPullDownRefresh()
					}
				})

			}
		},
		// 触底 事件
		onReachBottom() {

			if (this.isShowLoad) return // 说明 在请求 所以直接退出 反之发起请求
			this.currentPage++
			this.getNewsData()

		},
		// 下拉刷新
		onPullDownRefresh() {
			//  重置信息发起请求 并 关闭 showloading
			this.currentPage = 1
			this.newsDta = []
			this.getNewsData(); // 新闻数据
		}
	}
</script>

<style lang="scss" scoped>
	.scrollNav {
		height: 100rpx;
		background: #F7F9FA;
		width: 100%;
		position: fixed; //防止 H5端 头部 跟着内容滑动
		left: 0;
		top: var(--window-top);
		z-index: 10; // 数组越大 越占前
		white-space: nowrap; // 不换行

		/deep/ ::-webkit-scrollbar {
			/* 隐藏滚动条，但依旧具备可以滚动的功能 */
			display: block;
			width: 4px !important;
			height: 1px !important;
			overflow: auto !important;
			-webkit-appearance: auto !important;
			background: transparent !important;

		}

		.item {
			font-size: 40rpx;
			line-height: 100rpx;
			display: inline-block;
			padding: 0 30rpx;

		}

		.active {
			color: #31C27C;
		}

	}

	.content {
		padding: 0 5rpx;

		.contentBox {
			padding-top: 105rpx;
		}

		.row {
			border-bottom: 1px dashed #efefef;
			padding: 15rpx 0;
		}

	}
</style>
