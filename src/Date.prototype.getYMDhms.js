// 現在日時の取得
Date.prototype.getYMDhms = Date.prototype.getYMDhms || function() {
	function padZero(v /* 0-99 */ ) {
		return v > 9 ? v : '0' + v;
	}
	return '[Y]/[M]/[D] [h]:[m]:[s]'
		.replace('[Y]', this.getFullYear())
		.replace('[M]', padZero((this.getMonth() + 1)))
		.replace('[D]', padZero(this.getDate()))
		.replace('[h]', padZero(this.getHours()))
		.replace('[m]', padZero(this.getMinutes()))
		.replace('[s]', padZero(this.getSeconds()));
};