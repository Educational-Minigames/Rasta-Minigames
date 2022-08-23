let aVal = document.getElementById('a_value')
let bVal = document.getElementById('b_value')
let cVal = document.getElementById('c_value')
let dVal = document.getElementById('d_value')
let aVal_possible = document.getElementById('a_value_possibility')
let bVal_possible = document.getElementById('b_value_possibility')
let cVal_possible = document.getElementById('c_value_possibility')
let dVal_possible = document.getElementById('d_value_possibility')
let inputVal = document.getElementById('input_value')
let show = document.getElementById('show')
let answers = document.getElementById('answers')
let set_equal = document.getElementById('set_equal')
let A_value = null
let B_value = null
let C_value = null
let D_value = null

show.addEventListener('click', function (e) {
  e.preventDefault()
  if (
    aVal.value === '' ||
    bVal.value === '' ||
    cVal.value === '' ||
    dVal.value === '' ||
    inputVal.value === '' ||
    aVal_possible.value === '' ||
    bVal_possible.value === '' ||
    cVal_possible.value === '' ||
    dVal_possible.value === ''
  ) {
    alert('Fill all boxes !!')
    return
  }
  A_value = new Value('A', aVal.value, aVal_possible.value)
  B_value = new Value('B', bVal.value, bVal_possible.value)
  C_value = new Value('C', cVal.value, cVal_possible.value)
  D_value = new Value('D', dVal.value, dVal_possible.value)
  let input = inputVal.value

  if (
    set_equal.checked &&
    ![B_value.code.length, C_value.code.length, D_value.code.length].every(
      (value) => {
        return value === A_value.code.length
      },
    )
  ) {
    alert('Enter values with equal length !!')
  } else {
    answers.style.display = 'block'
    answers.innerHTML = ''
    decode(input)
    if (answers.innerHTML === '') {
      answers.innerHTML = 'No Answers !!'
    }
  }
})

function decode(input) {
  if (isNaN(input[0])) {
    setAnswer(input)
    return
  }

  if (input.startsWith(A_value.code)) {
    let new_input = input.substring(A_value.code.length)
    new_input += A_value.val
    decode(new_input)
  }

  if (input.startsWith(B_value.code)) {
    let new_input = input.substring(B_value.code.length)
    new_input += B_value.val
    decode(new_input)
  }

  if (input.startsWith(C_value.code)) {
    let new_input = input.substring(C_value.code.length)
    new_input += C_value.val
    decode(new_input)
  }

  if (input.startsWith(D_value.code)) {
    let new_input = input.substring(D_value.code.length)
    new_input += D_value.val
    decode(new_input)
  }
}

class Value {
  constructor(val, code, possibility) {
    this.val = val
    this.code = code
    this.possibility = possibility
  }
}

function setAnswer(input) {
  console.log(input)
  let possibility =
    countChar(input, 'A') * A_value.possibility * A_value.code.length +
    countChar(input, 'B') * B_value.possibility * B_value.code.length +
    countChar(input, 'C') * C_value.possibility * C_value.code.length +
    countChar(input, 'D') * D_value.possibility * D_value.code.length
  possibility = possibility.toFixed(2)

  let div = document.createElement('div')
  let paragraph = document.createElement('p')
  paragraph.innerHTML += `Decoded Strings  :   ${input} <br/>
  Average Weighted  :  ${possibility > 1 ? 'ERROR !!!' : possibility}<br/><br/>`

  div.appendChild(paragraph)
  answers.appendChild(div)
}

function countChar(my_input, my_char) {
  let len = 0
  for (ch of my_input) {
    if (ch === my_char) len++
  }
  return len
}
