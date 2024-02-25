document.addEventListener("DOMContentLoaded", function () {
    var registration = document.getElementById("registration");
    var w = window.innerWidth;
    var h = window.innerHeight;

    var container = document.getElementById("container");
    var coef = 0;
    coef = (h / container.offsetHeight + w / container.offsetWidth) / 2;
    console.log(coef);

    login.style.transform = ("scale(" + coef + ")");
    // console.log("scale(" + coef + ")");


    var noNumberError = document.getElementById("no_number_error");
    noNumberError.style.display = "none";

    var form = document.getElementById("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("input_login").value;
        const inn = document.getElementById("input_inn").value;
        const password = document.getElementById("input_password").value;
        const password2 = document.getElementById("input_password2").value;

        const formData = {
            username: username,
            inn: inn,
            password: password,
            password2: password2
        };

        const jsonData = JSON.stringify(formData);
        console.log(typeof jsonData);

        fetch("http://212.112.103.137:6457/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonData,
        })
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    //   console.log(response.json());
                    throw new Error("Network response is not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("there is a problem with fetch operation", error);

                noNumberError.style.display = "block";

                // setTimeout(function () {
                //   noNumberError.style.display = "none";
                // }, 5000);

                noNumberError.style.opacity = 1;

                // Запускаем анимацию затухания
                var fadeOutInterval = setInterval(function () {
                    if (noNumberError.style.opacity > 0) {
                        noNumberError.style.opacity -= 0.01;
                    } else {
                        clearInterval(fadeOutInterval); // останавливаем анимацию после завершения
                        noNumberError.style.display = "none"; // скрываем элемент после анимации
                    }
                }, 50); // каждые 50 миллисекунд

            });
    });
});
