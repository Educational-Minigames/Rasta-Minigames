let air = document.getElementById('air')
let diamond = document.getElementById('diamond')
let oil = document.getElementById('oil')

let firstLayer = document.getElementById('first-layer')
let secLayer = document.getElementById('sec-layer')
let thirdLayer = document.getElementById('third-layer')

let start = document.getElementById('start')

let whatIsFirstLayer = ''
let whatIsSecLayer = ''
let whatIsThirdLayer = ''

var c = firstLayer
var ctx = c.getContext('2d')
ctx.beginPath()

function setFirstLayer() {
  ctx.moveTo(0, 0)
  ctx.lineTo(
    (Math.sin((Math.PI * 40) / 180) * 80) / Math.cos((Math.PI * 40) / 180),
    firstLayer.height,
  )
  ctx.stroke()
}
setFirstLayer()

function drawRuler() {
  var count = c.height

  for (var i = 0; i < count; i += 30) {
    var topPos = i
    y = Math.floor(topPos)
    ctx.moveTo(0, y)
    ctx.lineTo(5, y)
    ctx.stroke()
  }

  count = c.width
  for (var i = 0; i < count; i += 18) {
    var topPos = i
    y = Math.floor(topPos)
    ctx.moveTo(y, 0)
    ctx.lineTo(y, 5)
    ctx.stroke()
  }

  c = secLayer
  ctx = c.getContext('2d')
  ctx.beginPath()
  count = c.height

  for (var i = 0; i < count; i += 30) {
    var topPos = i
    y = Math.floor(topPos)
    ctx.moveTo(0, y)
    ctx.lineTo(5, y)
    ctx.stroke()
  }

  c = thirdLayer
  ctx = c.getContext('2d')
  ctx.beginPath()
  count = c.height

  for (var i = 0; i < count; i += 30) {
    var topPos = i
    y = Math.floor(topPos)
    ctx.moveTo(0, y)
    ctx.lineTo(5, y)
    ctx.stroke()
  }
}

drawRuler()

air.onclick = function () {
  air.style.display = 'none'
  if (
    !firstLayer.classList.contains('its-air') &&
    !firstLayer.classList.contains('its-diamond') &&
    !firstLayer.classList.contains('its-oil')
  ) {
    firstLayer.classList.add('its-air')
    whatIsFirstLayer = 'air'
  } else if (
    !secLayer.classList.contains('its-air') &&
    !secLayer.classList.contains('its-diamond') &&
    !secLayer.classList.contains('its-oil')
  ) {
    secLayer.classList.add('its-air')
    whatIsSecLayer = 'air'
  } else {
    thirdLayer.classList.add('its-air')
    whatIsThirdLayer = 'air'
  }
}

diamond.onclick = function () {
  diamond.style.display = 'none'
  if (
    !firstLayer.classList.contains('its-air') &&
    !firstLayer.classList.contains('its-diamond') &&
    !firstLayer.classList.contains('its-oil')
  ) {
    firstLayer.classList.add('its-diamond')
    whatIsFirstLayer = 'diamond'
  } else if (
    !secLayer.classList.contains('its-air') &&
    !secLayer.classList.contains('its-diamond') &&
    !secLayer.classList.contains('its-oil')
  ) {
    secLayer.classList.add('its-diamond')
    whatIsSecLayer = 'diamond'
  } else {
    thirdLayer.classList.add('its-diamond')
    whatIsThirdLayer = 'diamond'
  }
}

oil.onclick = function () {
  oil.style.display = 'none'
  if (
    !firstLayer.classList.contains('its-air') &&
    !firstLayer.classList.contains('its-diamond') &&
    !firstLayer.classList.contains('its-oil')
  ) {
    firstLayer.classList.add('its-oil')
    whatIsFirstLayer = 'oil'
  } else if (
    !secLayer.classList.contains('its-air') &&
    !secLayer.classList.contains('its-diamond') &&
    !secLayer.classList.contains('its-oil')
  ) {
    secLayer.classList.add('its-oil')
    whatIsSecLayer = 'oil'
  } else {
    thirdLayer.classList.add('its-oil')
    whatIsThirdLayer = 'oil'
  }
}

