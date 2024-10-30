const myValues = document.querySelectorAll(".options");
const SubmitBtn = document.querySelector(".Submit-btn");

const clearButton=document.querySelector('.Clear-result');
clearButton.addEventListener('click',() => {
  const Amount = document.getElementById("user-amount");
  const years = document.getElementById("years");
  const percentage = document.getElementById("percent");

  Amount.value="";
  years.value="";
  percentage.value="";
  myValues.forEach((ele) => {
    ele.classList.remove("selected");
  });

  document.querySelector(".default-page").style.display = "flex";
  document.querySelector(".result-page").style.display = "none";

/*  MAKE THIS RADIO BUTTONS RESET   */

    const radios = document.getElementsByName('radio_type');
    radios.forEach(radio => radio.checked = false);


})

myValues.forEach((opt) => {
  opt.addEventListener("input", (e) => {
    e.stopPropagation();

    myValues.forEach((ele) => {
      ele.classList.remove("selected");
    });

    opt.classList.add("selected");
  });
});

SubmitBtn.addEventListener("click", () => {
  const Amount = document.getElementById("user-amount");
  const years = document.getElementById("years");
  const percentage = document.getElementById("percent");
  const paymentMethod = document.querySelector(".options.selected");
  let valid = true;

  /* console.log("payment method value "+paymentMethod.value); */
  const paymentInput = document.querySelector(".options.selected input");

  /*console.log("payment input value "+paymentInput.value);*/

  /* ERROR STATEMENTS*/

  if (Amount.value == "") {
    valid = false;
    errorStatement(Amount, "This field is required");
  }
  if (years.value == "") {
    valid = false;
    errorStatement(years, "This field is required");
  }
  if (percentage.value == "") {
    valid = false;
    errorStatement(percentage, "This field is required");
  }
  if (paymentMethod == null) {
    valid = false;
    errorStatement(paymentInput, "This field is required");
  }

  //SET SUCCESS

  if (Amount.value !== "") {
    setSuccess(Amount);
  }
  if (years.value !== "") {
    setSuccess(years);
  }
  if (percentage.value !== "") {
    setSuccess(percentage);
  }
  if (paymentMethod !== null) {
    setSuccess(paymentInput);
  }
  if (valid == true) {
    let resultMonthlyDocument = document.querySelector(".result-ans");
    let resultYearlyDocument = document.querySelector(".result-yearly-pay");
    if (paymentInput.value == "Repayment") {
      let result =
        (parseInt(Amount.value) *
          (parseInt(percentage.value) / 12) *
          Math.pow(1 + parseInt(percentage.value), parseInt(years.value))) /
          Math.pow(1 + parseInt(percentage.value), parseInt(years.value)) -
        1;
      let monthlyPayment =
        (parseInt(Amount.value) * parseInt(percentage.value)) / 100;

      resultMonthlyDocument.innerText = "$" + monthlyPayment;

      resultYearlyDocument.innerText = "$" + result.toFixed(2);
      document.querySelector(".default-page").style.display = "none";
      document.querySelector(".result-page").style.display = "flex";
      console.log(result);
    } else if (paymentInput.value == "Intrest") {
      let IntrestResult =
        parseInt(Amount.value) *
        parseInt(years.value) *
        parseInt(percentage.value);
      let total = IntrestResult / 100;
      let monthlyIntrestPayment =
        (parseInt(Amount.value) * parseInt(percentage.value)) / 100;
      resultMonthlyDocument.innerText="$"+monthlyIntrestPayment;
      resultYearlyDocument.innerText="$"+total;
      document.querySelector(".default-page").style.display = "none";
      document.querySelector(".result-page").style.display = "flex";
      console.log(total);
    }
  }
});
function errorStatement(parentele, content) {
  parentele.parentElement.parentElement.classList.add("error");
  parentele.parentElement.parentElement.querySelector(
    ".error-statement"
  ).innerText = content;
}
function setSuccess(parent) {
  parent.parentElement.parentElement.classList.remove("error");
  parent.parentElement.parentElement.querySelector(
    ".error-statement"
  ).innerText = "";
}
