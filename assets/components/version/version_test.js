'use strict';

describe('cloudNestApp.version module', function() {
  beforeEach(module('cloudNestApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
