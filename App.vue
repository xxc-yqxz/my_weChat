<script>
export default {
	onLaunch: function () {
		// 加载公共图标库
		/* #ifdef APP-NVUE */
		const domModule = weex.requireModule("dom");
		domModule.addRule("fontFace", {
			fontFamily: "iconfont",
			src: "url('https://at.alicdn.com/t/font_2908079_n2qvz4y3wcd.ttf?t=1635948426549')",
		});
		/* #endif */
	},
	onShow: function () {
		console.log("App Show");
	},
	onHide: function () {
		console.log("App Hide");
	},
	
};
</script>

<style>
/*每个页面公共css */
@import "./styles/free.css";
@import "./styles/common.css";
/* #ifndef APP-NVUE */
@import "./styles/free-icon.css"; /* #endif */
</style>
