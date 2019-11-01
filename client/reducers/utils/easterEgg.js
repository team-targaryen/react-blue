export const easterEgg = () => {
  const audio = new Audio(
    'https://iringtone.net/rington/file?id=8454&type=sound&name=mp3'
  );
  audio.play();

  const app = document.getElementById('app');
  app.classList.add('easter-egg');

  for (let i = 0; i <= 1000; i += 1) {
    const particle = document.createElement('div');
    particle.classList.add('c');
    app.appendChild(particle);
  }

  const colorGen = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };

  setInterval(() => {
    document.querySelector('.navbar').style.backgroundColor = `${colorGen()}`;

    const buttons = document.querySelectorAll('#application *');
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].style.backgroundColor = `${colorGen()}`;
      buttons[i].style.color = `${colorGen()}`;
      buttons[i].style.fill = `${colorGen()}`;
    }
  }, 100);
};
