let tops = [];
let bottoms = [];

// initial load -> funct required 
// fetch('./files.json')

let topIndex = 0;
let bottomIndex = 0;

const topContainer = document.querySelector('.top-container');
const bottomContainer = document.querySelector('.bottom-container');

const topColorPicker = document.getElementById('TopcolorPicker');
const bottomColorPicker = document.getElementById('BottomcolorPicker');

function fetchAndInsertSVG(path, container, color) {
  fetch(path)
    // 1 handle response -> read the svg 
    .then(res => res.text())

    // 2 process the data -> insert svg into desired container 
    .then(svgText => {
      container.innerHTML = svgText;

      const svg = container.querySelector('svg');

      const fillables = svg.querySelectorAll('path, g');

      fillables.forEach(el => {
        el.removeAttribute('style');
        el.setAttribute('fill', color);

        // force override
        if (el.getAttribute('fill') === 'none') {
          el.setAttribute('fill', color);
        }
      });
    });
}

function updateTop() {
  fetchAndInsertSVG(tops[topIndex], topContainer, topColorPicker.value);
}

function updateBottom() {
  fetchAndInsertSVG(bottoms[bottomIndex], bottomContainer, bottomColorPicker.value);
}

const buttons = document.querySelectorAll('button');

// circular queue 
buttons[0].onclick = () => {
  topIndex = (topIndex - 1 + tops.length) % tops.length;
  updateTop();
};
buttons[1].onclick = () => {
  topIndex = (topIndex + 1) % tops.length;
  updateTop();
};
buttons[2].onclick = () => {
  bottomIndex = (bottomIndex - 1 + bottoms.length) % bottoms.length;
  updateBottom();
};
buttons[3].onclick = () => {
  bottomIndex = (bottomIndex + 1) % bottoms.length;
  updateBottom();
};

topColorPicker.addEventListener('input', () => updateTop());
bottomColorPicker.addEventListener('input', () => updateBottom());

fetch('./files.json')
  .then(res => {return res.json()})
  .then(data => {
    console.log("loaded!");
    tops = data.tops;
    bottoms = data.bottoms;

    // INITIAL LOAD want these specific heh
    topIndex = tops.length - 9;
    bottomIndex = bottoms.length - 1;
    updateTop();
    updateBottom();
  })
  .catch(error => {console.error(error)})

