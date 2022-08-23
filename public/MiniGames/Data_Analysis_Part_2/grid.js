const submitButton = document.getElementById('submit_button')

var csvFile, csvFileName
const show_options = document.getElementById('show_options')
const options_container = document.getElementById('options_container')
const charts_container = document.getElementById('chart_container')
let data = null
let id = 0

// on submit button click
submitButton.addEventListener('click', function (e) {
  e.preventDefault()
  console.log('submit button clicked')
  csvFileName = document.getElementById('csvFileName').value
  d3.csv(`${csvFileName}.csv`, function (error, data) {
    csvFile = data;
  });
}
)



show_options.addEventListener('click', function () {
  if (csvFile.value !== null) {
    options_container.style.opacity = '1'
    removeAllChildNodes(charts_container)
    removeAllChildNodes(options_container)
    data = csvFile
    // console.log(data)
    const keys = Object.keys(data[0])
    for (op_key of keys) {
      let btn = document.createElement('button')
      btn.classList.add('column')
      btn.innerHTML = op_key
      btn.addEventListener('click', function () {
        if (isNaN(data[0][this.innerHTML])) {
          createCanvas(this.innerHTML)
        } else {
          createDive(this.innerHTML)
        }
        id++
      })
      options_container.appendChild(btn)
    }

  } else {
    alert('Please Choose a File !!')
  }
})

function createCanvas(text) {
  let canvas = document.createElement('canvas')
  canvas.id = 'my_chart' + id
  canvas.classList.add('chart')
  charts_container.appendChild(canvas)
  displayChart(text)
}

function createDive(text) {
  let div = document.createElement('div')
  div.id = 'my_chart' + id
  div.classList.add('chart')
  charts_container.appendChild(div)
  displayNumberChart(text)
}

function displayNumberChart(option_name) {
  let xVal = []
  for (dt of data) {
    xVal.push(dt[option_name])
  }

  var trace = {
    x: xVal,
    type: 'histogram',
  }

  let my_data = [trace]
  Plotly.newPlot('my_chart' + id, my_data)
}

function displayChart(option_name) {
  let xVal = []
  let yVal = []
  for (dt of data) {
    if (xVal.includes(dt[option_name])) {
      yVal[xVal.indexOf(dt[option_name])]++
    } else {
      xVal.push(dt[option_name])
      yVal.push(1)
    }
  }
  drawHistogram(option_name, xVal, yVal)
}

function drawHistogram(option_name, xVal, yVal) {
  let column_color = []
  for (let i = 0; i < xVal.length; i++) {
    column_color.push(i % 2 === 0 ? 'blue' : 'red')
  }
  new Chart('my_chart' + id, {
    type: 'bar',
    data: {
      labels: xVal,
      datasets: [
        {
          backgroundColor: getRandomColor(),
          data: yVal,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: option_name,
      },
      scales: {
        xAxes: [
          {
            offset: false,
            grid: {
              offset: false,
            },
            title: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            offset: false,
            grid: {
              offset: false,
            },
            title: {
              display: true,
            },
          },
        ],
      },
    },
  })
}

function csvToArray(str, delimiter = ',') {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const headers = str.slice(0, str.indexOf('\n')).split(delimiter)

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf('\n') + 1).split('\n')

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    const values = row.split(delimiter)
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index]
      return object
    }, {})
    return el
  })

  // return the array
  return arr
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}
