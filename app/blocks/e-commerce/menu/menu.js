var submenus = [].slice.call(document.getElementsByClassName("menu-submenu"));

submenus.forEach(function (element, index) {
    element.addEventListener("click", function () {

        element.childNodes[element.childNodes.length - 1].classList.toggle("icon-rotate-90")
        var target = element.getAttribute('data-target');
        var submenu = document.getElementById(target);
        submenu.classList.toggle("menu--open");
    });
});
