document.querySelector("#submit").addEventListener("click", (event) => {
  event.preventDefault();
  abcd();
  let form = document.getElementsByTagName("form")[0];
  form.reset();
});

function abcd() {
  let userName = document.getElementById("username").value;
  let userEmail = document.getElementById("userEmail").value;
  let phoneNumber = document.getElementById("phoneNumber").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;
  console.log(
    `Name is ${userName} and email is ${userEmail} and phone Number is ${phoneNumber} and date of Appointment is ${date} and time is ${time}`
  );
}
