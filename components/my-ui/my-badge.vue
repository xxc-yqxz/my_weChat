<template>
    <text v-if="num" class="my-badge bg-danger text-white rounded-circle font-sm" :class="badgeClass" :style="badgeStyle">{{num}}</text>
</template>

<script>
    export default {
			props:{
				badgeClass:{
					type:String,
					default:''
				},
				badgeStyle:{
					type:String,
					default:''
				},
				num:{
					type:Number|String,
					default:''
				}
			}
    }
</script>

<style scoped>
.my-badge{
	padding-left: 8rpx;
	padding-right: 8rpx;
	padding-top: 1rpx;
	padding-bottom: 1rpx;
}
</style>
