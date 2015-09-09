'use strict';

describe('resource tags', function() {

  beforeEach(module('jackblog.resources'));

  describe('TagCat addTagCat',function () {
    var mockTagsResource, $httpBackend,mockResponse;
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        mockTagsResource = $injector.get('Tags');
        mockResponse = $httpBackend.when('POST', '/api/tags/addTagCat');
    }));

    it('should call addTagCat return data',function (done) {
      mockResponse.respond({success:true,cat_id:'55b0c23aa463e6742c3030ea'});
      mockTagsResource.addTagCat({name:'标签分类名称'}).then(function (result) {
        expect(result.success).toBeTruthy();
        expect(result.cat_id).toBe('55b0c23aa463e6742c3030ea');
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call addTagCat return error_msg',function (done) {
      mockResponse.respond(422,'');
      mockTagsResource.addTagCat().then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(422);
      }).finally(done);
      $httpBackend.flush();
    });
  });


  describe('TagCat getTagCatList', function () {
    var mockTagsResource, $httpBackend,mockResponse;
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        mockTagsResource = $injector.get('Tags');
        mockResponse = $httpBackend.when('GET', '/api/tags/getTagCatList');
    }));

    it('should call getTagCatList return data', function (done) {
      mockResponse.respond({data: [{name:'language'}]});

        mockTagsResource.getTagCatList().then(function (result) {
          expect(result.data[0].name).toBe('language');
        }).catch(function (err) {
          expect(err).toBeUndefined();
        }).finally(done);

        $httpBackend.flush();

    });

    it('should call getTagCatList return error', function (done) {
      mockResponse.respond(422,{error_msg:'标签分类名称不能为空.'});

        mockTagsResource.getTagCatList().then(function (result) {
          expect(result).toBeUndefined();
        }).catch(function (err) {
          expect(err.status).toEqual(422);
        }).finally(done);

        $httpBackend.flush();
    });

  });

  describe('TagCat updateTagCat',function () {
    var mockTagsResource, $httpBackend,mockResponse;
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        mockTagsResource = $injector.get('Tags');
        mockResponse = $httpBackend.when('PUT', '/api/tags/55b0c23aa463e6742c3030ea/updateTagCat');
    }));

    it('should call updateTagCat return success',function (done) {
      mockResponse.respond({success:true,cat_id:'55b0c23aa463e6742c3030ea'});
      mockTagsResource.updateTagCat('55b0c23aa463e6742c3030ea').then(function (result) {
        expect(result.success).toBeTruthy();
        expect(result.cat_id).toBe('55b0c23aa463e6742c3030ea');
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call updateTagCat return error_msg',function (done) {
      mockResponse.respond(422,'');
      mockTagsResource.updateTagCat('55b0c23aa463e6742c3030ea').then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(422);
      }).finally(done);
      $httpBackend.flush();
    });
  });

  describe('TagCat DELETE',function () {
    var mockTagsResource, $httpBackend,mockResponse;
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        mockTagsResource = $injector.get('Tags');
        mockResponse = $httpBackend.when('DELETE', '/api/tags/55b0c23aa463e6742c3030ea');
    }));

    it('should call DELETE return success',function (done) {
      mockResponse.respond({success:true});

      mockTagsResource.deleteCat({id:'55b0c23aa463e6742c3030ea'}).then(function (result) {
        expect(result.success).toBeTruthy();
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call DELETE return error_msg',function (done) {
      mockResponse.respond(403,'');
      mockTagsResource.deleteCat({id:'55b0c23aa463e6742c3030ea'}).then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(403);
      }).finally(done);
      $httpBackend.flush();
    });
  });

  describe('Tags addTag',function () {
    var mockTagsResource, $httpBackend,mockResponse;
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        mockTagsResource = $injector.get('Tags');
        mockResponse = $httpBackend.when('POST', '/api/tags/addTag');
    }));

    it('should call addTag return success',function (done) {
      mockResponse.respond({success:true,tag_id:'55afab0fc8d958d7629f4cd2'});
      mockTagsResource.addTag({name:'标签名称'}).then(function (result) {
        expect(result.success).toBeTruthy();
        expect(result.tag_id).toBe('55afab0fc8d958d7629f4cd2');
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call addTag return error_msg',function (done) {
      mockResponse.respond(422,'');
      mockTagsResource.addTag().then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(422);
      }).finally(done);
      $httpBackend.flush();
    });
  });


  describe('Tags getTagList', function () {
    var mockTagsResource, $httpBackend,mockResponse;
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        mockTagsResource = $injector.get('Tags');
        mockResponse = $httpBackend.when('GET', '/api/tags/getTagList');
    }));

    it('should call getTagList return data', function (done) {
      mockResponse.respond({data: [{name:'nodejs'}]});

        mockTagsResource.getTagList().then(function (result) {
          expect(result.data[0].name).toBe('nodejs');
        }).catch(function (err) {
          expect(err).toBeUndefined();
        }).finally(done);

        $httpBackend.flush();

    });

    it('should call getTagList return error', function (done) {
      mockResponse.respond(422,'');

        mockTagsResource.getTagList().then(function (result) {
          expect(result).toBeUndefined();
        }).catch(function (err) {
          expect(err.status).toEqual(422);
        }).finally(done);

        $httpBackend.flush();
    });

  });

  describe('Tags updateTag',function () {
    var mockTagsResource, $httpBackend,mockResponse;
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        mockTagsResource = $injector.get('Tags');
        mockResponse = $httpBackend.when('PUT', '/api/tags/55afab0fc8d958d7629f4cd2/updateTag');
    }));

    it('should call updateTag return success',function (done) {
      mockResponse.respond({success:true,tag_id:'55afab0fc8d958d7629f4cd2'});
      mockTagsResource.updateTag('55afab0fc8d958d7629f4cd2').then(function (result) {
        expect(result.success).toBeTruthy();
        expect(result.tag_id).toBe('55afab0fc8d958d7629f4cd2');
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call updateTag return error_msg',function (done) {
      mockResponse.respond(422,'');
      mockTagsResource.updateTag('55afab0fc8d958d7629f4cd2').then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(422);
      }).finally(done);
      $httpBackend.flush();
    });
  });

  describe('Tags DELETE',function () {
    var mockTagsResource, $httpBackend,mockResponse;
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        mockTagsResource = $injector.get('Tags');
        mockResponse = $httpBackend.when('DELETE', '/api/tags/55b0c23aa463e6742c3030ea/deleteTag');
    }));

    it('should call DELETE return success',function (done) {
      mockResponse.respond({success:true});

      mockTagsResource.deleteTag({id:'55b0c23aa463e6742c3030ea'}).then(function (result) {
        expect(result.success).toBeTruthy();
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call DELETE return error_msg',function (done) {
      mockResponse.respond(403,'');
      mockTagsResource.deleteTag({id:'55b0c23aa463e6742c3030ea'}).then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(403);
      }).finally(done);
      $httpBackend.flush();
    });
  });

  describe('Tags getFrontTagList',function () {
    var mockTagsResource, $httpBackend,mockResponse;
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        mockTagsResource = $injector.get('Tags');
        mockResponse = $httpBackend.when('GET', '/api/tags/getFrontTagList');
    }));

    it('should call getFrontTagList return success',function (done) {
      mockResponse.respond({data: [{name:'nodejs'}]});

      mockTagsResource.getFrontTagList().then(function (result) {
        expect(result.data[0].name).toBe('nodejs');
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call getFrontTagList return error_msg',function (done) {
      mockResponse.respond(422,'');
      mockTagsResource.getFrontTagList().then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(422);
      }).finally(done);
      $httpBackend.flush();
    });
  });
});

