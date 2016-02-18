'use strict';

angular.module('cloudNestApp.version', [
  'cloudNestApp.version.interpolate-filter',
  'cloudNestApp.version.version-directive'
])

.value('version', '0.1');
