var App = angular.module('Inbreed', ['ionic']);

App.service('LoadInbreed', ['$http', LoadInbreed]);

function LoadInbreed($http) {
    this.getContent = function ($scope) {
        $http.get('test.json').success(function (result) {
            $scope.versionCheck(result);
        }).error(function (result) {
            $scope.loadLocal();
        });
    };
}

App.controller('InbreedCtrl', function ($scope, $ionicSideMenuDelegate, $ionicModal, $ionicSlideBoxDelegate, LoadInbreed) {
    
    $scope.versionCheck =     function (result) {
        if (window.localStorage.version === undefined) {
            $scope.slides   = result.pages;
            $scope.bandinfo = result.bands;
            $scope.mainLogo = result.header;
            window.localStorage.version  = result.version;
            window.localStorage.setItem('InbreedData', JSON.stringify(result));
        } else if (window.localStorage.version < result.version) {
            window.localStorage.version  = result.version;
            $scope.slides   = result.pages;
            $scope.bandinfo = result.bands;
            $scope.mainLogo = result.header;
            window.localStorage.setItem('InbreedData', JSON.stringify(result));
        } else {
            $scope.loadLocal();
        }
    };
    
    $scope.loadLocal = function () {
        $scope.storedData = JSON.parse(window.localStorage.getItem('InbreedData'));
        $scope.slides   = $scope.storedData.pages;
        $scope.bandinfo = $scope.storedData.bands;
        $scope.mainLogo = $scope.storedData.header;
    }

    $scope.setSelectedBand = function (index) {
        $scope.selectedBand = index;
    };
    
    $scope.currentSlide = 0;
    
    $scope.isActive = function (item) {
        return $scope.currentSlide == item;
    };
    
    $scope.refresh  = LoadInbreed.getContent($scope);

    $scope.setActiveSlide = function (index) {
        $ionicSlideBoxDelegate.slide(index);
        $scope.currentSlide = index;
    };
    
    $ionicModal.fromTemplateUrl('band_closeup.html', function (modal) {
        $scope.taskModal = modal;
    }, {
        scope: $scope
    });
    
    $scope.openModal = function () {
        $scope.taskModal.show();
    };
    
    $scope.closeModal = function () {
        $scope.taskModal.hide();
    };
    
    $ionicModal.fromTemplateUrl('map.html', function (modal) {
        $scope.mapModal = modal;
    }, {
        scope: $scope
    });
    
    $scope.openMapModal = function () {
        $scope.mapModal.show();
    };
    
    $scope.closeMapModal = function () {
        $scope.mapModal.hide();
    };

});