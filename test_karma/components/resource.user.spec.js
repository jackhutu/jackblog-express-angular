'use strict';

describe('resource blog', function() {
  var mockResource, $httpBackend,mockResponse;
  beforeEach(module('jackblog.resources'));
  beforeEach(inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      mockResource = $injector.get('User');
  }));

  describe('User addUser',function () {
    var mockResponse;
    beforeEach(inject(function ($injector) {
      mockResponse = $httpBackend.when('POST', '/api/users/addUser');
    }));

    it('should call addUser return data',function (done) {
      mockResponse.respond({success:true,user_id:'55bf0cc80f5d43056b80a01d'});

      mockResource.addUser().then(function (result) {
        expect(result.success).toBeTruthy();
        expect(result.user_id).toBe('55bf0cc80f5d43056b80a01d');
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call addUser return error_msg',function (done) {
      mockResponse.respond(403,'');
      mockResource.addUser().then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(403);
      }).finally(done);
      $httpBackend.flush();
    });
  });

  describe('User getCaptcha',function () {
    var mockResponse;
    beforeEach(inject(function ($injector) {
      mockResponse = $httpBackend.when('GET', '/api/users/getCaptcha');
    }));

    it('should call getCaptcha return data',function (done) {
      mockResponse.respond('ldjflsjdlfjljjlsjdfjlsjdf');

      mockResource.getCaptcha().then(function (result) {
        expect(result).toBeDefined();
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call getCaptcha return error_msg',function (done) {
      mockResponse.respond(422,'');
      mockResource.getCaptcha().then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(422);
      }).finally(done);
      $httpBackend.flush();
    });
  });

  describe('User getUserList',function () {
    var mockResponse;
    beforeEach(inject(function ($injector) {
      mockResponse = $httpBackend.when('GET', '/api/users/getUserList');
    }));

    it('should call getUserList return data',function (done) {
      mockResponse.respond({data:[{nickname:'jack'}]});

      mockResource.getUserList().then(function (result) {
        expect(result.data).toEqual([{nickname:'jack'}]);
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call getUserList return error_msg',function (done) {
      mockResponse.respond(422,'');
      mockResource.getUserList().then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(422);
      }).finally(done);
      $httpBackend.flush();
    });
  });

  describe('User updateUser',function () {
    var mockResponse;
    beforeEach(inject(function ($injector) {
      mockResponse = $httpBackend.when('PUT', '/api/users/55bf0cc80f5d43056b80a01d/updateUser');
    }));

    it('should call updateUser return success',function (done) {
      mockResponse.respond({success:true,user_id:'55bf0cc80f5d43056b80a01d'});

      mockResource.updateUser('55bf0cc80f5d43056b80a01d').then(function (result) {
        expect(result.success).toBeTruthy();
        expect(result.user_id).toBe('55bf0cc80f5d43056b80a01d');
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call updateUser return error_msg',function (done) {
      mockResponse.respond(422,'');
      mockResource.updateUser('55bf0cc80f5d43056b80a01d').then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(422);
      }).finally(done);
      $httpBackend.flush();
    });
  });

	describe('User mdUser',function () {
	  var mockResponse;
	  beforeEach(inject(function ($injector) {
	    mockResponse = $httpBackend.when('PUT', '/api/users/mdUser');
	  }));

	  it('should call mdUser return success',function (done) {
	    mockResponse.respond({success:true,data:{nickname:'jack hu'}});

	    mockResource.mdUser().then(function (result) {
	      expect(result.success).toBeTruthy();
	      expect(result.data.nickname).toBe('jack hu');
	    }).catch(function (err) {
	      expect(err).toBeUndefined();
	    }).finally(done);
	    $httpBackend.flush();
	  });
	  it('should call updateUser return error_msg',function (done) {
	    mockResponse.respond(403,'');
	    mockResource.mdUser().then(function (result) {
	      expect(result).toBeUndefined();
	    }).catch(function (err) {
	      expect(err.status).toEqual(403);
	    }).finally(done);
	    $httpBackend.flush();
	  });
	});

	describe('User getUserProvider',function () {
	  var mockResponse;
	  beforeEach(inject(function ($injector) {
	    mockResponse = $httpBackend.when('GET', '/api/users/getUserProvider');
	  }));

	  it('should call getUserProvider return success',function (done) {
	    mockResponse.respond({data:{github:{},qq:{}}});

	    mockResource.getUserProvider().then(function (result) {
	      expect(result.data).toBeDefined();
	    }).catch(function (err) {
	      expect(err).toBeUndefined();
	    }).finally(done);
	    $httpBackend.flush();
	  });
	  it('should call getUserProvider return error_msg',function (done) {
	    mockResponse.respond(403,'');
	    mockResource.getUserProvider().then(function (result) {
	      expect(result).toBeUndefined();
	    }).catch(function (err) {
	      expect(err.status).toEqual(403);
	    }).finally(done);
	    $httpBackend.flush();
	  });
	});

	describe('User get',function () {
	  var mockResponse;
	  beforeEach(inject(function ($injector) {
	    mockResponse = $httpBackend.when('GET', '/api/users/me');
	  }));

	  it('should call get return me',function (done) {
	    mockResponse.respond({nickname:'jack',email:'test@test.com'});

	    mockResource.get().$promise.then(function (result) {
	      expect(result.nickname).toBe('jack');
	    }).catch(function (err) {
	      expect(err).toBeUndefined();
	    }).finally(done);
	    $httpBackend.flush();
	  });
	  it('should call get return error_msg',function (done) {
	    mockResponse.respond(403,'');
	    mockResource.get().$promise.then(function (result) {
	      expect(result).toBeUndefined();
	    }).catch(function (err) {
	      expect(err.status).toEqual(403);
	    }).finally(done);
	    $httpBackend.flush();
	  });
	});

});