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






var form = document.getElementById("payment_form");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create a new FormData object
    var formData = new FormData();

    // Gather all field values
    formData.append("paymentSumm", document.querySelector(".input_price").value);
    // formData.append("opinions_on_medications", document.getElementById("medical_reports").files[0]);
    // formData.append("kkmCheck", document.getElementById("kkm_check").files[0]);
    // formData.append("invoice", document.getElementById("invoice").files[0]);
    // formData.append("referral", document.getElementById("analysis").files[0]);

    var medicalReports = document.getElementById('medical_reports').files[0];
    var kkmCheck = document.getElementById('kkm_check').files[0];
    var invoice = document.getElementById('invoice').files[0];
    var analysis = document.getElementById('analysis').files[0];
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

    formData.append("card_number", document.getElementById("input_card_info").value);
    formData.append("card_payment", card_payment_boolean);
    formData.append("cash_payment", cash_payment_boolean);
    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }

    // Send the form data to the specified URL using fetch
    // fetch("http://212.112.103.137:6457/api/payment/add/", {
    fetch("https://api.dms.insurance.kg:6458/api/payment/add", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            // 'Origin': 'http://212.112.103.137:6457/api/payment/add/'
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
                // You can handle errors or show an error message here
            }
        })
        .catch(error => {
            console.error("Error:", error);
            // Handle network errors
        });
});
