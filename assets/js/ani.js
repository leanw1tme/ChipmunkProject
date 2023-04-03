// Создаем контроллер ScrollMagic
var controller = new ScrollMagic.Controller();

// Определяем массив из 9 элементов
var circles = document.querySelectorAll('.circlez');

var cards = document.querySelectorAll('.card');

var colorsExamples = anime.timeline({
  endDelay: 1000,
  easing: 'easeInOutQuad',
  direction: 'alternate',
  loop: true
});

// Массив цветов для каждого элемента
var colors = ['#FF0000', '#808080', '#FFD700', '#008B8B', '#00FF7F', '#7B68EE', '#1E90FF', '#EE82EE', '#DAA520'];
var values = ['2', '1', '9', '8', '7', '6', '5', '4', '3'];

circles.forEach(function(circlez, index) {
  circlez.style.backgroundColor = 'transparent';
  circlez.style.boxShadow = '0 0 20px ' + colors[index];
  circlez.style.transition = 'box-shadow 0.3s';

  // Добавляем обработчики событий для эффекта свечения
circlez.addEventListener('mouseenter', function() {
  circlez.style.boxShadow = '0 0 40px ' + colors[index];
  var cards = document.querySelector('#card' + (index + 1));
  cards.classList.add('show');
  cards.style.zIndex = '1';
    var color = this.style.backgroundColor;
  document.querySelector('#circle').style.stroke = color;
});

circlez.addEventListener('mouseleave', function() {
  circlez.style.boxShadow = '0 0 20px ' + colors[index];
  var cards = document.querySelector('#card' + (index + 1));
  timeoutId = setTimeout(function() {
    cards.classList.remove('show');
    cards.style.zIndex = '-1';
    document.querySelector('#circle').style.stroke = '#eee';
  }); // устанавливаем задержку на 500 мс (можно изменить значение)
});

  // Вычисляем угол поворота для текущего элемента
  var angle = (index * 40) + 10;

  // Задаем начальные значения для анимации
  anime.set(circlez, {
    rotate: angle + 'deg',
    opacity: 0,
    translateX: '100px',
    rotate: '-' + angle + 'deg',
    backgroundColor: colors[index],
    innerHTML: '<div class="text-container"><div class="value">' + values[index] + '</div></div>'
  });

  // Добавляем стили для центрирования текста внутри круга
  var textContainer = circlez.querySelector('.text-container');
  textContainer.style.display = 'flex';
  textContainer.style.alignItems = 'center';
  textContainer.style.justifyContent = 'center';
  textContainer.style.width = '100%';
  textContainer.style.height = '100%';
  textContainer.style.transform = 'rotate(' + angle + 'deg)';

  // Создаем анимацию для текущего элемента
  var animation = anime({
    targets: circlez,
    opacity: [0, 0.8, 1],
    borderRadius: ['25%', '50%'],
    rotate: angle + 360 + 'deg',
    translateX: '200px',
    rotate: '-' + (angle + 360) + 'deg',
    duration: 1000,
    easing: 'easeOutQuad',
    loop: false, 
  border: '5px solid ' + colors[index],
  borderColor: [
    { value: colors[index] },
    { value: '#ffffff' },
    { value: colors[index] }
  ],
  });

  // Создаем сцену ScrollMagic для текущего элемента
  var scene = new ScrollMagic.Scene({
    triggerElement: '..header1.sticked',
    triggerHook: 'onLeave',
    duration: '100%'
  })
  .addTo(controller);

  // Запускаем анимацию при прокручивании вниз
  scene.on('progress', function(event) {
    animation.seek(animation.duration * event.progress);
  });

  // Возвращаем элемент в исходное положение при прокрутке страницы вверх
  scene.on('leave', function(event) {
    animation.seek(animation.duration * (1 - event.progress));
  });
});
