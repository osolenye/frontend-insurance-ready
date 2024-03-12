var accepted_button = document.getElementById("accepted_button");
var isChecked = false;
var cross = document.getElementById("cross");

accepted_button.addEventListener("click", function (event) {
    event.preventDefault();

    if (isChecked == false) {
        cross.style.display = "block";
        isChecked = true;
        localStorage.setItem("isChecked", true);
    } else {
        cross.style.display = "none";
        isChecked = false;
        localStorage.setItem("isChecked", false);
    }
});




var token = localStorage.getItem("accessToken");
var id = localStorage.getItem("id");
//люблююю
// fetch('http://212.112.103.137:6457/api/payment/' + id, {
fetch('https://api.dms.insurance.kg:6458/api/payment/' + id, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error("response was not ok");
        }
        return response.json();
    })
    .then(data => {
        // console.log(data);
        //     document.getElementById("medications").href = data.opinions_on_medications;
        //     document.getElementById("kkm_check").href = data.kkmCheck;
        //     document.getElementById("invoice").href = data.invoice;
        //     document.getElementById("refferal").href = data.refferal;
        if (data !== null) {
            if (data.opinions_on_medications !== null) {
                document.getElementById("medications").href = addPortToUrl(data.opinions_on_medications);
            }
            if (data.kkmCheck !== null) {
                document.getElementById("kkm_check").href = addPortToUrl(data.kkmCheck);
            }
            if (data.invoice !== null) {
                document.getElementById("invoice").href = addPortToUrl(data.invoice);
            }
            if (data.refferal !== null) {
                document.getElementById("refferal").href = addPortToUrl(data.refferal);
            }
        }

        function addPortToUrl(url) {
            if (url) {
                // url = url.replace("http://212.112.103.137/", "http://212.112.103.137:6457/");
                url = url.replace("https://api.dms.insurance.kg/", "https://api.dms.insurance.kg:6458/");
            } else {
                url = "";
            }
            return url;
        }
    })

    .catch(error => {
        console.log("error", error);
    })
var form_patient_search = document.querySelector(".form_patient_search");
form_patient_search.addEventListener("input", function(event) {
    event.preventDefault();

    var inputValue = document.querySelector(".input_patient_name").value;
    var service = document.querySelectorAll(".service");
    if (inputValue.length == 0) {
        service.forEach(function (service) {
            service.style.display = "flex";
        });
    } else {
        service.forEach(function (service) {
            if (service.querySelector(".service_name").textContent.toLowerCase().includes(inputValue.toLowerCase())) {
                service.style.display = "flex";
            } else {
                service.style.display = "none";
            }
        });
    }
});
form_patient_search.addEventListener("submit", function(event) {
    event.preventDefault();
})

