let bill_value = document.getElementById("bill_value");
let number_of_people = document.getElementById("number_of_people");
let tip_per_person = document.getElementById("tip_per_person");
let tip_total = document.getElementById("tip_total");
let buttons = document.querySelectorAll(".button1");
let button_custom = document.getElementById("button_custom");
let reset = document.getElementById("reset");

bill_value.addEventListener("input", updateCalculation);
number_of_people.addEventListener("input", updateCalculation);

buttons.forEach((button) => {
  button.addEventListener("click", (one) => {
    let tipvalue = one.target.innerText;
    tipvalue = tipvalue.substr(0, tipvalue.length - 1);

    calculate_tip(
      parseFloat(bill_value.value),
      parseInt(tipvalue),
      parseInt(number_of_people.value)
    );
  });
});

button_custom.addEventListener("input", (one) => {
  let customTip = parseFloat(one.target.value);

  if (isNaN(customTip) || customTip <= 0) {
    resetall();
    return;
  }

  calculate_tip(
    parseFloat(bill_value.value),
    customTip,
    parseInt(number_of_people.value)
  );
});

function updateCalculation() {
  if (bill_value.value === "" || isNaN(bill_value.value)) return;

  if (
    number_of_people.value === "" ||
    isNaN(number_of_people.value) ||
    parseInt(number_of_people.value) <= 0
  ) {
    number_of_people.value = 1;
  }

  let tip_percentage = parseFloat(button_custom.value) || 0;

  if (tip_percentage <= 0) return;

  calculate_tip(
    parseFloat(bill_value.value),
    tip_percentage,
    parseInt(number_of_people.value)
  );
}

function calculate_tip(bill_value, tip_percentage, number_of_people) {
  if (number_of_people <= 0 || isNaN(bill_value) || isNaN(tip_percentage)) {
    resetall();
    return;
  }

  let tip_amount = (bill_value * tip_percentage) / 100 / number_of_people;
  let tip = Math.floor(tip_amount * 100) / 100;
  tip = tip.toFixed(2);

  let total_amount =
    (bill_value + tip_amount * number_of_people) / number_of_people;
  total_amount = total_amount.toFixed(2);

  tip_per_person.value = `$${tip}`;
  tip_total.value = `$${total_amount}`;

  tip_per_person.placeholder = `$${tip}`;
  tip_total.placeholder = `$${total_amount}`;
}

reset.addEventListener("click", resetall);

function resetall() {
  tip_total.value = "$0.00";
  tip_per_person.value = "$0.00";
  bill_value.value = "";
  number_of_people.value = "";
  button_custom.value = "";
  tip_total.placeholder = "$0.00";
  tip_per_person.placeholder = "$0.00";
}
