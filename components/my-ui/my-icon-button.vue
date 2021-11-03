<template>
	<view
		class="flex align-center justify-center"
		hover-class="bg-hover-light"
		@click="$emit('click')"
		style="height: 90rpx; width: 90rpx"
	>
		<!-- nvue 中text 不可以绑定事件，此处通过 view来绑定事件，通过 text 来显示图标 -->
		<!-- 此处的图标需要传入\u + unicode 码才可以使用，具体原因未知 -->
		<text class="iconfont font-md">{{icon}}</text>
	</view>
</template>

<script>
	export default{
		name:'free-icon-button',
		props:{
			icon:{
				type:String,
				required:true
			}
		},
	}
</script>

<style>
</style>
