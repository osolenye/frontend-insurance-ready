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

// document.addEventListener("DOMContentLoaded", function () {
//     var form = document.getElementById("form_payment");

//     form.addEventListener("submit", function (event) {
//         event.preventDefault(); // Prevent the default form submission behavior

//         // Gather all field values
//         var paymentSumm = document.querySelector(".input_price").value;
//         var medicalReportsFile = document.getElementById("medical_reports").files[0];
//         var kkmCheckFile = document.getElementById("kkm_check").files[0];
//         var invoiceFile = document.getElementById("invoice").files[0];
//         var analysisFile = document.getElementById("analysis").files[0];
//         var comment = document.querySelector(".input_comment").value;

//         // Create a FormData object to send files and other form data
//         var jsonData = {
//             paymentSumm: paymentSumm,
//             opinions_on_medications: medicalReportsFile,
//             kkmCheck: kkmCheckFile,
//             invoice: invoiceFile,
//             referral: analysisFile,
//             comment: comment,
//         };


//         // Send the form data to the specified URL using fetch
//         fetch("http://212.112.103.137:6457/payment/payment/add/", {
//             method: "POST",
//             headers: {
//                 "Authorization": "Bearer " + localStorage.getItem("accessToken"),
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(jsonData)
//         })
//             .then(response => {
//                 if (response.ok) {
//                     // Handle successful response
//                     console.log("Form submitted successfully!");
//                     // You can redirect or show a success message here
//                 } else {
//                     // Handle error response
//                     console.error("Form submission failed!");
//                     console.error(response);
//                     // You can handle errors or show an error message here
//                 }
//             })
//             .catch(error => {
//                 console.error("Error:", error);
//                 // Handle network errors
//             });
//     });
// });

var form = document.getElementById("form_payment");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create a new FormData object
    var formData = new FormData();

    // Gather all field values
    formData.append("paymentSumm", document.querySelector(".input_price").value);
    formData.append("opinions_on_medications", document.getElementById("medical_reports").files[0]);
    formData.append("kkmCheck", document.getElementById("kkm_check").files[0]);
    formData.append("invoice", document.getElementById("invoice").files[0]);
    formData.append("referral", document.getElementById("analysis").files[0]);
    formData.append("inn", user_inn);



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
