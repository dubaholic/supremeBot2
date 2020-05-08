var url = window.location.href;
var i;

var category = "sweatshirts";
var item_name = "World Famous"

var fullName = "John Doe";
var email = "test@gmail.com";
var telephoneNumber = "04969425423";
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
    document.getElementsByName("commit")[0].click();
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
            if ((items[i].innerHTML).includes(item_name)) {
                chrome.runtime.sendMessage({ redirect: items[i].href });
                //console.log(items[i].href);
                cartItem(items[i].href);
                //location.replace("https://www.supremenewyork.com/checkout");
                break;
            }
        }
    });
}

function cartItem(){
    console.log("gets here");
    //document.getElementById("size").value = "Medium";
    document.getElementsByName("commit")[0].click();
    chrome.runtime.sendMessage({ redirect: "https://www.supremenewyork.com/checkout"});
}

if (url == "https://www.supremenewyork.com/shop/all") {
    pickCategory();
}

else if (url != "https://www.supremenewyork.com/shop/all") {
    pickItem();
}

if (url == "https://www.supremenewyork.com/checkout") {
    fillCheckOut();
}

if(url.indexOf("https://www.paypal.com/") > -1) {
    console.log("paypal test");
}

if(url == "https://www.supremenewyork.com/shop/sweatshirts/hadolbm71/pfor4azin") {
    cartItem();
}

//payment-submit-btn