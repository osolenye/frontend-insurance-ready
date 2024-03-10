var responseUnprocessedContent = [];
var responseProcessedContent = [];
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener('resize', function () {
    var w = window.innerWidth;
    var h = window.innerHeight;

    var container = document.getElementById("container");

    var coef = 0;
    coef = (h / container.offsetHeight + w / container.offsetWidth) / 2;

    container.style.transform = "scale(" + coef + ")";
  });

  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);

  fetch("http://212.112.103.137:6457/api/profile/", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.user);
    var name = document.getElementById("name");
    var inn = document.getElementById("inn");
    name.innerHTML = data.user.first_name + " " + data.user.last_name;
    inn.innerHTML = data.user.inn;
  })
  .catch(error => {
    console.error("Error:", error);
  });

  fetch("http://212.112.103.137:6457/api/my_payments/", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(data => {
    var payments = data;
    var responsesContainer = document.querySelector(".responses");

    console.log(payments);
      // Проходимся по каждому элементу в массиве данных
    payments.forEach(function (request) {
      if (request.processed == true) {
          // Создаем новый элемент response_processed
        var responseProcessed = document.createElement("div");
        responseProcessed.classList.add("response_processed");
        responseProcessed.id = "response_processed_content";

          // Создаем и заполняем спаны для каждого свойства заявки
        var idSpan = document.createElement("span");
        idSpan.classList.add("id");
        idSpan.textContent = request.id;

        var serviceSpan = document.createElement("span");
        serviceSpan.classList.add("service");
        serviceSpan.textContent = request.service;

        var askedSumSpan = document.createElement("span");
        askedSumSpan.classList.add("asked_sum");
        askedSumSpan.textContent = request.paymentSumm;

        var approvedSumSpan = document.createElement("span");
        approvedSumSpan.classList.add("approved_sum");
        approvedSumSpan.textContent = request.finalSumm;

          // Добавляем спаны в элемент response_processed
        responseProcessed.appendChild(idSpan);
        responseProcessed.appendChild(serviceSpan);
        responseProcessed.appendChild(askedSumSpan);
        responseProcessed.appendChild(approvedSumSpan);

        var link = document.createElement("a");
          // link.href = "request_processing.html";
        link.href = "";
        link.classList.add("request_details");
        link.appendChild(responseProcessed);


        link.addEventListener("click", function (event) {
          event.preventDefault();

          localStorage.setItem("id", request.id);
          window.location.href = "request_processing.html"
        });

          // Добавляем элемент response_processed в контейнер responsesContainer
          // responsesContainer.appendChild(responseProcessed);
        responsesContainer.appendChild(link);
        responseProcessedContent = document.querySelectorAll("#response_processed_content");
      } else if (request.processed == false) {
          // Создаем новый элемент response_unprocessed
        var responseUnprocessed = document.createElement("div");
        responseUnprocessed.classList.add("response_unprocessed");
        responseUnprocessed.id = "response_unprocessed_content";

          // Создаем и заполняем спаны для каждого свойства заявки
        var idSpan = document.createElement("span");
        idSpan.classList.add("id");
        idSpan.textContent = request.id;

        var serviceSpan = document.createElement("span");
        serviceSpan.classList.add("service");
        serviceSpan.textContent = request.service;

        var askedSumSpan = document.createElement("span");
        askedSumSpan.classList.add("asked_sum_unprocessed");
        askedSumSpan.textContent = request.paymentSumm;

          // Добавляем спаны в элемент response_unprocessed
        responseUnprocessed.appendChild(idSpan);
        responseUnprocessed.appendChild(serviceSpan);
        responseUnprocessed.appendChild(askedSumSpan);
        var link = document.createElement("a");
          // link.href = "request_processing.html";
        link.href = "";
        link.classList.add("request_details");
        link.appendChild(responseUnprocessed);

        link.addEventListener("click", function (event) {
          event.preventDefault();

          localStorage.setItem("id", request.id);
          window.location.href = "request_processing.html"
        });

          // Добавляем элемент response_unprocessed в контейнер responsesContainer
          // responsesContainer.appendChild(responseUnprocessed);
        responsesContainer.appendChild(link);
        responseUnprocessedContent = document.querySelectorAll("#response_unprocessed_content");
        responseUnprocessedContent.forEach(function (element) {
          element.style.display = "none";
        });
      }
    });
  })
.catch(error => {
  console.error("Error:", error);
});

var w = window.innerWidth;
var h = window.innerHeight;

var container = document.getElementById("container");

var coef = 0;
coef = (h / container.offsetHeight + w / container.offsetWidth) / 2;

container.style.transform = "scale(" + coef + ")";

var responseProcessed = document.getElementById("response_processed");
var responseUnprocessed = document.getElementById("response_unprocessed");


var processedRequests = document.getElementById("processed_requests");
var unprocessedRequests = document.getElementById("unprocessed_requests");

var urlProcessedRequests = document.getElementById("url_processed_requests");
var urlUnprocessedRequests = document.getElementById("url_unprocessed_requests");

responseUnprocessed.style.display = "none";

urlProcessedRequests.addEventListener("click", function (event) {
  event.preventDefault();

  responseUnprocessed.style.display = "none";
  responseProcessed.style.display = "flex";

  responseUnprocessedContent.forEach(function (element) {
    element.style.display = "none";
  });
  responseProcessedContent.forEach(function (element) {
    element.style.display = "flex";
  });

  processedRequests.style.background = "#0B3C32";
  urlProcessedRequests.style.color = "#EACC76";
  unprocessedRequests.style.background = "#0000";
  urlUnprocessedRequests.style.color = "#0B3C32";
});

urlUnprocessedRequests.addEventListener("click", function (event) {
  event.preventDefault();

  responseProcessed.style.display = "none";

  responseProcessedContent.forEach(function (element) {
    element.style.display = "none";
  });
  responseUnprocessedContent.forEach(function (element) {
    element.style.display = "flex";
  })

  responseUnprocessed.style.display = "flex";

  unprocessedRequests.style.background = "#0B3C32";
  urlUnprocessedRequests.style.color = "#EACC76";
  processedRequests.style.background = "#0000";
  urlProcessedRequests.style.color = "#0B3C32";
});

var buttonDropdownOpenLink = document.getElementById("button_dropdown_open_link");
var buttonDropdownCloseLink = document.getElementById("dropdown_button_close_link");
var dropdownContent = document.getElementById("dropdown_content");
dropdownContent.style.display = "none";

buttonDropdownOpenLink.addEventListener("click", function (event) {
  event.preventDefault();
  buttonDropdownOpenLink.style.display = "none";

  dropdownContent.style.display = "flex";
});

buttonDropdownCloseLink.addEventListener("click", function (event) {
  event.preventDefault();

  dropdownContent.style.display = "none";
  buttonDropdownOpenLink.style.display = "block";
});


var update_policy = document.getElementById("update_policy");
var my_limits = document.getElementById("my_limits");

update_policy.addEventListener("click", function (event) {
  event.preventDefault();
  fetch("http://212.112.103.137:6457/api/update/", {
    method: 'GET',
    headers: {
      'Authorization': "Bearer " + localStorage.getItem("accessToken")
    }
  })
  .then(response => {
    if (!response.ok) {
      dropdownContent.style.display = "none";
      buttonDropdownOpenLink.style.display = "block";
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    dropdownContent.style.display = "none";
    buttonDropdownOpenLink.style.display = "block";
        console.log(data); // Обрабатываем полученные данные
      })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
});

my_limits.addEventListener("click", function (event) {
  event.preventDefault();
  fetch("http://212.112.103.137:6457/api/limits/", {
    method: 'GET',
    headers: {
      'Authorization': "Bearer " + localStorage.getItem("accessToken")
    }
  })
  .then(response => {
    if (!response.ok) {
      dropdownContent.style.display = "none";
      buttonDropdownOpenLink.style.display = "block";
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    dropdownContent.style.display = "none";
    buttonDropdownOpenLink.style.display = "block";
    localStorage.setItem("limits", JSON.stringify(data));
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
  fetch("http://212.112.103.137:6457/api/sublimits/", {
    method: 'GET',
    headers: {
      'Authorization': "Bearer " + localStorage.getItem("accessToken")
    }
  })
  .then(response => {
    if (!response.ok) {
      dropdownContent.style.display = "none";
      buttonDropdownOpenLink.style.display = "block";
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    dropdownContent.style.display = "none";
    buttonDropdownOpenLink.style.display = "block";
    localStorage.setItem("sublimits", JSON.stringify(data));
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });


  var container_limits = document.querySelector(".container_limits");
  container_limits.style.display = "flex";
  container_limits.style.position = "fixed";

  var limits = JSON.parse(localStorage.getItem("limits"));
  var sublimits = JSON.parse(localStorage.getItem("sublimits"));
  for (let i = 0; i < sublimits.sublimits.length; i++) {
    for (let j = 0; j < limits.limits.length; j++) {
      if (sublimits.sublimits[i].limitID === limits.limits[j].id) {
        var blockWrappers = document.querySelectorAll(".block_wrapper");

        blockWrappers.forEach(wrapper => {
          var block = wrapper.querySelector(".block");

          var bold = block.querySelector("#bold");
          if (bold) {
            if (bold.innerText === limits.limits[j].limitNameCRM + "") {
              block.querySelector(".number").querySelector("span").innerText = limits.limits[j].limitSummCRM + "";
            }
          }
        })
      }
    }
  }

});



});


