var lpApp = angular.module('lpApp', []);

lpApp.controller('lpPriceCtrl', ['$scope', '$http', function ($scope, $http) {

    $http.get('price.json').then(function (response) {

        $scope.prices = response.data;
        $scope.calc();
        $scope.sortGet();

    }, function (response) {
        $scope.requestStatus = response.status;
        $scope.requestStatusText = response.statusText;
    });


   $scope.sortSet = function (propertyName) {
        if ($scope.sortBy == propertyName) {
            $scope.sortRev = !$scope.sortRev;
        }
        $scope.sortBy = propertyName;
        localStorage.sortBy = $scope.sortBy;
        localStorage.sortRev = $scope.sortRev;
    }
        $scope.sortGet = function () {
        if (localStorage.sortBy && localStorage.sortRev) {
            $scope.sortBy = localStorage.sortBy;
            $scope.sortRev = (localStorage.sortRev == 'true');
        } else {
            $scope.sortBy = 'name';
            $scope.sortRev = false;
        }
    };

    $scope.calc = function () {
        $scope.prices.forEach(function (price) {
            price.price2 = price.price * (1 - price.discount);
        });
    }

}]);



(function ($) {



    //    ПРЕЛОАДЕР

    $(document).ready(function () {
        setTimeout(function () {
            if (!($('#page-preloader').hasClass('done'))) {
                $('#page-preloader').addClass('done');
            }
        }, 500);
    })

    $(document).ready(function () {



        /*НАВИГАЦИЯ*/

        function lpHeader() {

            if ($(window).scrollTop() == 0) {
                $('header').addClass('top');
            } else {
                $('header.top').removeClass('top');
            }

        }

        lpHeader();
        $(window).on('load scroll', lpHeader);


        /*СКРОЛЛ*/


        var lpNav = $('header ul');

        lpNav.find('li a').on('click', function (e) {

            var linkTrgt = $($(this).attr('href'));

            if (linkTrgt.length > 0) {

                e.preventDefault();

                var offset = linkTrgt.offset().top;

                $('html, body').animate({
                    scrollTop: offset - 44
                }, 750)
            }

        })


        /*АКТИВНЫЙ ПУНКТ*/


        function lpSetNavActive() {

            var curItem = '';

            $('section').each(function () {
                if ($(window).scrollTop() > $(this).offset().top - 200) {
                    curItem = $(this).attr('id');
                }
            });

            if (lpNav.find('li.active a').attr('href') != '#' + curItem || lpNav.find('li.active').length == 0) {

                lpNav.find('li.active').removeClass('active');

                lpNav.find('li a[href="#' + curItem + '"]').parent().addClass('active');

            }

        }

        lpSetNavActive();
        $(window).on('load scroll', lpSetNavActive);

        /*СЛАЙДЕР*/

        $(".lp-slider1").owlCarousel({
            loop: true,
            items: 1,
            nav: true,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>']
        });

        /*ТАБС*/

        $('.lp-tabs').each(function () {

            var tabs = $(this),
                tabsTitlesNames = [];

            tabs.find('div[data-tab-title]').each(function () {
                tabsTitlesNames.push($(this).attr('data-tab-title'));
            }).addClass('lp-tab');

            tabs.wrapInner('<div class="lp-tabs-content"></div>');

            tabs.prepend('<div class="lp-tabs-titles"><ul></ul></div>');

            var tabsTitles = tabs.find('.lp-tabs-titles'),
                tabsContent = tabs.find('.lp-tabs-content'),
                tabsContentTabs = tabsContent.find('.lp-tab');



            tabsTitlesNames.forEach(function (value) {
                tabsTitles.find('ul').append('<li>' + value + '</li>');
            });

            var tabsTitlesItems = tabsTitles.find('ul li');

            tabsTitlesItems.eq(0).addClass('active');
            tabsContentTabs.eq(0).addClass('active').show();

            tabsContent.height(tabsContent.find('.active').outerHeight());

            tabsTitlesItems.on('click', function () {
                if (!tabs.hasClass('changing')) {

                    tabs.addClass('changing');

                    var curTab = tabsContent.find('.active'),
                        nextTab = tabsContentTabs.eq($(this).index());

                    tabsTitlesItems.removeClass('active');

                    $(this).addClass('active');

                    var curHeight = curTab.outerHeight();

                    nextTab.show();
                    var nextHeight = nextTab.outerHeight();
                    nextTab.hide();

                    if (curHeight < nextHeight) {
                        tabsContent.animate({
                            height: nextHeight
                        }, 500);
                    }
                    curTab.fadeOut(500, function () {

                        if (curHeight > nextHeight) {
                            tabsContent.animate({
                                height: nextHeight
                            }, 500);
                        }

                        nextTab.fadeIn(500, function () {
                            curTab.removeClass('active');

                            nextTab.addClass('active');

                            tabs.removeClass('changing');
                        });

                    });
                }
            });

            $(window).on('resize', function () {
                tabsContent.height(tabsContent.find('.active').outerHeight());
            });

        });

        //        АНИМАЦИЯ СТРАНИЦЫ

        new WOW().init();


        //        ГАЛЛЕРЕЯ

        $(function () {
            $('#gallery').jGallery({

                canZoom: false,
                browserHistory: false,

                items: [
                    {
                        title: 'Декор посуды',
                        images: [
                            {
                                url: 'img/gallery/large/1/1d.jpg',
                                thumbUrl: 'img/gallery/thumbs/1/1ds.jpg',
                                title: 'Кружка с декором из полимерной глины «Кукла»'
                    },
                            {
                                url: 'img/gallery/large/1/2d.jpg',
                                thumbUrl: 'img/gallery/thumbs/1/2ds.jpg',
                                title: 'Кружка с декором из полимерной глины «Кукла»'
                    },
                            {
                                url: 'img/gallery/large/1/3d.jpg',
                                thumbUrl: 'img/gallery/thumbs/1/3ds.jpg',
                                title: 'Кружка и ложка с декором из полимерной глины «Букет»'
                    },
                            {
                                url: 'img/gallery/large/1/4d.jpg',
                                thumbUrl: 'img/gallery/thumbs/1/4ds.jpg',
                                title: 'Кружка и ложка с декором из полимерной глины «Букет»'
                    },
                            {
                                url: 'img/gallery/large/1/5d.jpg',
                                thumbUrl: 'img/gallery/thumbs/1/5ds.jpg',
                                title: 'Бокалы с декором из полимерной глины и росписью'
                    },
                            {
                                url: 'img/gallery/large/1/6d.jpg',
                                thumbUrl: 'img/gallery/thumbs/1/6ds.jpg',
                                title: 'Бокалы с декором из полимерной глины и росписью'
                    }
//                                ,
//                            {
//                                url: 'img/gallery/large/1/7d.jpg',
//                                thumbUrl: 'img/gallery/thumbs/1/7ds.jpg',
//                                title: 'Photo3'
//                            }
                        ]
                    },
                    {
                        title: 'Бижутерия',
                        images: [
                            {
                                url: 'img/gallery/large/2/1b.jpg',
                                thumbUrl: 'img/gallery/thumbs/2/1bs.jpg',
                                title: 'Браслет из полимерной глины «Малина в сахарном сиропе»'
                    },
                            {
                                url: 'img/gallery/large/2/2b.jpg',
                                thumbUrl: 'img/gallery/thumbs/2/2bs.jpg',
                                title: 'Браслет из полимерной глины «Сирень»'
                    },
                            {
                                url: 'img/gallery/large/2/3b.jpg',
                                thumbUrl: 'img/gallery/thumbs/2/3bs.jpg',
                                title: 'Комплект из полимерной глины «Вишенка»'
                    },
                            {
                                url: 'img/gallery/large/2/4b.jpg',
                                thumbUrl: 'img/gallery/thumbs/2/4bs.jpg',
                                title: 'Браслет из полимерной глины «Ягодный»'
                    },
                            {
                                url: 'img/gallery/large/2/5b.jpg',
                                thumbUrl: 'img/gallery/thumbs/2/5bs.jpg',
                                title: 'Браслет из полимерной глины «Ягодный»'
                    },
                            {
                                url: 'img/gallery/large/2/6b.jpg',
                                thumbUrl: 'img/gallery/thumbs/2/6bs.jpg',
                                title: 'Брошь-цветок «Глаз Дракона»'
                    },
                            {
                                url: 'img/gallery/large/2/7b.jpg',
                                thumbUrl: 'img/gallery/thumbs/2/7bs.jpg',
                                title: 'Брошь-цветок «Глаз Дракона»'
                    }
//                            ,
//                            {
//                                url: 'img/gallery/large/2/9b.jpg',
//                                thumbUrl: 'img/gallery/thumbs/2/9bs.jpg',
//                                title: 'Photo1'
//                    },
//                            {
//                                url: 'img/gallery/large/2/11b.jpg',
//                                thumbUrl: 'img/gallery/thumbs/2/11bs.jpg',
//                                title: 'Photo2'
//                    },
//                            {
//                                url: 'img/gallery/large/2/12b.jpg',
//                                thumbUrl: 'img/gallery/thumbs/2/12bs.jpg',
//                                title: 'Photo3'
//                    },
//                            {
//                                url: 'img/gallery/large/2/13b.jpg',
//                                thumbUrl: 'img/gallery/thumbs/2/13bs.jpg',
//                                title: 'Photo1'
//                    },
//                            {
//                                url: 'img/gallery/large/2/14b.jpg',
//                                thumbUrl: 'img/gallery/thumbs/2/14bs.jpg',
//                                title: 'Photo2'
//                    },
//                            
//                            {
//                                url: 'img/gallery/large/2/15b.jpg',
//                                thumbUrl: 'img/gallery/thumbs/2/15bs.jpg',
//                                title: 'Photo3'
//                    },
//                            {
//                                url: 'img/gallery/large/2/16b.jpg',
//                                thumbUrl: 'img/gallery/thumbs/2/16bs.jpg',
//                                title: 'Photo1'
//                    },
//                            {
//                                url: 'img/gallery/large/2/17b.jpg',
//                                thumbUrl: 'img/gallery/thumbs/2/17bs.jpg',
//                                title: 'Photo2'
//                    },
//                            {
//                                url: 'img/gallery/large/2/18b.jpg',
//                                thumbUrl: 'img/gallery/thumbs/2/18bs.jpg',
//                                title: 'Photo3'
//                    },
//                            {
//                                url: 'img/gallery/large/2/25b.jpg',
//                                thumbUrl: 'img/gallery/thumbs/2/25bs.jpg',
//                                title: 'Photo1'
//                    },
//                            {
//                                url: 'img/gallery/large/2/26b.jpg',
//                                thumbUrl: 'img/gallery/thumbs/2/26bs.jpg',
//                                title: 'Photo2'
//                    },
//                            {
//                                url: 'img/gallery/large/2/27b.jpg',
//                                thumbUrl: 'img/gallery/thumbs/2/27bs.jpg',
//                                title: 'Photo3'
//                    },
//                            {
//                                url: 'img/gallery/large/2/28b.jpg',
//                                thumbUrl: 'img/gallery/thumbs/2/28bs.jpg',
//                                title: 'Photo3'
//                    }
                        ]
                    },
                    {
                        title: 'Шкатулки и сувениры',
                        images: [
                            {
                                url: 'img/gallery/large/3/1ch.jpg',
                                thumbUrl: 'img/gallery/thumbs/3/1chs.jpg',
                                title: 'Шкатулка с росписью и декором из полимерной глины, диаметр 8 см'
                    },
                            {
                                url: 'img/gallery/large/3/2ch.jpg',
                                thumbUrl: 'img/gallery/thumbs/3/2chs.jpg',
                                title: 'Шкатулка с росписью и декором из полимерной глины, диаметр 8 см'
                    },
                            {
                                url: 'img/gallery/large/3/3ch.jpg',
                                thumbUrl: 'img/gallery/thumbs/3/3chs.jpg',
                                title: 'Подвеска-брелок из полимерной глины «Глаз Дракона»'
                    },
                            {
                                url: 'img/gallery/large/3/4ch.jpg',
                                thumbUrl: 'img/gallery/thumbs/3/4chs.jpg',
                                title: 'Подвеска-брелок из полимерной глины «Глаз Дракона»'
                    },
                            {
                                url: 'img/gallery/large/3/7ch.jpg',
                                thumbUrl: 'img/gallery/thumbs/3/7chs.jpg',
                                title: 'Шкатулка миниатюрная, диаметр 3 см'
                    }
//                            ,
//                            {
//                                url: 'img/gallery/large/3/8ch.jpg',
//                                thumbUrl: 'img/gallery/thumbs/3/8chs.jpg',
//                                title: 'Photo3'
//                    },
//                            {
//                                url: 'img/gallery/large/3/10ch.jpg',
//                                thumbUrl: 'img/gallery/thumbs/3/10chs.jpg',
//                                title: 'Photo3'
//                    },
//                            {
//                                url: 'img/gallery/large/3/11ch.jpg',
//                                thumbUrl: 'img/gallery/thumbs/3/11chs.jpg',
//                                title: 'Photo1'
//                    },
//                            {
//                                url: 'img/gallery/large/3/12ch.jpg',
//                                thumbUrl: 'img/gallery/thumbs/3/12chs.jpg',
//                                title: 'Photo2'
//                    },
//                            {
//                                url: 'img/gallery/large/3/13ch.jpg',
//                                thumbUrl: 'img/gallery/thumbs/3/13chs.jpg',
//                                title: 'Photo3'
//                    },
//                            {
//                                url: 'img/gallery/large/3/14ch.jpg',
//                                thumbUrl: 'img/gallery/thumbs/3/14chs.jpg',
//                                title: 'Photo1'
//                    },
//                            {
//                                url: 'img/gallery/large/3/15ch.jpg',
//                                thumbUrl: 'img/gallery/thumbs/3/15chs.jpg',
//                                title: 'Photo2'
//                    }
                        ]
                    }
                ]



            });
        });


        $('#lp-fb1').wiFeedBack({
            fbScript: 'blocks/wi-feedback.php',
            fbLink: false,
            fbColor: '#7952b3'
        });


        //КАРТА


        $.fn.lpMapInit = function () {

            var lpMapOptions = {
                center: [53.906494, 27.510263],
                zoom: 16,
                controls: ['fullscreenControl', 'zoomControl']
            }

            if (window.innerWidth < 768) {
                lpMapOptions.behaviors = ['multiTouch'];
            } else {
                lpMapOptions.behaviors = ['drag'];
            }

            var lpMap = new ymaps.Map("lp-map", lpMapOptions);

            lpPlacemark = new ymaps.Placemark(lpMapOptions.center, {
                hintContent: 'ТЦ «Тивали»',
                balloonContent: 'Дом из плюша',
                balloonContentHeader: 'г. Минск, ул. Притыцкого 29',
                balloonContentBody: 'ТРЦ «Тивали»',
                balloonContentFooter: 'первый этаж, павильон 84., полка №25'
            });

            lpMap.geoObjects.add(lpPlacemark);
        };
        

        


    });
})(jQuery)
