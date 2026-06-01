// inputs
const billInput = document.getElementById("bill");
const customTipInput = document.getElementById("custom-tip");
const peopleInput = document.getElementById("people");
const tipButtons = document.querySelectorAll(".tip-btn");

// error spans
const billError = document.getElementById("bill-error");
const tipError = document.getElementById("tip-error");
const peopleError = document.getElementById("people-error");

// outputs
const tipAmountDisplay = document.getElementById("tip-amount-display");
const grandTotalDisplay = document.getElementById("grand-total-display");
const perPersonDisplay = document.getElementById("per-person-display");

// reset button
const resetBtn = document.getElementById("reset-btn");

// state variables
let billValue = 0;
let tipValue = 0; // percentage
let peopleValue = 1;

// core calculation logic
function calculate() {
  // only calculate if inputs are valid
  if (
    billValue < 0 ||
    tipValue < 0 ||
    peopleValue < 1 ||
    !Number.isInteger(peopleValue)
  ) {
    return;
  }

  // math
  const totalTip = billValue * (tipValue / 100);
  const grandTotal = billValue + totalTip;
  const perPersonShare = grandTotal / peopleValue;

  // rounding policy: rounding up the per-person share so the restaurant is never shorted.
  // e.g., 100 / 3 = 33.3333... we round to 33.34 so 33.34 * 3 = 100.02 (fully covers bill)
  const roundedPerPerson = Math.ceil(perPersonShare * 100) / 100;

  // update ui
  tipAmountDisplay.textContent = `Rs ${totalTip.toFixed(2)}`;
  grandTotalDisplay.textContent = `Rs ${grandTotal.toFixed(2)}`;
  perPersonDisplay.textContent = `Rs ${roundedPerPerson.toFixed(2)}`;
}

// validation & event handlers
// 1. bill input handler
billInput.addEventListener("input", (e) => {
  const val = parseFloat(e.target.value);

  if (e.target.value === "") {
    billValue = 0;
    clearError(billInput, billError);
  } else if (val < 0) {
    showError(billInput, billError, "Bill cannot be negative");
    billValue = -1; // invalid state
  } else {
    clearError(billInput, billError);
    billValue = val;
  }
  calculate();
});

// 2. tip preset buttons handler
tipButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // remove active class from all buttons
    tipButtons.forEach((btn) => btn.classList.remove("active"));

    // add active class to clicked button
    e.target.classList.add("active");

    // clear custom tip input and error
    customTipInput.value = "";
    clearError(customTipInput, tipError);

    // set tip value and calculate
    tipValue = parseFloat(e.target.getAttribute("data-val"));
    calculate();
  });
});

// 3. custom tip input handler
customTipInput.addEventListener("input", (e) => {
  // remove active state from preset buttons when typing custom
  tipButtons.forEach((btn) => btn.classList.remove("active"));

  const val = parseFloat(e.target.value);

  if (e.target.value === "") {
    tipValue = 0;
    clearError(customTipInput, tipError);
  } else if (val < 0) {
    showError(customTipInput, tipError, "Tip cannot be negative");
    tipValue = -1;
  } else if (val > 1000) {
    // sensible upper bound requirement
    showError(customTipInput, tipError, "Max tip is 1000%");
    tipValue = -1;
  } else {
    clearError(customTipInput, tipError);
    tipValue = val;
  }
  calculate();
});

// 4. people input handler
peopleInput.addEventListener("input", (e) => {
  const val = parseFloat(e.target.value);

  if (e.target.value === "") {
    peopleValue = 1; // default to 1 to prevent division by zero visually
    clearError(peopleInput, peopleError);
  } else if (val < 1) {
    showError(peopleInput, peopleError, "Must be at least 1 person");
    peopleValue = 0;
  } else if (!Number.isInteger(val)) {
    showError(peopleInput, peopleError, "Must be a whole number");
    peopleValue = 0;
  } else {
    clearError(peopleInput, peopleError);
    peopleValue = val;
  }
  calculate();
});

// 5. reset button handler
resetBtn.addEventListener("click", () => {
  // reset inputs
  billInput.value = "";
  customTipInput.value = "";
  peopleInput.value = "";

  // reset buttons
  tipButtons.forEach((btn) => btn.classList.remove("active"));

  // clear errors
  clearError(billInput, billError);
  clearError(customTipInput, tipError);
  clearError(peopleInput, peopleError);

  // reset state and outputs
  billValue = 0;
  tipValue = 0;
  peopleValue = 1;

  tipAmountDisplay.textContent = "Rs 0.00";
  grandTotalDisplay.textContent = "Rs 0.00";
  perPersonDisplay.textContent = "Rs 0.00";
});

// helper functions for errors
function showError(inputElement, errorElement, message) {
  errorElement.textContent = message;
  errorElement.classList.add("show");
  inputElement.classList.add("input-error");
}

function clearError(inputElement, errorElement) {
  errorElement.textContent = "";
  errorElement.classList.remove("show");
  inputElement.classList.remove("input-error");
}
