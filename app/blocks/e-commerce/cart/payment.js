var payment_type_input = [].slice.call(document.getElementsByClassName("cart-payment__input"));
var last_type = '';
payment_type_input.forEach(function (element, index) {
    element.addEventListener("change", function () {
        if (last_type != element.parentNode && last_type != '') {
            console.log(last_type);
            last_type.classList.toggle('cart-payment__control--activate');
        }
        last_type = element.parentNode;
        element.parentNode.classList.toggle('cart-payment__control--activate');
    });
});