start.onclick = function () {
  if (
    whatIsFirstLayer == '' ||
    whatIsSecLayer == '' ||
    whatIsThirdLayer == ''
  ) {
    alert('FILL ALL LAYERS !!')
  } else if (start.innerHTML == 'TRY AGAIN') {
    document.location.reload()
  } else {
    start.innerHTML = 'TRY AGAIN'
    let dialog = document.getElementById('result')
    if (
      whatIsFirstLayer == 'air' &&
      whatIsSecLayer == 'diamond' &&
      whatIsThirdLayer == 'oil'
    ) {
      setStroke(1.03, 2.42, 1.47)
      dialog.innerHTML = 'GAME OVER :(('
    } else if (
      whatIsFirstLayer == 'air' &&
      whatIsSecLayer == 'oil' &&
      whatIsThirdLayer == 'diamond'
    ) {
      setStroke(1.03, 1.47, 2.42)
      dialog.innerHTML = 'GAME OVER :(('
    } else if (
      whatIsFirstLayer == 'oil' &&
      whatIsSecLayer == 'air' &&
      whatIsThirdLayer == 'diamond'
    ) {
      setStroke(1.47, 1.03, 2.42)
      dialog.innerHTML = 'YOU WON :))'
      dialog.style.borderColor = 'green'
    } else if (
      whatIsFirstLayer == 'diamond' &&
      whatIsSecLayer == 'air' &&
      whatIsThirdLayer == 'oil'
    ) {
      setStroke(2.42, 1.03, 1.47)
      dialog.innerHTML = 'GAME OVER :(('
    } else if (
      whatIsFirstLayer == 'oil' &&
      whatIsSecLayer == 'diamond' &&
      whatIsThirdLayer == 'air'
    ) {
      setStroke(1.47, 2.42, 1.03)
      dialog.innerHTML = 'YOU WON :))'
      dialog.style.borderColor = 'green'
    } else if (
      whatIsFirstLayer == 'diamond' &&
      whatIsSecLayer == 'oil' &&
      whatIsThirdLayer == 'air'
    ) {
      setStroke(2.42, 1.47, 1.03)
      dialog.innerHTML = 'GAME OVER :(('
    }
    dialog.show()
  }
}

function setStroke(first, sec, third) {
  var ctx = firstLayer.getContext('2d')
  if (first === 2.42) {
    ctx.moveTo(
      (Math.sin((Math.PI * 40) / 180) * 80) / Math.cos((Math.PI * 40) / 180),
      firstLayer.height,
    )
    ctx.lineTo(
      ((Math.sin((Math.PI * 40) / 180) * 80) / Math.cos((Math.PI * 40) / 180)) *
        2,
      0,
    )
  }
  for (var i = 0; i < firstLayer.height; i += 30) {
    ctx.moveTo(
      (Math.sin((Math.PI * 40) / 180) * 80) / Math.cos((Math.PI * 40) / 180),
      i - 3,
    )
    ctx.lineTo(
      (Math.sin((Math.PI * 40) / 180) * 80) / Math.cos((Math.PI * 40) / 180),
      i,
    )
  }
  ctx.stroke()

  var num = (Math.sin((40 * Math.PI) / 180) * first) / sec
  var fromX =
    (Math.sin((Math.PI * 40) / 180) * 80) / Math.cos((Math.PI * 40) / 180)
  var x = num * 80 + fromX

  if (!secLayer.getContext) {
    return
  }
  ctx = secLayer.getContext('2d')

  ctx.beginPath()
  ctx.moveTo(fromX, 0)
  ctx.lineTo(x, secLayer.height)
  if (sec == 2.42) {
    ctx.moveTo(x, secLayer.height)
    ctx.lineTo(x + num * 80, 0)
  }
  for (var i = 0; i < secLayer.height; i += 30) {
    ctx.moveTo(x, i - 3)
    ctx.lineTo(x, i)
  }

  ctx.stroke()

  num = (num * sec) / third
  fromX = x
  x = num * 80 + fromX

  if (!thirdLayer.getContext) {
    return
  }
  ctx = thirdLayer.getContext('2d')

  ctx.beginPath()
  ctx.moveTo(fromX, 0)
  ctx.lineTo(x, thirdLayer.height)
  if (third == 2.42) {
    ctx.moveTo(x, thirdLayer.height)
    ctx.lineTo(x + num * 80, 0)
  }
  for (var i = 0; i < thirdLayer.height; i += 30) {
    ctx.moveTo(x, i - 3)
    ctx.lineTo(x, i)
  }

  ctx.stroke()
}
