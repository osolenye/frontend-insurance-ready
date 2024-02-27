window.addEventListener('resize', function () {
    var w = window.innerWidth;
    var h = window.innerHeight;

    var wrapper = document.getElementById("wrapper");

    var coef = 0;
    coef = (h / wrapper.offsetHeight + w / wrapper.offsetWidth) / 2;

    wrapper.style.transform = "scale(" + coef + ")";
});

var w = window.innerWidth;
var h = window.innerHeight;

var wrapper = document.getElementById("wrapper");

var coef = 0;
coef = (h / wrapper.offsetHeight + w / wrapper.offsetWidth) / 2;

wrapper.style.transform = "scale(" + coef + ")";


var url = "http://212.112.103.137:6457/api/get_services/";
var services;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        if (data.length <= 5) {
            var allowedServices= document.getElementById("allowed_services");
            data.forEach(service => {
                var p = document.createElement("p");
                p.textContent = "- " + service.name; // Замените "name" на имя поля, содержащее информацию об услуге
                allowedServices.appendChild(p);
            });
            localStorage.setItem("services", JSON.stringify(data)); // Сохраняем данные в localStorage
        } else {
            var allowedServices= document.getElementById("allowed_services");
            var itemsPerPage = 5;
            var numPages = Math.ceil(data.length / itemsPerPage);

            var paginationPages = document.querySelector(".pagination_pages");
            for (let i = 0; i < numPages; i++) {
                var pageLink = document.createElement("a");
                pageLink.href = "#"; // Set href to "#" for now, you can update this to the appropriate URL if needed
                pageLink.addEventListener("click", function() {
                    displayServices(data, i, itemsPerPage);
                });

                var pageButton = document.createElement("li");
                pageButton.classList.add("pagination_button");
                var pageNumber = document.createElement("p");
                pageNumber.classList.add("pagination_number");
                pageNumber.textContent = i + 1;

                pageButton.appendChild(pageNumber);
                pageLink.appendChild(pageButton);
                paginationPages.appendChild(pageLink);
            }

            // Display the first page initially
            displayServices(data, 0, itemsPerPage);

            localStorage.setItem("services", JSON.stringify(data)); // Save data to localStorage
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

function displayServices(data, page, itemsPerPage) {
    var allowedServices = document.getElementById("allowed_services");
    allowedServices.innerHTML = ""; // Clear previous content

    var start = page * itemsPerPage;
    var end = start + itemsPerPage;
    var pageData = data.slice(start, end);

    pageData.forEach(service => {
        var p = document.createElement("p");
        p.textContent = "- " + service.name;
        allowedServices.appendChild(p);
    });
}
