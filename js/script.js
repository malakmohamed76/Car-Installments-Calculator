const form = document.querySelector("form");

// Inputs
const carType = document.getElementById("car-type");
const carModel = document.getElementById("car-model");
const price = document.getElementById("price");
const downPayment = document.getElementById("down-payment");
const term = document.getElementById("term");
const interest = document.getElementById("interest");

// Result elements
const monthlyInstallment = document.querySelector(".result-banner h2");

const resultRows = document.querySelectorAll(".detail-row strong");

const resultCarType = resultRows[0];
const resultCarModel = resultRows[1];
const resultPrice = resultRows[2];
const resultDownPayment = resultRows[3];
const resultTerm = resultRows[4];
const resultInterest = resultRows[5];

const totalAmount = document.querySelector(".total-box h3");

// ===============================
// Calculate Interest Automatically
// ===============================

function calculateInterest(months) {
const years = months / 12;
const interestRate = years * 12;

return interestRate;


}

// ===============================
// Form Submit
// ===============================

form.addEventListener("submit", function (e) {

e.preventDefault();

const carTypeValue = carType.value;
const carModelValue = carModel.value;

const carPrice = Number(price.value);
const downPaymentValue = Number(downPayment.value);
const termValue = Number(term.value);


// ===============================
// Validation
// ===============================

if (
    !carTypeValue ||
    !carModelValue ||
    carPrice <= 0 ||
    downPaymentValue < 0 ||
    termValue <= 0
) {

    alert("Please fill in all fields correctly.");

    return;
}


// Down payment cannot be greater than price

if (downPaymentValue >= carPrice) {

    alert("Down payment must be less than the car price.");

    return;
}


// ===============================
// Calculate Interest
// ===============================

const interestRate = calculateInterest(termValue);

interest.value = `${interestRate}%`;


// ===============================
// Calculate Financing
// ===============================

const financedAmount =
    carPrice - downPaymentValue;


// Calculate interest amount

const interestAmount =
    financedAmount * (interestRate / 100);


// Total amount including interest

const totalPaid =
    financedAmount + interestAmount;


// Monthly installment

const monthlyPayment =
    totalPaid / termValue;


// ===============================
// Format Numbers
// ===============================

function formatNumber(number) {

    return number.toLocaleString("en-US", {

        maximumFractionDigits: 2

    });

}


// ===============================
// Get Selected Text
// ===============================

const carTypeText =
    carType.options[carType.selectedIndex].text;

const carModelText =
    carModel.options[carModel.selectedIndex].text;


// ===============================
// Update Result
// ===============================

monthlyInstallment.innerHTML =
    `${formatNumber(monthlyPayment)} <small>EGP</small>`;


resultCarType.textContent =
    carTypeText;


resultCarModel.textContent =
    carModelText;


resultPrice.textContent =
    `${formatNumber(carPrice)} EGP`;


resultDownPayment.textContent =
    `${formatNumber(downPaymentValue)} EGP`;


resultTerm.textContent =
    `${termValue} Months`;


resultInterest.textContent =
    `${interestRate}%`;


totalAmount.textContent =
    `${formatNumber(totalPaid)} EGP`;


});

// ===============================
// Update Interest When Term Changes
// ===============================

term.addEventListener("input", function () {


const months = Number(term.value);

if (months > 0) {

    const interestRate =
        calculateInterest(months);

    interest.value =
        `${interestRate}%`;

} else {

    interest.value = "0%";

}


});
