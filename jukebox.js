let promptSelect = document.getElementById("promptSelect");
let playBtn = document.getElementById("playBtn");
let playerStatus = document.getElementById("playerStatus");
let audio = new Audio();

fetch("prompts.json")
  .then(res => res.json())
  .then(data => {
    let genre = "drum_and_bass";
    let prompts = data[genre];
    prompts.forEach((prompt, index) => {
      let option = document.createElement("option");
      option.value = `samples/loop${index + 1}.mp3`;
      option.text = prompt;
      promptSelect.appendChild(option);
    });
  });

playBtn.addEventListener("click", () => {
  let selectedSample = promptSelect.value;
  if (!selectedSample) {
    alert("Please select a prompt first!");
    return;
  }

  audio.src = selectedSample;
  audio.play();
  playerStatus.innerText = "Status: Playing...";
  audio.onended = () => {
    playerStatus.innerText = "Status: Idle";
  };
});