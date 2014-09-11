/**
 * @desc displays a sidebar
 * @file sidebar.directive.js
 * @example <div gnap-sidebar></div>
 */
(function () {
    angular
        .module('gnap')
        .directive('gnapSidebar', ['sidebarService', '$state', gnapSidebar]);

    angular
        .module('gnap')
        .animation('.submenu', gnapSidebarSlideUpSlideDown);

    function gnapSidebar(sidebarService, $state) {
        function link(scope, element, attrs) {
            scope.settings = sidebarService.settings;

            // handles sidebar item selection
            scope.select = function (item) {
                if (item.items) {
                    sidebarService.toggleSubmenu(item);
                }

                if (item.click) {
                    item.click();
                }

                if (item.state) {
                    $state.go(item.state);
                }
            };

            // handles collapsed state of the sidebar
            scope.toggleCollapsed = function () {
                sidebarService.toggleCollapsed();
            };
        };

        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'js/gnap/sidebar.html',
            link: link
        };
    };

    // custom animation for ng-hide (slide-up/slide-down)
    function gnapSidebarSlideUpSlideDown() {
        return {
            beforeAddClass: function (element, className, done) {
                if (className === 'ng-hide') {
                    element.slideUp(done);

                    return function (cancel) {
                        if (cancel) {
                            element.stop();
                        }
                    };
                }
            },
            removeClass: function (element, className, done) {
                if (className === 'ng-hide') {
                    element.hide();
                    element.slideDown(done);

                    return function (cancel) {
                        if (cancel) {
                            return element.stop();
                        }
                    };
                }
            }
        };
    };
})();