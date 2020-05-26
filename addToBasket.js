var url = window.location.href;
var i;

//item info
var category = "";
var item_name = "";
//Leave blank if you don't know the item color
var item_color = "";
//Leave blank if that item has no size
var item_size = "";

//Personal info
var fullName = "";
var email = "";
var telephoneNumber = "";
var address = "";
var address2 = "";
var address3 = "";
var city = "";
var zipCode = "";
var countryCode = "";

//Payment options
var paymentOption = "paypal";
var creditcardNumber = "";
var creditcardMonth = "";
var creditcardYear = "";
var creditcardCvv = "";

// var creditcardNumber = "";
// var creditcardMonth = "";
// var creditcardYear = "";
// var creditcardCvv = "";

//Delay options
var cartItemDelay = 1900;
var checkoutDelay = 5000;

function fillCheckOut() {

    //Fill in the personal info
    document.getElementById("order_billing_name").value = fullName;
    document.getElementById("order_email").value = email;
    document.getElementById("order_tel").value = telephoneNumber;
    document.getElementById("bo").value = address;
    document.getElementById("oba3").value = address2;
    document.getElementById("order_billing_address_3").value = address3;
    document.getElementById("order_billing_city").value = city;
    document.getElementById("order_billing_zip").value = zipCode;
    document.getElementById("order_billing_country").value = countryCode;

    //Fill in all the CC info
    document.getElementById("credit_card_type").value = paymentOption;
    if (paymentOption != "paypal") {
        document.getElementById("cnb").value = creditcardNumber;
        document.getElementById("credit_card_month").value = creditcardMonth;
        document.getElementById("credit_card_year").value = creditcardYear;
        document.getElementById("vval").value = creditcardCvv;
    }

    document.getElementsByClassName("iCheck-helper")[1].click();

    var timeEnd = new Date;
    localStorage.setItem("endTime", timeEnd.getSeconds());

    setTimeout(clickCheckout, 1900);

}

function clickCheckout() {
    var timeEnd = new Date;
    localStorage.setItem("endTime2", timeEnd.getSeconds());
    document.getElementsByName("commit")[0].click()
}

function pickCategory() {
    chrome.storage.sync.get('selectedCategory', function (data) {
        var redirect = "https://www.supremenewyork.com/shop/all/";
        var replace = redirect + category;
        chrome.runtime.sendMessage({ redirect: replace });
    });
}

function pickItem() {
    chrome.storage.sync.get('item_name', function (data) {
        var items = document.getElementsByClassName('inner-article');
        for (i = 0; i < items.length; i++) {
            //If both item name and color are known
            if ((items[i].innerHTML).includes(item_name) && (items[i].innerHTML).includes(item_color)) {
                var itemUrl = items[i].getElementsByClassName("name-link")[0].href;
                localStorage.setItem("itemUrl", itemUrl);
                chrome.runtime.sendMessage({ redirect: itemUrl });
                cartItem(itemUrl);
                break;
            } 
            //Check if only item name is known
            else if ((items[i].innerHTML).includes(item_name)){
                var itemUrl = items[i].getElementsByClassName("name-link")[0].href;
                localStorage.setItem("itemUrl", itemUrl);
                chrome.runtime.sendMessage({ redirect: itemUrl });
                cartItem(itemUrl);
                break;
            }
        }
    });
}

function cartItem() {
    chrome.storage.sync.get('item_size', function (data) {
        if (item_size != "") {
            var options = document.getElementById("size").options;
            for (i = 0; i < options.length; i++) {
                if ((options[i].innerHTML).includes(item_size) && !(options[i].innerHTML).includes("XLarge")) {
                    document.getElementById("size").value = options[i].value;
                    document.getElementsByName("commit")[0].click();
                    setTimeout(redirectToCheckOut, 1500);
                }
            }
        }
        else 
        {
            document.getElementsByName("commit")[0].click();
            setTimeout(redirectToCheckOut, 1500);
        }
    });
}

function checkAvailability() {
    while (document.getElementById("add-remove-buttons").includes("sold out")) {
        setTimeout(location.reload(), 3000);
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