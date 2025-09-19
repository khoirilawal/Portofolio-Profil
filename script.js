const typingText = document.querySelector(".typing");
const texts = ["Web Developer", "UI/UX Designer", "Freelancer"];
let i = 0, j = 0, currentText = "", isDeleting = false;

function typeEffect() {
  if (i < texts.length) {
    if (!isDeleting && j <= texts[i].length) {
      currentText = texts[i].substring(0, j++);
      typingText.textContent = currentText;
    }

    if (isDeleting && j >= 0) {
      currentText = texts[i].substring(0, j--);
      typingText.textContent = currentText;
    }

    if (j === texts[i].length + 1) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }

    if (isDeleting && j === 0) {
      isDeleting = false;
      i++;
      if (i === texts.length) i = 0;
    }
  }
  setTimeout(typeEffect, isDeleting ? 50 : 120);
}

typeEffect();
// FORM CONTACT
const form = document.getElementById("contactForm");
const messagesList = document.getElementById("messagesList");

form.addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // ambil pesan lama dari localStorage
  let messages = JSON.parse(localStorage.getItem("messages")) || [];

  // tambah pesan baru
  messages.push({name,email,message});

  // simpan kembali ke localStorage
  localStorage.setItem("messages", JSON.stringify(messages));

  // tampilkan di halaman
  displayMessages();

  // reset form
  form.reset();
});

function displayMessages(){
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  messagesList.innerHTML = messages.map((m, index) => 
    `<div class="message">
       <p><b>${m.name}</b> (${m.email}): ${m.message}</p>
       <button onclick="deleteMessage(${index})">Hapus</button>
     </div>`
  ).join("");
}

function deleteMessage(index){
  let messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.splice(index, 1); // hapus 1 pesan
  localStorage.setItem("messages", JSON.stringify(messages));
  displayMessages(); // refresh tampilan
}
function clearMessages(){
  localStorage.removeItem("messages");
  displayMessages();
}


