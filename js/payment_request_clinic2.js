window.addEventListener('resize', function () {
    var w = window.innerWidth;
    var h = window.innerHeight;

    var container = document.getElementById("container");

    var coef = 0;
    coef = (h / container.offsetHeight + w / container.offsetWidth) / 2;

    container.style.transform = "scale(" + coef + ")";
});

var w = window.innerWidth;
var h = window.innerHeight;

var container = document.getElementById("container");

var coef = 0;
coef = (h / container.offsetHeight + w / container.offsetWidth) / 2;

container.style.transform = "scale(" + coef + ")";