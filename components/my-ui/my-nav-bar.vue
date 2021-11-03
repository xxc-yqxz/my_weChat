<template>
	<view >
		<!-- 导航栏 -->
		<view :class="computeClass">
			<!-- 状态栏 -->
			<!-- 此处的 statusBarHeight 是动态获取的，所以应该用 'px' 作为单位 -->
			<!-- 主要用于填充状态栏的高度 -->
			<view :style="'height:' + statusBarHeight + 'px'"></view>
			<!-- 导航 -->
			<view
				class="w-100 flex align-center justify-between bg-nav"
				style="height: 90rpx"
			>
				<!-- 右边区域 -->
				<view class="flex align-center">
					<text v-if="title" class="ml-3 font-md">{{computeTitle}}</text>
				</view>
				<!-- 左边区域 -->
				<view class="flex align-center">
					<slot name="right">
						<myIconButton :icon="'\ue62f'" @click="loadSearchPopup"></myIconButton>
						<myIconButton :icon="'\ue657'" @click="loadExtendPopup"></myIconButton>
					</slot>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<!-- 原先的布局使用了 fixed布局，导致其脱离的标准文档流，所以在其同位置下设置一个跟导航栏高度一样的 view 组件。 -->
		<!-- 就可以使使用这个组件的地方的下方 标签元素 不会被本组件遮挡 -->
		<view v-if="fixed" id="test" :style="fixedStyle"></view>
		
		<!-- 扩展菜单 -->
		<myPopup ref="myExtend" :popHeight="525" :popWidth="320" popBgColor="bg-dark" transformOrigin="right top">
			<view class="flex flex-column" style="width: 320rpx;height: 525rpx;">
				<!-- 此处加 flex-1 ，使得子元素可以均分父元素的的空间 -->
				<view class="flex-1 flex align-center" hover-class="bg-hover-dark" v-for="(item,index) in myExtends" :key="index" @click="clickEvent(item.event)">
					<text class="iconfont pl-2 pr-2 font-md text-white">{{item.icon}}</text>
					<text class="font-md  text-white">{{item.name}}</text>
				</view>
			</view>
		</myPopup>
	</view>
</template>

<script>
		import myIconButton from './my-icon-button.vue'
		import myPopup from './my-popup.vue'
    export default {
			components:{
				myIconButton,
				myPopup
			},
			props:{
				title:{
					type:String,
					default:''
				},
				// 导航栏是否固定，用于 index.nvue 中
				fixed:{
					type:Boolean,
					default:true
				},
				// 显示已读数量，用于 index.nvue 中
				noReadNum:{
					type:Number|String,
					default:0
				},
				// 导航栏颜色
				bgColor:{
					type:String,
					default:'bg-light'
				}
			},
			data(){
				return {
					statusBarHeight:0,
					navBarHeight:0,
					myExtends:[
						{
							name:'发起群聊',
							event:'setTop',
							icon:'\ue633'
						},
						{
							name:'添加好友',
							event:'delChat',
							icon:'\ue65d'
						},
						{
							name:'扫一扫',
							event:'delChat',
							icon:'\ue672'
						},
						{
							name:'收付款',
							event:'delChat',
							icon:'\ue63d'
						},
						{
							name:'帮助与反馈',
							event:'delChat',
							icon:'\ue67b'
						},
					],
				}
			},
			mounted(){
				// #ifdef APP-NVUE
				// 只有NVUE 端才可以通过如下方式获取状态栏
				this.statusBarHeight = plus.navigator.getStatusbarHeight();
				// #endif
				this.navBarHeight = this.statusBarHeight + uni.upx2px(90)
			},
			computed:{
				fixedStyle(){
					return `height:${this.navBarHeight}px`
				},
				computeTitle(){
					// 判断是否有传入 noReadNum ，有传入拼接，没传入则只显示 title
					return this.noReadNum?this.title+'('+this.noReadNum+')':this.title
				},
				computeClass(){
					let fixed = this.fixed?'fixed-top':''
					return `${fixed} ${this.bgColor}`
				}
			},
			methods:{
				loadSearchPopup(){
					this.$emit('loadSearchPopup')
				},
				loadExtendPopup(){
					this.$refs.myExtend.show(uni.upx2px(415),uni.upx2px(150))
				}
			},
    }
</script>

<style>

</style>
