let darkMode = false;

function changeDarkMode() {
  document.body.classList.toggle('dark-mode');
  let circle = document.querySelector('.circle');
  circle.innerHTML = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
  
  if (darkMode) {
    darkMode = false;
    document.documentElement.style.setProperty("--text-color", "black");
    document.documentElement.style.setProperty("--background-color", "#efe7e5");
    document.getElementById("dark-light-mode").innerHTML = "Dark mode";
  } else {
    darkMode = true;
    document.documentElement.style.setProperty("--text-color", "white");
    document.documentElement.style.setProperty("--background-color", "black");
    document.getElementById("dark-light-mode").innerHTML = "Light mode";
  }
  
}


function translatePage(lang) {
  var url = "https://translate.google.com/translate?hl=" + lang + "&sl=auto&u=" + encodeURIComponent(window.location.href);
  window.location.href = url;
}
