$(document).ready(function () {
    // слайдер - карточка товара
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
    console.log('1111');
    // 3D слайдер
    $('.slider3D').slick({
        centerMode: true,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });
    var total = 0; //количество товаров одной модели дообавляемых в корзину
    var cardTotal = 0; // итоговое количество товаров в корзине
    // кастомный селект
    $('.select_block').each(function (i) {
        var select = this;
        var select_field = $('.select_field', select);
        var fall_out = $('.select_fall_out', select);
        var field_input = $('.field', select);
        var field_input_val = $('span:first-child', fall_out).html();
        field_input.val(field_input_val);

        // если кликнули по инпуту открываем селект
        select_field.click(function () {
            if (!fall_out.hasClass("open")) {
                openSelect();
            } else {
                closeSelect();
            }
        });
        // функция открытия селекта
        function openSelect() {
            // closeSelect();
            fall_out.animate({height: "show"}, 200);
            fall_out.addClass("open");
            $(select).addClass("active");
        }
        // функция закрытия селекта
        function closeSelect() {
            $("div.select_fall_out.open").animate({height: "hide"}, 200).removeClass("open");
            $('.select_block.active').removeClass("active");
        }
        // если кликнули по спану в селекте
        fall_out.on('click', 'span', function () {

            $('.addCard').text('ADD TO CART'); // меняем текст на кнопке
            field_input_val = $(this).text(); // меняем текст в инпуте на выбранный вариант
            var field_link_val = $(this).attr('data-link');
            if (field_input_val != 'PICK A COLOR') {
                $('.slider-for .slickSlide.slick-active img').attr('src', field_link_val); // меняем картинку у слайдера на фото с выбранным цветом
                total = 1;// автоматически ставим 1 товар для добавления в корзину
                addTotal();
            }
            // проверка на пустое значение
            if (field_input_val == '0') {
                field_input_val = " ";
                field_input.val(field_input_val);
            } else {
                setTimeout(function () {
                    field_input.val(field_input_val);
                }, 200);
            }
            closeSelect();
        });
        // закрываем селект если кликнули вне области выпадающего списка
        $(document).click(function (event) {
            if ($(event.target).closest($('.select_block')).length || $(event.target).closest($('.select_block').prev('label')).length) {
            } else {
                closeSelect();
            }
        });
    });
    // функция записи количества выбранных для добавления в корзину товаров в инпут
    function addTotal() {
        $('.quantity').val(total);
    }
    // меняем количество выбранных для добавления в корзину товаров в зависиости от того, по какой кнопке кликнули
    function changeCounter(ths) {
        var val = ths.text();
        var self = $('.field').val();
        // console.log(self);
        if (self != 'PICK A COLOR') {
            if (val == '+')
                total++;
            else if (total != 0)
                total--;
            addTotal();
        }
    }
    // вызов функции изменеия количества товара при клике
    $(function () {
        $('.count').click(function () {
            changeCounter($(this));
        });
    });
    // измененяем значение количества товаров в корзине
    $(function () {
        $('.addCard').click(function () {
            cardTotal += total;
            $('.cart__value').val(cardTotal); // записываем значение в инпут
            $('.addCard').text('ADDED'); // меняем текст кнопки добавления товара в корзину на "добавлено"
        });
    });

    // обновление значения инпута
    function updateValueInput() {
        var field = $('.select_fall_out span:first-child').text();
        $('.field').val(field);
    }

    // подгрузка данных о  разцветках товара из json при выборе вида купальника
    $(function () {
        $('.slider-nav').on('click', 'button', function () {
            updateValueInput(); // обновляем инпут
            total = 0; // обнуляем значение выбранных для добавления в корзину товаров
            addTotal();
            var thiss = $(this);
            $('.select_fall_out').empty(); //очищаем содержимое выпадающего списка
            $.getJSON('data.json', function (data) {
                for (var j = 0; j < data.length; j++) {
                    // выбираем цвета в зависимости от того какой товар выбран
                    if (thiss.text() == data[j].alt) {
                        for (var i = 0; i < data[j].color.length; i++) {
                            $('.select_fall_out').append('<span data-link="' + data[j].color[i].linkImage + '">' + data[j].color[i].name + '</span>');
                        }
                    }
                    if (j == data.length - 1) {
                        // на последнем круге меняем текст на кнопке и инпуте
                        $('.addCard').text('ADD TO CART');
                        updateValueInput();
                    }
                }
            });
        });
    });
});
// кликаем по активному слайду при загрузке страницы
window.onload = function () {
    $('.slider-nav button.slick-current').click();
    console.log('22222');
};