
var countDownDate = new Date("Feb 7, 2026 15:00:00").getTime();

function updateCountdown() {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  if (distance < 0) {
    document.getElementById("contador").innerHTML = "Hoje Deus permitiu a união de propósitos! 💍❤️";
    clearInterval(x);
    return;
  }

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("dias").textContent = String(days).padStart(2, '0');
  document.getElementById("horas").textContent = String(hours).padStart(2, '0');
  document.getElementById("minutos").textContent = String(minutes).padStart(2, '0');
  document.getElementById("segundos").textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
var x = setInterval(updateCountdown, 1000);



//-------------------------------------------------------------------------------------------------------------
window.addEventListener('scroll', myFunction);


function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";

  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
}


//-------------------------------------------------------------------------------------------------------------
function toast() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  function copyToClickBoard(){
    var content = document.getElementById('dado').innerHTML;

    navigator.clipboard.writeText(content)
    //     .then(() => {
    //     console.log("Text copied to clipboard...")
    // })
    //     .catch(err => {
    //     console.log('Something went wrong', err);
    // })
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
 
}