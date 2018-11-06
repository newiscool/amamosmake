// if (typeof jQuery === 'undefined') { throw new Error('Bootstrap\'s JavaScript requires jQuery')}
// +function ($) {'use strict';
// 	var version = $.fn.jquery.split(' ')[0].split('.')
// 	if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 2)) {
// 		throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3')
// 	}
// }(jQuery);
jQuery(document).ready(function ($) {
    +function ($) {
        if (jQuery.fn.owlCarousel) {
            var $trayBanner = jQuery('#bannerJS');
            var $trayListBanners = $trayBanner.find('ul');
            var $fullBanner = jQuery('#full-banner');
            $fullBanner.html($trayListBanners);
            $trayBanner.remove();
            $fullBanner.find('ul').show();
            $fullBanner.find('ul').owlCarousel({
                autoHeight: false,
                autoWidth:true,
                autoPlay: false,
                goToFirstSpeed: 2000,
                navigation: true,
                navigationText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                pagination: true,
                paginationSpeed: 1000,
                singleItem: true,
                stopOnHover: true
            });


            jQuery(".showcase-carousel ul").owlCarousel({
                autoPlay: false,
                items: 4,
                itemsCustom: [[320, 2], [600, 2], [768, 2], [992, 3], [1200, 4]],
                itemsScaleUp: false,
                itemsTabletSmall: false,
                navigation: true,
                navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                pagination: false,
                singleItem: false
            });

            jQuery(".banners-carousel ul").owlCarousel({
                autoPlay: true,
                items: 2,
                itemsCustom: [[320, 1], [768, 1], [992, 1], [1200, 2]],
                itemsScaleUp: false,
                itemsTabletSmall: false,
                navigation: true,
                navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                pagination: false,
                singxleItem: false
            });

            /*jQuery(".dep_lista ").owlCarousel({
                autoPlay: true,
                items: 2,
                itemsCustom: [[320, 1], [768, 1], [992, 1], [1200, 2]],
                itemsScaleUp: false,
                itemsTabletSmall: false,
                navigation: true,
                navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                pagination: false,
                singxleItem: false
            });*/

            /*
               jQuery(".visitados_produtos #produtos").owlCarousel({
                autoPlay: true,
                items: 2,
                itemsCustom: [[320, 2], [768, 2], [992, 4], [1200, 4]],
                itemsScaleUp: false,
                itemsTabletSmall: false,
                navigation: true,
                navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                pagination: false,
                singxleItem: false
            })
            */

            jQuery(".showcase-videoproduct").slick({            
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite:false,
                    vertical:true,
                    nextArrow: '<i class="fa fa-angle-down" aria-hidden="true"></i>',
                    prevArrow: '<i class="fa fa-angle-up" aria-hidden="true"></i>',
            });
            /*if (window.innerWidth > 992) {
                jQuery(".carrossel-navbar").owlCarousel({
                    autoPlay: false,
                    items: 8,
                    itemsCustom: [[1200, 5]],
                    itemsScaleUp: false,
                    itemsTabletSmall: false,
                    navigation: true,
                    navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                    pagination: false,
                    singxleItem: false
                });
            }*/
            
            jQuery(".product__related ul").owlCarousel({
                autoPlay: true,
                items: 4,
                itemsCustom: [[320, 2], [768, 2], [992, 3], [1200, 4]],
                itemsScaleUp: false,
                itemsTabletSmall: false,
                navigation: true,
                navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                pagination: false,
                singxleItem: false
            });
            

            jQuery(".brands__list ul").owlCarousel({
                autoPlay: false,
                itemsCustom: [[320, 3], [768, 3], [992, 5], [1200, 8]],
                itemsScaleUp: false,
                itemsTabletSmall: false,
                navigation: true,
                navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                pagination: false,
            });

            jQuery(".banners-extra__list").owlCarousel({
                autoPlay: false,
                items: 4,
                itemsCustom: [[320, 2], [768, 2], [992, 3], [1200, 4]],
                itemsScaleUp: false,
                itemsTabletSmall: false,
                navigation: true,
                navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                pagination: false,
                singxleItem: false
            });
            
            jQuery("#product-page .produto-imagem-miniaturas li span").on("click",function(e){
                var fotoClicada = (event.currentTarget.getAttribute("id"));
                var fotoClicadaNew = fotoClicada.replace("L", "H");
                var fotoMostra = jQuery("#foto_p");
                var elementoMostra = jQuery(fotoMostra).find("#" + fotoClicadaNew);
                jQuery("#foto_p span").removeClass("teste");
                jQuery("#foto_p span").addClass("removeFoto");
                elementoMostra.removeClass("removeFoto");
                elementoMostra.addClass("mostraFoto");
            });

            if (window.innerWidth < 992) {
                jQuery(".banners-extras__center").owlCarousel({
                    autoPlay: true,
                    items: 4,
                    itemsCustom: [[320, 1], [600, 2], [768, 3]],
                    navigation: false,
                    navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                    pagination: true,
                    singleItem: false
                });
            }

            


            console.log(jQuery(window).width());
            if(jQuery(window).width() < 1200) {
                jQuery(".vertical-showcases ul").owlCarousel({
                    autoPlay: true,
                    items: 1,
                    itemsCustom: [[320, 1], [768, 1], [992, 1], [1200, 1]],
                    itemsScaleUp: false,
                    itemsTabletSmall: false,
                    navigation: true,
                    navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                    pagination: false,
                    singxleItem: false
                });
            }

        }
    }(jQuery);

    +function ($) {
        'use strict';

        var $smartFilterMobile = jQuery('.mobileFilter');
        var $mobileMenu = jQuery('.mobileMenu');
        var $mask = jQuery('#mask');

        jQuery($smartFilterMobile).click(function () {
            jQuery('body').toggleClass('ac_sm_ft');
        });
        jQuery($mobileMenu).click(function () {
            jQuery('body').toggleClass('ac_sm_menu');
        });
        jQuery($mask).click(function () {
            jQuery('body').removeClass('ac_sm_menu ac_sm_ft');
        });
    }(jQuery);

    +function ($) {
        'use strict';

        var errorVariacao = jQuery('#span_erro_carrinho');
        jQuery('#form_comprar .variacao-produto').append(errorVariacao);
        jQuery('#bt-submit-comments').remove();
        jQuery('#form-comments').append('<button id="bt-submit-comments" class="image pointer">Enviar</button>');
        jQuery('.page-contact #imagem').remove();
        jQuery('.page-contact .formulario-contato').append('<button  name="imagem" id="imagem">Enviar</button>');
        jQuery('.page-central_troca form input[type=image]').after('<button type="submit" class="button-submit" name="submit">Gerar Ordem de Devolu&#231;&#227;o</button>')
            .remove();
        jQuery('.page-central_gera_troca form input[type=image]').after('<button type="submit" class="button-submit" name="submit">Gerar Ordem de Devolu&#231;&#227;o</button>')
            .remove();
        jQuery('.page-search #vitrine-catalogo fieldset [type=image]').after('<button type="submit" class="button-submit" name="submit">Buscar</button>')
            .remove();
        jQuery('.page-central_senha input[type=image]').after('<button type="submit" class="button-submit" name="submit">Avan&#231;ar</button>')
            .remove();
    }(jQuery);

    +function ($) {
        jQuery('.caixa-botoes .bt-avancar').html('Avançar');

        jQuery(document).ready(function ($) {
            jQuery('table').each(function (index, el) {
                var titles = [];

                jQuery(this).find('th').each(function (index, el) {
                    titles.push(jQuery(this).html());
                });

                jQuery(this).find('tr').each(function (index, el) {
                    jQuery(this).find('td').each(function (index, el) {
                        jQuery(this).attr('data-table-title', titles[index]);
                    });
                });
            });
        });
    }(jQuery);

    if (screen.width < 767) {
        var i = 1;

        jQuery('.smart_filter [name=form-filter] h3').each(function (index, el) {
            var self = jQuery(this);

            if (self.next('ul').find('label').length) {
                var name = self.next('ul').find('input').attr('name');
                var name = name + i;
                self.attr('data-filter-label', name)
                    .addClass('smart-filter-label')
                    .attr('data-filter-label-content', self.html());
                self.next('ul').attr('data-filter-container', name)
                    .addClass('smart-filter-container');
                i++;
            }
        });

        jQuery('.smart_filter .smart-filter-label').each(function (index, el) {
            var self = jQuery(this);
            var name = self.attr('data-filter-label');

            self.bind('click', function (event) {
                self.toggleClass('estado-ativo');
                jQuery('[data-filter-container=' + name + ']').slideToggle('300')
                    .toggleClass('estado-ativo');
            });
        });
    };

    jQuery(".triger_btn-tabs").click(function () {    
        var item = jQuery(this).closest('.dispblock');
        var hasOpen = !item.hasClass('drop');
        jQuery('.dispblock').removeClass('drop');
        if(hasOpen) item.addClass("drop");
        else{ item.removeClass("drop") }
    
    });


    jQuery('#foto_p').attr('data-target', "");

    if($('.smart_filter h3').eq(0).text() == "Categorias") {
        $('.smart_filter h3').eq(0).text($('.breadcrumb .category').text());
    }

    if($('.fotosCompreJunto').length > 0) {

        var aux;

        $.each($('.fotosCompreJunto .produto img'), function() {
            aux = $(this).attr('src');

            aux = aux.replace('/90_', '/180_');

            $(this).attr('src', aux);
        });

    }

    if($('#nav_bar .nv-01 > .you-need').length > 0) {

        if($(window).width() < 980) {
            $('#nav_bar .nv-01 > .you-need .you-need__toggle').on('click', function(){
                $('.you-need__list').slideToggle(150);
            });
        }

    }

    var lastScrollTop = 0;
    jQuery(window).scroll(function (event) {
        var st = jQuery(this).scrollTop();

        if (st > 150) {
            jQuery('body').addClass('moving');
            if (st > lastScrollTop) {
                jQuery('body').addClass('moving--down');
            } else {
                jQuery('body').removeClass('moving--down');
            }
            lastScrollTop = st;
        } else {
            jQuery('body').removeClass('moving');
        }
    });

});

