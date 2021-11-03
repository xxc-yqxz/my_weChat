<template>
	<!-- 此处加 vertical-align 可以消除图片对齐文字基线而导致容器多出 4px高 的问题 -->
    <image :src="src" :style="computeStyle" class="type" style="vertical-align: middle;"></image>
</template>

<script>
    export default {
			props:{
				size:{
					type:String|Number,
					default:90
				},
				src:{
					type:String,
					default:""
				},
				// 设置 image 是否为圆角
				type:{
					type:String,
					default:"rounded"
				}
			},
			computed:{
				computeStyle(){
					return `height: ${this.size}rpx;width: ${this.size}rpx;`
				}
			}
    }
</script>

<style>

</style>
