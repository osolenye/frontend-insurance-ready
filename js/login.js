document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener('resize', function () {
        var login = document.getElementById("login");
        var w = window.innerWidth;
        var h = window.innerHeight;

        var container = document.getElementById("container");
        var coef = 0;
        coef = (h / container.offsetHeight + w / container.offsetWidth) / 2;
        console.log(coef);

        login.style.transform = ("scale(" + coef + ")");
    });


    var login = document.getElementById("login");
    var w = window.innerWidth;
    var h = window.innerHeight;

    var container = document.getElementById("container");
    var coef = 0;
    coef = (h / container.offsetHeight + w / container.offsetWidth) / 2;
    console.log(coef);

    login.style.transform = ("scale(" + coef + ")");
    // console.log("scale(" + coef + ")");



    var form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var username = document.getElementById("input_login").value;
        var password = document.getElementById("input_password").value;

        var formData = {
            username: username,
            password: password
        };

        var jsonData = JSON.stringify(formData);

        fetch("http://212.112.103.137:6457/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response is not ok");
                }
                return response.json();
            })
            .then(data => {
                // console.log(data); // Здесь вы можете обрабатывать полученные данные
                localStorage.setItem("accessToken", data.access);
                //console.log(localStorage.getItem("accessToken"));
                window.location.href = "profile.html";
            })
            .catch(error => {
                console.error("There is a problem with the fetch operation", error);
            });


    });
});


