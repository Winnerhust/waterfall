$(window).on('load', function() {
    waterfall();
    var datInt = {
        "data": [{
            "src": 'img/0.jpg'
        }, {
            "src": 'img/1.jpg'
        }, {
            "src": 'img/3.jpg'
        }, {
            "src": 'img/6.jpg'
        }, {
            "src": 'img/14.jpg'
        }]
    };
    //滚动时加载图片
    $(window).on('scroll', function() {
        if (checkLoadable()) {
            $.each(datInt.data, function(key, value) {
                var oBox = $('<div>').addClass('box').appendTo($('#main'));
                var pic = $('<div>').addClass('pic').appendTo($(oBox));
                $('<img>').attr('src', $(value).attr('src')).appendTo($(pic));
            })

            waterfall();
        }
    });
})



function waterfall() {
    var oParent = $('#main')
    var pics = $('#main>div')

    console.log(pics.length);

    var boxWidth = pics.eq(0).outerWidth();

    var clos = Math.floor(document.documentElement.clientWidth / boxWidth);

    /* 设置居中 */
    oParent.width(boxWidth * clos).css('margin', ' 0 auto')

    var hArr = [];
    pics.each(function(index, pic) {
        var h = $(pics).eq(index).outerHeight()
        if (index < clos) {
            hArr[index] = h
        } else {
            var minH = Math.min.apply(null, hArr)
            var minHindex = $.inArray(minH, hArr)

            $(pic).css({
                'position': 'absolute',
                'top': minH + 'px',
                'left': minHindex * boxWidth + 'px'
            })

            hArr[minHindex] += h
        }
    });
}

function checkLoadable() {
    var $lastBox = $('#main>div').last()
    var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight() / 2)
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();

    return (lastBoxDis < scrollTop + documentH) ? true : false;

}