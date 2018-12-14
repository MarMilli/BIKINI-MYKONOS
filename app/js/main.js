$(document).ready(function () {
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      vertical: true,
      adaptiveHeight: true,
      verticalSwiping: true,
      arrows: false
    });
 $('.select_block').each(function (i) {

            var select = this;

            var select_field = $('.select_field', select);
            var field_input = $('.field', select);
            var fall_out = $('.select_fall_out', select);
            var fall_out_element = $('span', fall_out);
            var field_input_val = $('span:first-child', fall_out).html();
            field_input.val(field_input_val);


            $(select).prev('label').click(function () {
                select_field.click();
            });

            select_field.click(function() {
                if (!fall_out.hasClass("open")) {
                    openSelect();
                } else {
                    closeSelect();
                }
            });

            function openSelect() {
                closeSelect();
                fall_out.animate({ height: "show" }, 200);
                fall_out.addClass("open");
                $(select).addClass("active");
            }

            fall_out_element.click(function () {
                field_input_val = $(this).attr('data-rel');
                if ( field_input_val == '0' ) {
                    field_input_val = " ";
                    field_input.val(field_input_val);
                } else {
                    setTimeout(function()
                        {
                            field_input.val(field_input_val);
                        }, 200);
                }
                closeSelect();

            });


    });
    



function closeSelect() {
    $("div.select_fall_out.open").animate({ height: "hide" }, 200).removeClass("open");
    $('.select_block.active').removeClass("active");
}

$(document).click(function(event) {
    if ( $(event.target).closest($('.select_block')).length || $(event.target).closest($('.select_block').prev('label')).length ) {} else {
        closeSelect();
    }
});

});


