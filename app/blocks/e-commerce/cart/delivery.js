/**
 * Created by lambada on 06.02.18.
 */

var delivey_type_input = [].slice.call(document.getElementsByClassName("cart-delivery__input"));

delivey_type_input.forEach(function (type, index) {
    type.addEventListener("change", function () {

        var myNode = document.getElementById("map");
        if (myNode.firstChild) {
            document.getElementById('map').style.display = 'none';
            myNode.removeChild(myNode.firstChild);
        }

        document.getElementById('courier-form').style.display = 'none';

        switch (type.value) {
            case 'delivery-courier': {
                document.getElementById('map').style.display = 'block';
                document.getElementById('courier-form').style.display = 'block';
                ymaps.load(initdev());
                break;
            }

            case 'delivery-from-shop': {
                document.getElementById('map').style.display = 'block';
                console.log(type.getAttribute('data-adress'));
                ymaps.load(init(type.getAttribute('data-adress')));
                break;
            }


        }


    });
});

function initdev() {
    var myMap = new ymaps.Map('map', {
        center: [55.753994, 37.622093],
        zoom: 4
    });


    var last_object = '';
    var suggestView = new ymaps.SuggestView('courier-input', {
        offset: [0, 5],
    });
    suggestView.state.events.add('change', function () {
        setTimeout(function () {
            var activeIndex = suggestView.state.get('activeIndex');
            console.log(typeof activeIndex);
            if (typeof activeIndex == 'number') {
                activeItem = suggestView.state.get('items')[activeIndex];
                ymaps.geocode(activeItem.value, {
                    /**
                     * Опции запроса
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
                     */
                    // Сортировка результатов от центра окна карты.
                    // boundedBy: myMap.getBounds(),
                    // strictBounds: true,
                    // Вместе с опцией boundedBy будет искать строго внутри области, указанной в boundedBy.
                    // Если нужен только один результат, экономим трафик пользователей.
                    results: 1
                }).then(function (res) {

                    // Выбираем первый результат геокодирования.
                    var firstGeoObject = res.geoObjects.get(0),
                        // Координаты геообъекта.
                        coords = firstGeoObject.geometry.getCoordinates(),
                        // Область видимости геообъекта.
                        bounds = firstGeoObject.properties.get('boundedBy');

                    firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
                    // Получаем строку с адресом и выводим в иконке геообъекта.
                    firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());
                    if (last_object != firstGeoObject && last_object != '') {
                        myMap.geoObjects.remove(last_object);
                    }
                    // Добавляем первый найденный геообъект на карту.
                    myMap.geoObjects.add(firstGeoObject);
                    // Масштабируем карту на область видимости геообъекта.
                    myMap.setBounds(bounds, {
                        checkZoomRange: true
                    });
                    last_object = firstGeoObject;

                });
            }
        }, 200);


    });

    // Поиск координат центра Нижнего Новгорода.

}

function init(adress) {
    var myMap = new ymaps.Map('map', {
        center: [55.753994, 37.622093],
        zoom: 4
    });
    // Поиск координат центра Нижнего Новгорода.
    ymaps.geocode(adress, {
        /**
         * Опции запроса
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
         */
        // Сортировка результатов от центра окна карты.
        // boundedBy: myMap.getBounds(),
        // strictBounds: true,
        // Вместе с опцией boundedBy будет искать строго внутри области, указанной в boundedBy.
        // Если нужен только один результат, экономим трафик пользователей.
        results: 1
    }).then(function (res) {
        // Выбираем первый результат геокодирования.
        var firstGeoObject = res.geoObjects.get(0),
            // Координаты геообъекта.
            coords = firstGeoObject.geometry.getCoordinates(),
            // Область видимости геообъекта.
            bounds = firstGeoObject.properties.get('boundedBy');

        firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
        // Получаем строку с адресом и выводим в иконке геообъекта.
        firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

        // Добавляем первый найденный геообъект на карту.
        myMap.geoObjects.add(firstGeoObject);
        // Масштабируем карту на область видимости геообъекта.
        myMap.setBounds(bounds, {
            checkZoomRange: true
        });


    });
}