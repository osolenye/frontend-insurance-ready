document.addEventListener("DOMContentLoaded", function () {


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
        console.log(jsonData);

        // fetch("http://212.112.103.137:6457/api/register/", {
        fetch("https://api.dms.insurance.kg:6458/api/register/", {
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
                // fetch("http://212.112.103.137:6457/api/token/", {
                fetch("https://api.dms.insurance.kg:6458/api/token/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
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
                        console.log(localStorage.getItem("accessToken"));
                        window.location.href = "profile.html";
                    })
                    .catch(error => {
                        console.error("There is a problem with the fetch operation", error);
                    });
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
