export const easterEgg = () => {
  const audio = new Audio(
    'https://iringtone.net/rington/file?id=8454&type=sound&name=mp3'
  );
  audio.play();

  const app = document.getElementById('app');
  app.classList.add('secret');

  for (let i = 0; i <= 1000; i += 1) {
    const particle = document.createElement('i');
    particle.classList.add('particle');
    app.appendChild(particle);
  }

  const colorGen = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };

  setInterval(() => {
    document.querySelector(
      '.navbar'
    ).style.backgroundColor = `${colorGen()}`;

    const buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].style.backgroundColor = `${colorGen()}`;
    }

    const navIcons = document.getElementsByClassName('fas');
    for (let i = 0; i < navIcons.length; i += 1) {
      navIcons[i].style.color = `${colorGen()}`;
    }

    const icons = document.getElementsByClassName('far');
    for (let i = 0; i < icons.length; i += 1) {
      icons[i].style.color = `${colorGen()}`;
    }

    const nodeBase = document.getElementsByClassName('nodeBase');
    for (let i = 0; i < nodeBase.length; i += 1) {
      nodeBase[i].style.fill = `${colorGen()}`;
    }

    const leafNodeBase = document.getElementsByClassName('leafNodeBase');
    for (let i = 0; i < leafNodeBase.length; i += 1) {
      leafNodeBase[i].style.fill = `${colorGen()}`;
    }
  }, 100);
}