var accepted_button = document.getElementById("accepted_button");
var isChecked = false;
var cross = document.getElementById("cross");

accepted_button.addEventListener("click", function (event) {
    event.preventDefault();

    if (isChecked == false) {
        cross.style.display = "block";
        isChecked = true;
    } else {
        cross.style.display = "none";
        isChecked = false;
    }
});




var token = localStorage.getItem("accessToken");
var id = localStorage.getItem("id");
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
                url = url.replace("http://212.112.103.137/", "http://212.112.103.137:6457/");
            } else {
                url = "";
            }
            return url;
        }
    })

    .catch(error => {
        console.log("error", error);
    })