<template>
	<!-- 列表 -->
	<!-- 此处使用 align-stretch是为了使其内部的元素在侧轴拉伸，占满整个list 的高度 -->
	<!-- 以便下面使用 position 定位，能够更好的确定距离 -->
		<view :class="( isHover || chatData.istop)?'bg-hover-light':'bg-white'">
			<!-- 此处需要将 view 改为 div，否则 longpress 事件无法获取到坐标 -->
			<div class="flex align-stretch" @click="onClick" @longpress="onLongPress">
				<!-- 左侧 -->
				<view
					class="flex align-center justify-center position-relative"
					style="width: 145rpx"
				>
					<myAvatar :src="chatData.avatar" size="92"></myAvatar>
					<myBadge
						:num="chatData.noReadNum"
						badgeClass="position-absolute"
						badgeStyle="top:15rpx;right:15rpx;"
					></myBadge>
				</view>
				<!-- 右侧 -->
				<view class="border-bottom flex-1 py-1 pr-3">
					<!-- 上方 -->
					<view class="flex justify-between mb-1 pt-2">
						<!-- 昵称 -->
						<view class="">
							<text class="font-md">{{ chatData.nickName }}</text>
						</view>
						<view>
							<text class="font-sm text-light-muted">{{
								chatData.update_time | getToTime
							}}</text>
						</view>
					</view>
					<!-- 下方 -->
					<view class="pb-1">
						<text class="font-sm text-light-muted text-ellipsis">{{
							chatData.content
						}}</text>
					</view>
				</view>
			</div>
		</view>

</template>

<script>
import myAvatar from "@/components/my-ui/my-avatar.vue";
import myBadge from "@/components/my-ui/my-badge.vue";
import Mixins from '@/mixins/index.js'
export default {
	mixins:[Mixins],
	props: {
		chatData: {
			type: Object,
			required: true,
		},
		index: {
			type: Number | String,
			required: true,
		},
	},
	data(){
		return{
			isHover:false
		}
	},
	mounted() {
		uni.$on(`changeHover${this.index}`,()=>{
			this.isHover = false     
		})
	},
	beforeDestroy(){
		uni.$off('changeHover')
	},
	components: {
		myAvatar,
		myBadge,
	},
	methods: {
		/**
		 * 点击事件
		 */
		onClick() {
			this.isHover = true
			setTimeout(()=>{
				this.isHover = false
			},200)
		},
		/**
		 * 长按事件
		 */
		onLongPress(e) {
			let x = 0;
			let y = 0;
			// #ifdef APP-NVUE
			if(Array.isArray(e.changedTouches)&&e.changedTouches.length>0){
				x = e.changedTouches[0].screenX
				y = e.changedTouches[0].screenY
			}
			// #endif
			// #ifdef MP
			x = e.changedTouches[0].clientX
			y = e.changedTouches[0].clientY
			// #endif
			this.$emit('loadLongPress',{x,y,index:this.index})
			this.isHover = true
		},
	},
};
</script>

<style>
</style>
