var search_by_inn = document.getElementById("search_by_id");
document.addEventListener("DOMContentLoaded", function () {
    var inputField = document.querySelector(".input_patient_name");
    const error = document.querySelector(".error");
    error.style.display = "none";

    inputField.addEventListener("input", function () {
        // Получаем значение поля ввода
        var inputValue = inputField.value;

        // Здесь вы можете выполнить любые действия с полученным значением, например, отправить его на сервер для поиска пациента

        var accessToken = localStorage.getItem("accessToken");
        // Пример: выводим значение в консоль
        if (inputValue.length == 14) {
            // fetch("http://212.112.103.137:6457/api/search_user/?inn=" + inputValue, {
            fetch("https://api.dms.insurance.kg:6458/api/search_user/?inn=" + inputValue, {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${accessToken}`
              }
          })
            .then(response => response.json())
            .then(data => {
                document.getElementById("search_by_inn").innerHTML = data[0].first_name + " " + data[0].last_name;
                localStorage.setItem("userId", JSON.stringify(data[0]));
            })
            .catch(error => {
                console.error("Error:", error);
            });
        } else if (inputValue.length > 14 || inputValue.length < 14) {
            document.getElementById("search_by_inn").innerHTML = "Инн должен состоять из 14 цифр"
        }
    });
});


var form = document.getElementById("form_payment");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create a new FormData object
    var formData = new FormData();

    var medicalReports = document.getElementById('medical_reports').files[0];
    var kkmCheck = document.getElementById('kkm_check').files[0];
    var invoice = document.getElementById('invoice').files[0];
    var analysis = document.getElementById('analysis').files[0];
    var comment = document.getElementById("comment");
    // Gather all field values
    formData.append("paymentSumm", document.querySelector(".input_price").value);
    // Append the files to the FormData object
    if (medicalReports) {
        formData.append('opinions_on_medications', medicalReports);
    }
    if (kkmCheck) {
        formData.append('kkmCheck', kkmCheck);
    }
    if (invoice) {
        formData.append('invoice', invoice);
    }
    if (analysis) {
        formData.append('referral', analysis);
    }
    formData.append("user", JSON.parse(localStorage.getItem("userId")).id);
    formData.append("comment", comment);


    // Send the form data to the specified URL using fetch
    // fetch("http://212.112.103.137:6457/api/payment/add/", {
    fetch("https://api.dms.insurance.kg:6458/api/payment/add/", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
        },
        body: formData
    })
    .then(response => {
        if (response.ok) {
                // Handle successful response
            console.log("Form submitted successfully!");
                // You can redirect or show a success message here
            window.location.href = "/profile/";
        } else {
                // Handle error response
            console.error("Form submission failed!");
            console.error(response);
                // You can handle errors or show an error message here
                const error = document.querySelector(".error");
                fadeInOut(error);
            
        }
    })
    .catch(error => {
        console.error("Error:", error);
            // Handle network errors
    });
});


function fadeInOut(element) {
    // Плавное появление элемента
    element.style.opacity = 0;
    element.style.display = "block";
    let opacity = 0;
    const fadeInInterval = setInterval(() => {
        if (opacity < 1) {
            opacity += 0.1;
            element.style.opacity = opacity;
        } else {
            clearInterval(fadeInInterval);
            // Через 5 секунд начинаем затухание
            setTimeout(() => {
                let opacity = 1;
                const fadeOutInterval = setInterval(() => {
                    if (opacity > 0) {
                        opacity -= 0.1;
                        element.style.opacity = opacity;
                    } else {
                        clearInterval(fadeOutInterval);
                        element.style.display = "none";
                    }
                }, 100);
            }, 5000);
        }
    }, 100);
}