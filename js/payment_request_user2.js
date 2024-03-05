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

var button_pay_cash = document.getElementById("pay_cash");
var button_pay_cashless = document.getElementById("pay_cashless");
var input_card_info = document.getElementById("input_card_info");


input_card_info.style.display = "none";


// var cash_payment_boolean = false;
// var card_payment_boolean = false;

var cash_payment_boolean = true;
var card_payment_boolean = false;
button_pay_cash.addEventListener("click", (event) => {
    event.preventDefault();

    input_card_info.style.display = "none";
    cash_payment_boolean = true;
    card_payment_boolean = false;

});

button_pay_cashless.addEventListener("click", (event) => {
    event.preventDefault();


    input_card_info.style.display = "block";
    card_payment_boolean = true;
    cash_payment_boolean = false;
});


// Получаем элементы dropdown и его содержимое
var dropdown = document.querySelector('.dropdown');
var dropdownContent = document.querySelector('.dropdown-content');

// Добавляем обработчик события для клика по пунктам в dropdown
dropdownContent.addEventListener('click', function (event) {
    // Проверяем, что клик был по ссылке внутри dropdown
    if (event.target.tagName === 'A') {
        // Скрываем содержимое dropdown
        dropdownContent.style.display = 'none';
    }
});

// Добавляем обработчик события для наведения курсора на dropdown
dropdown.addEventListener('mouseenter', function () {
    // Показываем содержимое dropdown
    dropdownContent.style.display = 'block';
});

// Добавляем обработчик события для ухода курсора с dropdown
dropdown.addEventListener('mouseleave', function () {
    // Скрываем содержимое dropdown
    dropdownContent.style.display = 'none';
});


// var form = document.getElementById("payment_form");

// form.addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent the default form submission behavior

//     // Gather all field values
//     var paymentSumm = document.querySelector(".input_price").value;
//     var medicalReportsFile = document.getElementById("medical_reports").files[0];
//     var kkmCheckFile = document.getElementById("kkm_check").files[0];
//     var invoiceFile = document.getElementById("invoice").files[0];
//     var analysisFile = document.getElementById("analysis").files[0];
//     var comment = document.querySelector(".input_comment").value;
//     var paymentOption = document.querySelector(".dropbtn").textContent;
//     var cardInfo = document.getElementById("input_card_info").value;

//     // Create a FormData object to send files and other form data
//     var jsonData = {
//         paymentSumm: paymentSumm,
//         opinions_on_medications: medicalReportsFile,
//         kkmCheck: kkmCheckFile,
//         invoice: invoiceFile,
//         referral: analysisFile,
//         // comment: comment,
//         card_number: cardInfo,
//         card_payment: card_payment_boolean,
//         cash_payment: cash_payment_boolean
//     };


//     console.log(JSON.stringify(jsonData));
//     console.log(jsonData);
//     // Send the form data to the specified URL using fetch
//     fetch("http://212.112.103.137:6457/api/payment/add/", {
//         method: "POST",
//         headers: {
//             "Authorization": "Bearer " + localStorage.getItem("accessToken"),
//             "Content-Type": "multipart/form-data"
//         },
//         // body: JSON.stringify(jsonData)
//         body: jsonData
//     })
//         .then(response => {
//             if (response.ok) {
//                 // Handle successful response
//                 console.log("Form submitted successfully!");
//                 // You can redirect or show a success message here
//             } else {
//                 // Handle error response
//                 console.error("Form submission failed!");
//                 console.error(response);
//                 // You can handle errors or show an error message here
//             }
//         })
//         .catch(error => {
//             console.error("Error:", error);
//             // Handle network errors
//         });
// });



var form = document.getElementById("payment_form");

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
    formData.append("card_number", document.getElementById("input_card_info").value);
    formData.append("card_payment", card_payment_boolean);
    formData.append("cash_payment", cash_payment_boolean);


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
