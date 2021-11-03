<template>
	<!-- 弹出层 -->
	<div class="z-index:9999;overflow:hidden;" v-if="status">
		<!-- 蒙版 -->
		<div
			v-if="isShowmask"
			class="position-fixed top-0 left-0 right-0 bottom-0 z-index"
			:style="computeMaskColor"
			@click="hide"
		></div>
		<!-- 弹出层内容 -->
		<div
			ref="popup"
			class="position-fixed popup-animate z-index"
			:class="computePopClass"
			:style="computeBodyStyle"
		>
			<slot></slot>
		</div>
	</div>
</template>

<script>
// #ifdef APP-NVUE
const animation = weex.requireModule('animation')
// #endif
export default {
	props: {
		// 是否开启蒙版颜色
		maskColor: {
			type: Boolean,
			default: false,
		},
		// 是否开启蒙版
		isShowmask: {
			type: Boolean,
			default: true,
		},
		// 弹出层是否处于底部
		fixedBottom: {
			type: Boolean,
			default: false,
		},
		popWidth:{
			type:Number|String,
			required:true
		},
		popHeight:{
			type:Number|String,
			required:true
		},
		// 蒙版颜色
		popBgColor:{
			type:String,
			default:'bg-white'
		},
		// 弹出框动画起点
		transformOrigin:{
			type:String,
			default:'left top'
		},
		index:{
			type:String|Number,
			required:true
		}
	},
	data() {
		return {
			status: false,
			x: -1,
			y: -1,
			maxWidth: 0,
			maxHeight: 0,
		};
	},
	mounted() {
		// 在 mounted 中为 maxWidth 和 maxHeight 赋值
		const res = uni.getSystemInfoSync();
		this.maxWidth = res.windowWidth - uni.upx2px(this.popWidth)
		this.maxHeight = res.windowHeight - uni.upx2px(this.popHeight)
	},
	methods: {
		show(x = -1, y = -1) {
			console.log('show')
			this.x = x > this.maxWidth ? this.maxWidth:x;
			this.y = y > this.maxHeight ? this.maxHeight:y;
			this.status = true;
			// #ifdef APP-NVUE
			// 此处要加 $nextTick，确保在 dom 树渲染完成后，再为其添加animation 动画
			this.$nextTick(function(){
				animation.transition(this.$refs.popup, {
				    styles: {
				        transform:'scale(1,1)',
								transformOrigin:this.transformOrigin,
				        opacity:1
				    },
				    duration: 300, //ms
				    timingFunction: 'ease',
				    }, function () {
				        console.log('成功')
				    })
			})
			// #endif
		},
		hide() {
			console.log('hide')
			// #ifdef APP-NVUE
			this.$nextTick(function(){
				animation.transition(this.$refs.popup, {
				    styles: {
				        transform:'scale(0,0)',
								transformOrigin:this.transformOrigin,
				        opacity:0
				    },
				    duration: 300, //ms
				    timingFunction: 'ease',
				    }, () =>{
				        this.status = false
				    })
			})
			// #endif
			// #ifndef APP-NVUE
			this.status = false
			// #endif
			uni.$emit(`changeHover${this.index}`)
		},
	},
	computed: {
		computeMaskColor() {
			return (
				`background-color: rgba(0,0,0,` + (this.maskColor ? 0.5 : 0) + `);`
			);
		},
		computePopClass() {
			// 如果不是 固定在底部的情况，则为其加圆角和 边框
			return this.fixedBottom ? `left-0 right-0 bottom-0 ${this.popBgColor}` : `rounded border ${this.popBgColor}`;
		},
		computeBodyStyle() {
			// 如果调用 this.show 传入了 x、y ,则说明其并非是 固定在底部的。
			let left = this.x > -1 ? `left:${this.x}px;` : "";
			let top = this.y > -1 ? `top:${this.y}px;` : "";
			return left + top;
		},
	},
};
</script>

<style scoped>
.popup-animate{
	/* #ifdef APP-NVUE */
	transform: scale(0,0);
	opacity: 0;
	/* #endif */
}
.z-index{
	/* #ifndef APP-NVUE */
	z-index: 9999;
	/* #endif */
}
</style>