// describe('getUser', function () {
//   var mockUserResource, $httpBackend;

//   beforeEach(inject(function ($injector) {
//       $httpBackend = $injector.get('$httpBackend');
//       mockUserResource = $injector.get('Test');
//   }));

//   // afterEach(function() {
//   //   $httpBackend.verifyNoOutstandingExpectation();
//   //   $httpBackend.verifyNoOutstandingRequest();
//   // });

//   it('should call getUser with username', function (done) {
//       $httpBackend.expectGET('/api/index.php/users/test')
//           .respond([{
//           username: 'test'
//       }]);

//       mockUserResource.getUser('test').then(function (result) {
//         expect(result[0].username).toBe('test');
//       }).catch(function (err) {
//         expect(err).toBeUndefined();
//       }).finally(done);

//       $httpBackend.flush();
      
//   });

// });
// 
// 
// describe('User', function () {
//     var mockUserResource,$q, $httpBackend;
//     beforeEach(module('jackblog.resources'));

//     beforeEach(inject(function ($injector) {
//             $httpBackend = $injector.get('$httpBackend');
//             mockUserResource = $injector.get('Test');
//             //$q = $injector.get('$q');
//         }));

//     describe('getUser', function () {
//         it('should call getUser with username', function (done) {
//             $httpBackend.expectGET('/api/index.php/users/test')
//                 .respond([{
//                 username: 'test'
//             }]);
//             // mockUserResource.getUser('test',function (result) {
//             //   console.log(result);
//             // },function (err) {
//             //   expect(err).toBeUndefined();
//             // });
//             mockUserResource.getUser('test').then(function (result) {
//               console.log(result);
//               expect(result[0].username).toBe('test');
//             }).catch(function (err) {
//               expect(err).toBeUndefined();
//             }).finally(done);

//             $httpBackend.flush();
            
//         });

//     });
// });