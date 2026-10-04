const openCard = document.getElementById("openCard");
const closeCard = document.getElementById("closeCard");
const book = document.querySelector(".book");

const teacherInput = document.getElementById("teacherInput");
const studentInput = document.getElementById("studentInput");
const messageInput = document.getElementById("messageInput");
const photoInput = document.getElementById("photoInput");
const audioInput = document.getElementById("audioInput");

const frontTeacher = document.getElementById("frontTeacher");
const frontStudent = document.getElementById("frontStudent");
const messageText = document.getElementById("messageText");
const teacherPhoto = document.getElementById("teacherPhoto");
const audioPlayer = document.getElementById("audioPlayer");
const musicToggle = document.getElementById("musicToggle");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");
const saveStatus = document.getElementById("saveStatus");

const defaults = {
  teacher: "MR. RANDY BELLO",
  student: "JUDY IRISH MAHINAY",
  message: "Thank you for teaching, inspiring, and believing in us. You make learning meaningful. ❤️"
};

openCard.addEventListener("click", () => {
  book.classList.add("open");
});

closeCard.addEventListener("click", () => {
  book.classList.remove("open");
});

musicToggle.addEventListener("click", async () => {
  if (audioPlayer.paused) {
    try {
      await audioPlayer.play();
      musicToggle.textContent = "❚❚ Pause Music";
      musicToggle.setAttribute("aria-pressed", "true");
    } catch (error) {
      musicToggle.textContent = "▶ Play Music";
      alert("Your browser could not start the audio. Use the audio controls below the card or check the selected audio file.");
    }
  } else {
    audioPlayer.pause();
    musicToggle.textContent = "▶ Play Music";
    musicToggle.setAttribute("aria-pressed", "false");
  }
});

audioPlayer.addEventListener("ended", () => {
  musicToggle.textContent = "▶ Play Music";
  musicToggle.setAttribute("aria-pressed", "false");
});

applyBtn.addEventListener("click", () => {
  frontTeacher.textContent = teacherInput.value.trim() || defaults.teacher;
  frontStudent.textContent = studentInput.value.trim() || defaults.student;
  messageText.textContent = messageInput.value.trim() || defaults.message;

  if (photoInput.files && photoInput.files[0]) {
    const file = photoInput.files[0];
    if (file.type.startsWith("image/")) {
      teacherPhoto.src = URL.createObjectURL(file);
    }
  }

  if (audioInput.files && audioInput.files[0]) {
    const file = audioInput.files[0];
    if (file.type.startsWith("audio/")) {
      audioPlayer.src = URL.createObjectURL(file);
      audioPlayer.load();
      audioPlayer.pause();
      musicToggle.textContent = "▶ Play Music";
      musicToggle.setAttribute("aria-pressed", "false");
    }
  }

  saveStatus.textContent = "Changes applied";
  setTimeout(() => {
    saveStatus.textContent = "Ready";
  }, 1800);
});

resetBtn.addEventListener("click", () => {
  teacherInput.value = defaults.teacher;
  studentInput.value = defaults.student;
  messageInput.value = defaults.message;
  photoInput.value = "";
  audioInput.value = "";

  frontTeacher.textContent = defaults.teacher;
  frontStudent.textContent = defaults.student;
  messageText.textContent = defaults.message;

  teacherPhoto.src = "assets/teacher-photo.jpg";
  audioPlayer.src = "assets/teachers-day-song.mp3";
  audioPlayer.load();
  audioPlayer.pause();

  musicToggle.textContent = "▶ Play Music";
  musicToggle.setAttribute("aria-pressed", "false");
  saveStatus.textContent = "Reset complete";
  setTimeout(() => {
    saveStatus.textContent = "Ready";
  }, 1800);
});
