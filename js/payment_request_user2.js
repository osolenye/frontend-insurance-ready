window.addEventListener('resize', function() {
    var w = window.innerWidth;
    var h = window.innerHeight; 
  
    var container = document.getElementById("container");
  
    var coef = 0;
    coef = (h/container.offsetHeight + w/container.offsetWidth)/2;
    console.log(coef);
  
    container.style.transform = "scale(" + coef + ")";
    console.log("scale(" + coef + ")");
  });

  var w = window.innerWidth;
  var h = window.innerHeight; 

  var container = document.getElementById("container");

  var coef = 0;
  coef = (h/container.offsetHeight + w/container.offsetWidth)/2;
  console.log(coef);

  container.style.transform = "scale(" + coef + ")";
  console.log("scale(" + coef + ")");

  var button_pay_cash = document.getElementById("pay_cash");
  var button_pay_cashless = document.getElementById("pay_cashless");
  var input_card_info = document.getElementById("input_card_info");


  input_card_info.style.display = "none";

  button_pay_cash.addEventListener("click", (event) => {
      event.preventDefault();

      input_card_info.style.display = "none";
});

  button_pay_cashless.addEventListener("click", (event) => {
     event.preventDefault();


     input_card_info.style.display = "block";
  });


// Получаем элементы dropdown и его содержимое
var dropdown = document.querySelector('.dropdown');
var dropdownContent = document.querySelector('.dropdown-content');

// Добавляем обработчик события для клика по пунктам в dropdown
dropdownContent.addEventListener('click', function(event) {
    // Проверяем, что клик был по ссылке внутри dropdown
    if (event.target.tagName === 'A') {
        // Скрываем содержимое dropdown
        dropdownContent.style.display = 'none';
    }
});

// Добавляем обработчик события для наведения курсора на dropdown
dropdown.addEventListener('mouseenter', function() {
    // Показываем содержимое dropdown
    dropdownContent.style.display = 'block';
});

// Добавляем обработчик события для ухода курсора с dropdown
dropdown.addEventListener('mouseleave', function() {
    // Скрываем содержимое dropdown
    dropdownContent.style.display = 'none';
});
