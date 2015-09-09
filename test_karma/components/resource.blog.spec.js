'use strict';

describe('resource blog', function() {
  var mockResource, $httpBackend,mockResponse;
  beforeEach(module('jackblog.resources'));
  beforeEach(inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      mockResource = $injector.get('Blog');
  }));

  describe('Blog addBlog',function () {
    var mockResponse;
    beforeEach(inject(function ($injector) {
      mockResponse = $httpBackend.when('POST', '/api/blog/addBlog');
    }));

    it('should call addBlog return data',function (done) {
      mockResponse.respond({success:true,article_id:'55b0c23aa463e6742c3030ea'});
      mockResource.addBlog({title:'标题名称'}).then(function (result) {
        expect(result.success).toBeTruthy();
        expect(result.article_id).toBe('55b0c23aa463e6742c3030ea');
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call addBlog return error_msg',function (done) {
      mockResponse.respond(422,'');
      mockResource.addBlog().then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(422);
      }).finally(done);
      $httpBackend.flush();
    });
  });


  describe('Blog getBlogList', function () {
    var mockResponse;
    beforeEach(inject(function ($injector) {
      mockResponse = $httpBackend.when('GET', '/api/blog/getBlogList');
    }));

    it('should call getBlogList return data', function (done) {
      mockResponse.respond({data: [{title:'标题'}]});

        mockResource.getBlogList().then(function (result) {
          expect(result.data[0].title).toBe('标题');
        }).catch(function (err) {
          expect(err).toBeUndefined();
        }).finally(done);

        $httpBackend.flush();

    });

    it('should call getBlogList return error', function (done) {
      mockResponse.respond(422,'');

        mockResource.getBlogList().then(function (result) {
          expect(result).toBeUndefined();
        }).catch(function (err) {
          expect(err.status).toEqual(422);
        }).finally(done);

        $httpBackend.flush();
    });

  });

  describe('Blog updateBlog',function () {
    var mockResponse;
    beforeEach(inject(function ($injector) {
      mockResponse = $httpBackend.when('PUT', '/api/blog/55b0c23aa463e6742c3030ea/updateBlog');
    }));

    it('should call updateBlog return success',function (done) {
      mockResponse.respond({success:true,article_id:'55b0c23aa463e6742c3030ea'});
      mockResource.updateBlog('55b0c23aa463e6742c3030ea').then(function (result) {
        expect(result.success).toBeTruthy();
        expect(result.article_id).toBe('55b0c23aa463e6742c3030ea');
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call updateBlog return error_msg',function (done) {
      mockResponse.respond(422,'');
      mockResource.updateBlog('55b0c23aa463e6742c3030ea').then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(422);
      }).finally(done);
      $httpBackend.flush();
    });
  });

  describe('Blog DELETE',function () {
    var mockResponse;
    beforeEach(inject(function ($injector) {
        mockResponse = $httpBackend.when('DELETE', '/api/blog/55b0c23aa463e6742c3030ea');
    }));

    it('should call deleteBlog return success',function (done) {
      mockResponse.respond({success:true});

      mockResource.deleteBlog({id:'55b0c23aa463e6742c3030ea'}).then(function (result) {
        expect(result.success).toBeTruthy();
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call deleteBlog return error_msg',function (done) {
      mockResponse.respond(403,'');
      mockResource.deleteBlog({id:'55b0c23aa463e6742c3030ea'}).then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(403);
      }).finally(done);
      $httpBackend.flush();
    });
  });

  describe('Blog getBlog',function () {
    var mockResponse;
    beforeEach(inject(function ($injector) {
        mockResponse = $httpBackend.when('GET', '/api/blog/55b0c23aa463e6742c3030ea/getBlog');
    }));

    it('should call getBlog return blog',function (done) {
      mockResponse.respond({data:{title:'文章标题'}});
      mockResource.getBlog({id:'55b0c23aa463e6742c3030ea'}).then(function (result) {
        expect(result.data.title).toBe('文章标题');
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call getBlog return error_msg',function (done) {
      mockResponse.respond(422,'');
      mockResource.getBlog({id:'55b0c23aa463e6742c3030ea'}).then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(422);
      }).finally(done);
      $httpBackend.flush();
    });
  });


  describe('Blog getFrontBlogList', function () {
    var mockResponse;
    beforeEach(inject(function ($injector) {
        mockResponse = $httpBackend.when('GET', '/api/blog/getFrontBlogList');
    }));

    it('should call getFrontBlogList return data', function (done) {
      mockResponse.respond({data: [{title:'文章1'},{title:'文章2'}]});

        mockResource.getFrontBlogList().then(function (result) {
          expect(result.data[0].title).toBe('文章1');
        }).catch(function (err) {
          expect(err).toBeUndefined();
        }).finally(done);

        $httpBackend.flush();

    });

    it('should call getFrontBlogList return error', function (done) {
      mockResponse.respond(422,'');

        mockResource.getFrontBlogList().then(function (result) {
          expect(result).toBeUndefined();
        }).catch(function (err) {
          expect(err.status).toEqual(422);
        }).finally(done);

        $httpBackend.flush();
    });

  });

  describe('blog getFrontBlogCount',function () {
    var mockResponse;
    beforeEach(inject(function ($injector) {
        mockResponse = $httpBackend.when('GET', '/api/blog/getFrontBlogCount');
    }));

    it('should call getFrontBlogCount return count',function (done) {
      mockResponse.respond({success:true,count:18});
      mockResource.getFrontBlogCount().then(function (result) {
        expect(result.success).toBeTruthy();
        expect(result.count).toBe(18);
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call getFrontBlogCount return error_msg',function (done) {
      mockResponse.respond(422,'');
      mockResource.getFrontBlogCount().then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(422);
      }).finally(done);
      $httpBackend.flush();
    });
  });

  describe('Blog getFrontArticle',function () {
    var mockResponse;
    beforeEach(inject(function ($injector) {
        mockResponse = $httpBackend.when('GET', '/api/blog/55b0c23aa463e6742c3030ea/getFrontArticle');
    }));

    it('should call getFrontArticle return article',function (done) {
      mockResponse.respond({data:{title:'文章标题'}});

      mockResource.getFrontArticle({id:'55b0c23aa463e6742c3030ea'}).then(function (result) {
        expect(result.data.title).toBe('文章标题');
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call getFrontArticle return error_msg',function (done) {
      mockResponse.respond(403,'');
      mockResource.getFrontArticle({id:'55b0c23aa463e6742c3030ea'}).then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(403);
      }).finally(done);
      $httpBackend.flush();
    });
  });

  describe('Blog getIndexImage',function () {
    var mockResponse;
    beforeEach(inject(function ($injector) {
        mockResponse = $httpBackend.when('GET', '/api/blog/getIndexImage');
    }));

    it('should call getIndexImage return img',function (done) {
      mockResponse.respond({success:true,img:'http://upload.jackhu.top/blog/article/111.jpg'});

      mockResource.getIndexImage().then(function (result) {
        expect(result.success).toBeTruthy();
        expect(result.img).toMatch(/http:\/\/upload\.jackhu\.top/);
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call getIndexImage return error_msg',function (done) {
      mockResponse.respond(403,'');
      mockResource.getIndexImage().then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(403);
      }).finally(done);
      $httpBackend.flush();
    });
  });

  describe('Blog toggleLike',function () {
    var mockResponse;
    beforeEach(inject(function ($injector) {
        mockResponse = $httpBackend.when('PUT', '/api/blog/55b0c23aa463e6742c3030ea/toggleLike');
    }));

    it('should call toggleLike return isLike',function (done) {
      mockResponse.respond({success:true,'count':20,'isLike':true});

      mockResource.toggleLike({id:'55b0c23aa463e6742c3030ea'}).then(function (result) {
        expect(result.success).toBeTruthy();
        expect(result.count).toEqual(20);
        expect(result.isLike).toBeTruthy();
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call toggleLike return error_msg',function (done) {
      mockResponse.respond(403,'');
      mockResource.toggleLike({id:'55b0c23aa463e6742c3030ea'}).then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(403);
      }).finally(done);
      $httpBackend.flush();
    });
  });

  describe('Blog getPrenext',function () {
    var mockResponse;
    beforeEach(inject(function ($injector) {
        mockResponse = $httpBackend.when('GET', '/api/blog/55b0c23aa463e6742c3030ea/getPrenext');
    }));

    it('should call getPrenext return data',function (done) {
      mockResponse.respond({data:{next:{title:'下一篇'},prev:{title:'上一篇'}}});

      mockResource.getPrenext({id:'55b0c23aa463e6742c3030ea'}).then(function (result) {
        expect(result.data.next).toEqual({title:'下一篇'});
        expect(result.data.prev).toEqual({title:'上一篇'});
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call getPrenext return error_msg',function (done) {
      mockResponse.respond(403,'');
      mockResource.getPrenext({id:'55b0c23aa463e6742c3030ea'}).then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(403);
      }).finally(done);
      $httpBackend.flush();
    });
  });
  describe('Blog fetchImage',function () {
    var mockResponse;
    beforeEach(inject(function ($injector) {
        mockResponse = $httpBackend.when('POST', '/api/blog/fetchImage');
    }));

    it('should call fetchImage return data',function (done) {
      mockResponse.respond({success:true,img_url:'http://upload.jackhu.top/blog/article/111.jpg'});

      mockResource.fetchImage().then(function (result) {
        expect(result.success).toBeTruthy();
        expect(result.img_url).toMatch(/http:\/\/upload\.jackhu\.top/);
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call fetchImage return error_msg',function (done) {
      mockResponse.respond(403,'');
      mockResource.fetchImage().then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(403);
      }).finally(done);
      $httpBackend.flush();
    });
  });
});