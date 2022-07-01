let timeout = null;

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 * 注意这个全局公用一个timeout
 * @param {Function} func 要执行的回调函数 
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行 
 * @return null
 */
export function debounce(func, wait = 500, immediate = false) {
	// console.log("timeout", timeout)
	// 清除定时器
	if (timeout !== null) clearTimeout(timeout);
	// 立即执行，此类情况一般用不到
	if (immediate) {
		var callNow = !timeout;
		timeout = setTimeout(function () {
			timeout = null;
		}, wait);
		if (callNow) typeof func === 'function' && func();
	} else {
		// 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
		timeout = setTimeout(function () {
			typeof func === 'function' && func();
		}, wait);
	}
}


/**
 * @desc  函数防抖---“立即执行版本” 和 “非立即执行版本” 的组合版本
 * @param  func 需要执行的函数
 * @param  wait 延迟执行时间（毫秒）
 * @param  immediate---true 表立即执行，false 表非立即执行
 **/
export function easyDebounce(func, wait = 500, immediate = false) {
	let timer;
	// console.log("easyDebounce", func, timer, immediate)
	return function () {
		let context = this;
		let args = arguments;

		if (timer) clearTimeout(timer);
		if (immediate) {
			var callNow = !timer;
			timer = setTimeout(() => {
				timer = null;
			}, wait)
			if (callNow) func.apply(context, args)
		} else {
			timer = setTimeout(function () {
				// console.log("context", context)
				func.apply(context, args)
			}, wait);
		}
	}
}
