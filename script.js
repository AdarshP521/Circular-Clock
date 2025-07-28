const ringsData = [
  { class: "year-ring", values: [new Date().getFullYear().toString()] },
  { class: "month-ring", values: [...Array(12).keys()].map(i => new Date(0, i).toLocaleString('default', { month: 'short' })) },
  { class: "day-ring", values: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
  { class: "date-ring", values: [...Array(31).keys()].map(i => `${i + 1}`) },
  { class: "hour-ring", values: [...Array(24).keys()].map(i => `${i}`) },
  { class: "minute-ring", values: [...Array(60).keys()].map(i => `${i}`) },
  { class: "second-ring", values: [...Array(60).keys()].map(i => `${i}`) },
];

// Create circular labels
ringsData.forEach(ring => {
  const ringDiv = document.querySelector(`.${ring.class}`);
  const count = ring.values.length;
  ring.values.forEach((value, i) => {
    const el = document.createElement('div');
    el.style.transform = `rotate(${(360 / count) * i}deg) translateY(-${ringDiv.clientHeight / 2}px)`;
    el.textContent = value;
    ringDiv.appendChild(el);
  });
});

function updateClock() {
  const now = new Date();
  const values = [
    now.getFullYear().toString(),
    now.toLocaleString('default', { month: 'short' }),
    ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][now.getDay()],
    `${now.getDate()}`,
    `${now.getHours()}`,
    `${now.getMinutes()}`,
    `${now.getSeconds()}`
  ];

  ringsData.forEach((ring, idx) => {
    const ringEl = document.querySelector(`.${ring.class}`);
    const divs = ringEl.querySelectorAll('div');

    divs.forEach(div => {
      div.classList.toggle("active", div.textContent === values[idx]);
    });

    const activeIndex = ring.values.findIndex(v => v.toString() === values[idx]);
    const anglePer = 360 / ring.values.length;
    const rotation = -anglePer * activeIndex;
    ringEl.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
  });
}

updateClock();
setInterval(updateClock, 1000);
