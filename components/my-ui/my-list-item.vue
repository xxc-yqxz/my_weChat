<template>
    <!-- 通讯录列表 -->
    <view class="flex bg-white align-stretch" hover-class="bg-light" @click="$emit('click')">
			<!-- 左侧头像部分 -->
    	<view class="flex align-center justify-center px-3 py-2">
				<slot name="icon"></slot>
    		<image class="rounded" v-if="cover" :src="cover" :style="computeImgStyle"></image>
    	</view>
			<!-- 右侧文字内容及角标及提示信息部分 -->
    	<view class="flex align-center justify-between flex-1 border-bottom pr-3">
				<!-- 文字内容部分 -->
    		<slot>
					<text class="font-md text-dark">{{title}}</text>
				</slot>
				<!-- 角标及提示信息部分 -->
				<view class="flex align-center" v-if="showRight">
					<!-- 添加提示信息用的插槽 -->
					<slot name="right"></slot>
					<!-- 右箭头 -->
					<text class="iconfont text-light-muted font-md">&#xe775;</text>
				</view>
    	</view>
    </view>
</template>

<script>
    export default {
			props:{
				// 图片
				cover:{
					type:String,
					default:''
				},
				// 标题
				title:{
					type:String,
					default:''
				},
				// 显示
				showRight:{
					type:Boolean,
					default:false
				},
				// 图片大小
				coverSize:{
					type:String|Number,
					default:75
				}
			},
			computed:{
				computeImgStyle(){
					return `width: ${this.coverSize}rpx;height: ${this.coverSize}rpx;`
				}
			}
    }
</script>

<style>
	
</style>
