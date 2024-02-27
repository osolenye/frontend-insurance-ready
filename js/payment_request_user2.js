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
var card_payment_boolean;
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


document.getElementById('payment_form').addEventListener('submit', function(event) {
    event.preventDefault(); // предотвращаем стандартное поведение отправки формы

    // Получаем данные из формы
    var paymentSumm = document.querySelector('.input_price').value;
    var cash_payment = document.getElementById('pay_cash').checked;

    // Создаем объект FormData
    var formData = new FormData();
    formData.append('paymentSumm', paymentSumm);
    formData.append('card_payment', card_payment_boolean);
    // formData.append('cash_payment', cash_payment_boolean);

    // Добавляем файлы
    var medicalReports = document.getElementById('medical_reports').files;
    var kkmCheck = document.getElementById('kkm_check').files;
    var invoice = document.getElementById('invoice').files;
    var analysis = document.getElementById('analysis').files;

    formData.append('referral', medicalReports[0]);
    formData.append('kkmCheck', kkmCheck[0]);
    formData.append('invoice', invoice[0]);

    if (card_payment_boolean == true) {
        formData.append("card_number", input_card_info.value);
    }


    var accessToken = localStorage.getItem("accessToken");
    // Отправляем POST-запрос
    fetch('http://212.112.103.137:6457/api/payment/add/', {
        method: 'POST',
        headers: {
            // 'Authorization': 'Bearer %{accessToken}'
            'Authorization': 'Bearer ' + accessToken
        },
        body: formData
    })
        .then(response => {
            if (response.ok) {
                console.log('Запрос успешно отправлен');
                // здесь можно выполнить какие-то действия при успешной отправке
            } else {
                console.error('Ошибка при отправке запроса');
                // здесь можно обработать ошибку, если что-то пошло не так
            }
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
});