fetch('https://api.dms.insurance.kg:6458/api/get_services/', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem("services", JSON.stringify(data));
        data.forEach(function (data) {
            // Создаем элемент div
            const serviceDiv = document.createElement('div');
            serviceDiv.classList.add('service');

            // Создаем элемент a
            const serviceLink = document.createElement('a');
            serviceLink.href = '#';
            serviceLink.classList.add('service_accepted_button');

            // Создаем элемент div для чекбокса
            const checkboxWrapper = document.createElement('div');
            checkboxWrapper.classList.add('service_checkbox_wrapper');

            // Создаем SVG для неотмеченного чекбокса
            const checkboxSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            checkboxSVG.setAttribute('width', '16');
            checkboxSVG.setAttribute('height', '16');
            checkboxSVG.setAttribute('viewBox', '0 0 16 16');
            checkboxSVG.setAttribute('fill', 'none');

            const checkboxDesc = document.createElement('desc');
            checkboxSVG.appendChild(checkboxDesc);

            const checkboxRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            checkboxRect.setAttribute('x', '0.5');
            checkboxRect.setAttribute('y', '0.5');
            checkboxRect.setAttribute('width', '15');
            checkboxRect.setAttribute('height', '15');
            checkboxRect.setAttribute('stroke', '#0B3C32');
            checkboxRect.setAttribute('stroke-opacity', '1');
            checkboxRect.setAttribute('stroke-width', '1');

            checkboxSVG.appendChild(checkboxRect);
            checkboxWrapper.appendChild(checkboxSVG);

            // Создаем SVG для отмеченного чекбокса
            const checkedSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            checkedSVG.setAttribute('class', 'service_checked');
            checkedSVG.setAttribute('width', '8.707031');
            checkedSVG.setAttribute('height', '8.707092');
            checkedSVG.setAttribute('viewBox', '0 0 8.70703 8.70709');
            checkedSVG.setAttribute('fill', 'none');

            const checkedDesc = document.createElement('desc');
            checkedDesc.textContent = 'Created with Pixso.';
            checkedSVG.appendChild(checkedDesc);

            const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path1.setAttribute('d', 'M0.353516 0.353546L8.35352 8.35355');
            path1.setAttribute('stroke', '#0B3C32');
            path1.setAttribute('stroke-opacity', '1');
            path1.setAttribute('stroke-width', '1');

            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttribute('d', 'M0.353516 8.35355L8.35352 0.353546');
            path2.setAttribute('stroke', '#0B3C32');
            path2.setAttribute('stroke-opacity', '1');
            path2.setAttribute('stroke-width', '1');

            checkedSVG.appendChild(path1);
            checkedSVG.appendChild(path2);
            checkboxWrapper.appendChild(checkedSVG);

            // Добавляем элементы внутрь элемента <a>
            serviceLink.appendChild(checkboxWrapper);

            // Создаем элементы span
            const serviceNameSpan = document.createElement('span');
            serviceNameSpan.classList.add('service_name');
            serviceNameSpan.textContent = data.name;

            const serviceIdHiddenSpan = document.createElement('span');
            serviceIdHiddenSpan.classList.add('service_id_hidden');
            serviceIdHiddenSpan.textContent = data.id;

            const checked = document.createElement('span');
            checked.classList.add('checked');
            checked.textContent = "false";

            // Добавляем элементы span внутрь элемента div.service
            serviceDiv.appendChild(serviceLink);
            serviceDiv.appendChild(serviceNameSpan);
            serviceDiv.appendChild(serviceIdHiddenSpan);
            serviceDiv.appendChild(checked);

            // Добавляем элемент div.service внутрь другого элемента (например, body)
            var patient_inn = document.querySelector(".patient_inn");
            patient_inn.appendChild(serviceDiv);
        });

        var checked_id = [];
        var service = document.querySelectorAll(".service");
        var flag = false;
        service.forEach(function (element) {
            var service_accepted_button = element.querySelector(".service_accepted_button");

            service_accepted_button.addEventListener("click", function (event) {
                event.preventDefault();

                var checked = element.querySelector(".checked");
                if (flag == false) {
                    var service_checked = element.querySelector(".service_checked");
                    service_checked.style.visibility = "visible";
                    flag = true;
                    checked.innerHTML = "true";
                } else {
                    var service_checked = element.querySelector(".service_checked");
                    service_checked.style.visibility = "hidden";
                    flag = false;
                    checked.innerHTML = "false";
                }
            });
        });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });




var process = document.querySelector(".process");

process.addEventListener("submit", function (event) {
    event.preventDefault();
    var service = document.querySelectorAll(".service");
    var service_id = [];
    service.forEach(function (element) {
        var checked = element.querySelector(".checked");
        var id = element.querySelector('.service_id_hidden');

        if (checked.innerHTML === "true") {
            service_id.push(id.innerHTML);
        }
    });


    var formData = {
        approved: localStorage.getItem("isChecked"),
        processed: true,
        finalSumm: parseInt(document.getElementById("finalSumm").value),
        service: service_id
    }

    var jsonData = JSON.stringify(formData);
    console.log(jsonData);

    fetch("https://api.dms.insurance.kg:6458/payment/update/" + id + "/", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
        body: jsonData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response is not ok");
            }
            return response.json();
        })
        .then(data => {
            window.location.href = "/profile/";
        })
        .catch(error => {
            console.error("There is a problem with the fetch operation", error);
        });
});