var elements = document.querySelectorAll('.product__right-wrapper');
Stickyfill.add(elements);


if(jQuery('.product__addcart').length > 0) {

    var prodId;

    jQuery('.product__addcart').on('click', function() {
        prodId = jQuery(this).data('id');

        addCart(prodId);
    });
}

jQuery( document ).ready(function() {
    jQuery("body").addClass("active__body");

    jQuery("li[class='']").addClass("bbox");
});



jQuery( document ).ready(function() {
    if (window.innerWidth < 992) {
        jQuery( ".dropdown" ).on( "click", function() {
            jQuery(this).addClass("rotateDrop");
            if(jQuery(".dropdown-switcher").hasClass("active__dropdown")) {
                jQuery(".dropdown-switcher").removeClass("active__dropdown");
                jQuery(".dropdown").removeClass("rotateDrop");
            } else {
                jQuery(".dropdown-switcher").addClass("active__dropdown");
            }
        });
    }


    if (window.innerWidth < 992) {
        // jQuery( "svg.arrow-down" ).on( "click", function() {
        //     if(jQuery(".nv-03").hasClass("active__dropdown-novo")) {
        //         jQuery(".nv-03").removeClass("active__dropdown-novo");
        //     } else {
        //         jQuery(".nv-03").addClass("active__dropdown-novo");
        //     }
        // });


        jQuery("svg.arrow-down").click(function () {    
            var item = jQuery(this).closest('.dropdown-nv2');
            var hasOpen = !item.hasClass('drop');

            jQuery('.dropdown-nv2').removeClass('drop');
            if(hasOpen) item.addClass("drop");
            else{ item.removeClass("drop") }
        
        });
        

    }
    
});


   //Movie
   var movieItem = jQuery('.modal_item-save').html();
   jQuery('.btn-modal-movie').click(function(){
       jQuery('.movie__one .modal-body').html( movieItem );
   });

   jQuery('.modal').click(function(e){
      if( jQuery(e.target).hasClass('modal') ){
         jQuery('.movie__one .modal-body').html('');
         jQuery('#modal-video-produto .modal-body').html('');
      }
   });

   jQuery('.modal .close').click(function(e){
       jQuery('.movie__one .modal-body').html('');
       jQuery('#modal-video-produto .modal-body').html('');
   });
   
