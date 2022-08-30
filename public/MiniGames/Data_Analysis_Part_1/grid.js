const myForm = document.getElementById('myForm')
const show_options = document.getElementById('show_options')
var csvFileName;
var csvFile;
const options_container = document.getElementById('options_container')
const charts_container = document.getElementById('chart_container')
let data = null
let id = 0
let count = 0
let selected_options = []

// on form submit
myForm.addEventListener('submit',  function (e) {
  e.preventDefault()
  csvFileName = document.getElementById('csvFileName').value
  d3.csv(`${csvFileName}.csv`, function (error, data) {
    csvFile = data;
    console.log(data);
  });

});


show_options.addEventListener('click', function () {
  if (csvFile !== null) {
    options_container.style.opacity = '1'
    removeAllChildNodes(charts_container)
    removeAllChildNodes(options_container)
    count = 0
    selected_options = []
    data = csvFile
    console.log(data)
    const keys = Object.keys(data[0])
    for (op_key of keys) {
      if (!isNaN(data[0][op_key])) {
        let btn = document.createElement('button')
        btn.classList.add('column')
        btn.innerHTML = op_key
        btn.addEventListener('click', function () {
          count++
          selected_options.push(this.innerHTML)
          if (count === 2) {
            createDive()
            displayNumberChart()
            id++
            count = 0
            selected_options = []
          }
        })
        options_container.appendChild(btn)
      }
    }


  }
})

function createDive() {
  let div = document.createElement('div')
  div.id = 'my_chart' + id
  div.classList.add('chart')
  charts_container.appendChild(div)
}

function displayNumberChart() {
  let values = []
  for (let i = 0; i < data.length; i++) {
    values.push(
      new Value(data[i][selected_options[0]], data[i][selected_options[1]]),
    )
  }

  values.sort((a, b) => a.x_val - b.x_val)
  let xVal = []
  let yVal = []
  for (v of values) {
    xVal.push(v.x_val)
    yVal.push(v.y_val)
  }

  let trace1 = {
    x: xVal,
    y: yVal,
    mode: 'markers',
    marker: {
      color: getRandomColor(),
      line: {
        color: getRandomColor(),
        width: 1,
      },
    },
  }

  let my_data = [trace1]

  let layout = {
    title: selected_options[0] + ' _ ' + selected_options[1],
  }

  Plotly.newPlot('my_chart' + id, my_data, layout)
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

class Value {
  constructor(x_val, y_val) {
    this.x_val = x_val
    this.y_val = y_val
  }
}
