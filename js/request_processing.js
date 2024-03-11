document.addEventListener("DOMContentLoaded", (event) => {
    var user = (JSON.parse(localStorage.getItem("user")));
    console.log(user);

    var client_fio_element = document.getElementById("client_fio");
    var client_inn_element = document.getElementById("client_inn");
    var client_fam_member_fio_element = document.getElementById("client_fam_member_fio");
    var client_fam_member_fio2_element = document.getElementById("client_fam_member_fio2");
    var policy_element = document.getElementById("policy");
    var service_element = document.getElementById("service");
    var insurance_element = document.getElementById("insurance");
    var cost_element = document.getElementById("cost");
    var comment_element = document.getElementById("comment");

    client_fio_element.innerHTML = user.first_name + " " + user.last_name;
    client_inn_element.innerHTML = user.inn;
    client_fam_member_fio_element.innerHTML = user.fam_member1_fullname + " fam 1";
    client_fam_member_fio2_element.innerHTML = user.fam_member2_fullname + " fam 2";
});


var token = localStorage.getItem("accessToken");
var id = localStorage.getItem("id");
// fetch('http://212.112.103.137:6457/api/payment/' + id, {
fetch('https://api.dms.insurance.kg:6458/api/payment' + id, {
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
        
    if (data !== null) {
        var policy_element = document.getElementById("policy");
        var service_element = document.getElementById("service");
        var insurance_element = document.getElementById("insurance");
        var cost_element = document.getElementById("cost");
        var comment_element = document.getElementById("comment");
        console.log(data);
        policy_element.innerHTML = data.policy + " policy";
        service_element.innerHTML = data.service + " service";
        insurance_element.innerHTML = data.insurance + " insurance";
        cost_element.innerHTML = data.paymentSumm + " paymentSumm";
        comment_element.innerHTML = data.comment + " comment";
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