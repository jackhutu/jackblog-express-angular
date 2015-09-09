'use strict';

describe('jackblog filter', function () {

	beforeEach(module('jackblog.filter'));

	describe('userStatus filter',function () {
		var userStatus;

		beforeEach(inject(function (_$filter_) {
			userStatus = _$filter_('userStatus');
		}));

		it('should return equal user status', function () {
			expect(userStatus(0)).toEqual('未验证');
			expect(userStatus(1)).toEqual('已验证');
			expect(userStatus(2)).toEqual('被阻止');
			expect(userStatus()).toEqual('未知状态');
		});

	});

	describe('customTime filter',function () {
		var customTime;
		beforeEach(inject(function (_$filter_) {
			customTime = _$filter_('customTime');
		}));

		it('should return formart time',function () {
			var d = new Date().getTime();
    	var minuteTime = 60*1000 + 5000;
    	var hourTime = 60*minuteTime;
    	var dayTime = 24*hourTime;
    	var monthTime = dayTime * 30;
    	var yearTime = monthTime * 12;
			expect(customTime(d)).toEqual('刚刚');
			expect(customTime(d - yearTime)).toEqual('1年前');
			expect(customTime(d - monthTime)).toEqual('1月前');
			expect(customTime(d - dayTime)).toEqual('1天前');
			expect(customTime(d - hourTime)).toEqual('1小时前');
			expect(customTime(d - minuteTime)).toEqual('1分钟前');
		});
	})

});