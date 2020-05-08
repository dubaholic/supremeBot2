var url = window.location.href;
var i;

var category = "accessories";
var item_name = "Tagless Tees";
var item_size = "Medium";

var fullName = "Jens Rosseau";
var email = "jens.rosseau@gmail.com";
var telephoneNumber = "0496919901";
var address = "Krokusstraat 20";
var city = "Merksem";
var zipCode = "2170";
var countryCode = "BE";
var paymentOption = "paypal";


function fillCheckOut() {
    document.getElementById("order_billing_name").value = fullName;
    document.getElementById("order_email").value = email;
    document.getElementById("order_tel").value = telephoneNumber;
    document.getElementById("bo").value = address;
    document.getElementById("order_billing_city").value = city;
    document.getElementById("order_billing_zip").value = zipCode;
    document.getElementById("order_billing_country").value = countryCode;
    document.getElementById("credit_card_type").value = paymentOption;
    document.getElementsByClassName("iCheck-helper")[1].click();
    var timeEnd = new Date;
    localStorage.setItem("endTime", timeEnd.getSeconds());
    setTimeout(document.getElementsByName("commit")[0].click(), 2000);
}

function pickCategory() {
    chrome.storage.sync.get('category', function (data) {
        var redirect = "https://www.supremenewyork.com/shop/all/";
        var replace = redirect + category;
        chrome.runtime.sendMessage({ redirect: replace });
    });
}

function pickItem() {
    chrome.storage.sync.get('item_name', function (data) {
        var items = document.getElementsByClassName('name-link');

        for (i = 0; i < items.length; i++) {
            console.log(items[i].innerHTML);
            console.log("gets here");
            if ((items[i].innerHTML).includes(item_name)) {
                localStorage.setItem("itemUrl", items[i].href);
                chrome.runtime.sendMessage({ redirect: items[i].href });
                cartItem(items[i].href);
                break;
            }
        }
    });
}

function cartItem() {
    // document.getElementById("size").innerHTML;
    var options = document.getElementById("size").options;

    for (i = 0; i < options.length; i++) {
        console.log(options[i]);
        if ((options[i].innerHTML).includes(item_size)) {
            document.getElementById("size").value = options[i].value;
            document.getElementsByName("commit")[0].click();
            setTimeout(redirectToCheckOut, 2200);
        }
    }


}

function redirectToCheckOut() {
    chrome.runtime.sendMessage({ redirect: "https://www.supremenewyork.com/checkout" });
}

if (url == "https://www.supremenewyork.com/shop/all") {
    var timeStart = new Date;
    localStorage.setItem("startTime", timeStart.getSeconds());
    pickCategory();
}

else if (url != "https://www.supremenewyork.com/shop/all") {
    pickItem();
}

if (url == "https://www.supremenewyork.com/checkout") {
    fillCheckOut();
}

if (url.indexOf("https://www.paypal.com/") > -1) {
    console.log("paypal test");

}

if (url == localStorage.getItem("itemUrl")) {
    cartItem();
}

//payment-submit-btn