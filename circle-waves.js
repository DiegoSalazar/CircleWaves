play = true;
numCircles = 500;
startTime = undefined;
speed = 3;
offset = 21;
separation = 20;

$(function() {
  var $pool = $('#pool'),
      origCircle = $pool.find('.circle'),
      startBtn = $('button#start'),
      numCirclesInput = $('#numCircles'),

      speedSlider = $('#speedSlider'),
      offsetSlider = $('#offsetSlider'),
      separationSlider = $('#separationSlider'),

      speedDisplay = $('#speedDisplay'),
      offsetDisplay = $('#offsetDisplay'),
      separationDisplay = $('#separationDisplay');

  numCircles = numCirclesInput.val();

  speedSlider.slider({ value: speed });
  offsetSlider.slider({ value: offset });
  separationSlider.slider({ value: separation });

  speedDisplay.text(speed);
  offsetDisplay.text(offset);
  separationDisplay.text(separation);

  startBtn.click(function() {
    var btn = $(this);

    if (this.innerText == 'Stop') {
      btn.removeClass('btn-danger').addClass('btn-success');
      this.innerText = 'Start';
      play = false;
    } else {
      btn.removeClass('btn-success').addClass('btn-danger');
      this.innerText = 'Stop';
      play = true;
    }
  });

  $('.slider').on('slide', function() {
    switch (this.id) {
      case 'speedSlider':
        speed = $(this).slider('value');
        speedDisplay.text(speed);
      break;
      case 'offsetSlider':
        offset = $(this).slider('value');
        offsetDisplay.text(offset);
      break;
      case 'separationSlider':
        separation = $(this).slider('value');
        separationDisplay.text(separation);
        $('.circle').css({
          'margin-top': '-'+ separation +'px',
          'margin-left': '-'+ separation +'px'
        })
      break;
    }
  });

  numCirclesInput.on('keyup', function() {
    numCircles = parseInt(this.value);
    $pool.empty();
    makePool($pool, origCircle);
  });

  makePool($pool, origCircle);
  animatePool($pool, 0);
});

function bindEvents(startBtn, slide) {
  // body...
}

function makePool(pool, circle) {
  for (var i = 0; i < numCircles; i++) {
    pool.append(circle.clone());
  }
}

function animatePool(pool, curTime) {
  animate(pool, curTime);

  requestAnimationFrame(function(time){
    animatePool(pool, time);
  });
}

function animate(pool, curTime) {
  if (!play) return;
  if (curTime === undefined) { curTime = Date.now(); }
  if (startTime === undefined) { startTime = curTime; }

  var degree = (curTime - startTime) / speed % 360;

  pool.children().each(function(i, circle) {
    $(circle).css('transform', 'rotate('+ (i * offset + degree) +'deg)')
  });
}
