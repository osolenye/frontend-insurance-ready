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


var user_inn = 0;
var search_by_inn = document.getElementById("search_by_id");
document.addEventListener("DOMContentLoaded", function () {
    var inputField = document.querySelector(".input_patient_name");

    inputField.addEventListener("input", function () {
        // Получаем значение поля ввода
        var inputValue = inputField.value;

        // Здесь вы можете выполнить любые действия с полученным значением, например, отправить его на сервер для поиска пациента

        // Пример: выводим значение в консоль
        if (inputValue.length == 14) {
            console.log(14);
            user_inn = inputValue;
        } else if (inputValue.length > 14 || inputValue.length < 14) {
            console.log("inn must be 14 characters!");
        }
    });
});


var form = document.getElementById("form_payment");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create a new FormData object
    var formData = new FormData();

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


    // Send the form data to the specified URL using fetch
    fetch("http://212.112.103.137:6457/api/payment/add/", {
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
            } else {
                // Handle error response
                console.error("Form submission failed!");
                console.error(response);
                // You can handle errors or show an error message here
            }
        })
        .catch(error => {
            console.error("Error:", error);
            // Handle network errors
        });
});


