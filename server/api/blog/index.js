'use strict';

var express = require('express');
var controller = require('./blog.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();
//后台管理
router.post('/addBlog',auth.hasRole('admin'),controller.addBlog);
router.get('/getBlogList',auth.hasRole('admin'),controller.getBlogList);
router.put('/:id/updateBlog', auth.hasRole('admin'), controller.updateBlog);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/:id/getBlog', auth.hasRole('admin'), controller.getBlog);
router.post('/uploadImage', auth.hasRole('admin'),controller.uploadImage);
router.post('/fetchImage', auth.hasRole('admin'), controller.fetchImage);

//前台获取
router.get('/getFrontBlogList',controller.getFrontBlogList);
router.get('/getFrontBlogCount',controller.getFrontBlogCount);
router.get('/:id/getFrontArticle',controller.getFrontArticle);
//获取首页图片
router.get('/getIndexImage',controller.getIndexImage);
//用户喜欢文章
router.put('/:id/toggleLike',auth.isAuthenticated(),controller.toggleLike);
//获取上一篇和下一篇
router.get('/:id/getPrenext',controller.getPrenext);
module.exports = router;