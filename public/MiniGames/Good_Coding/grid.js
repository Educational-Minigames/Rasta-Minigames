let A_input = document.getElementById('a_value')
let B_input = document.getElementById('b_value')
let C_input = document.getElementById('c_value')
let D_input = document.getElementById('d_value')
let E_input = document.getElementById('e_value')
let F_input = document.getElementById('f_value')
let run = document.getElementById('run')
let state_two = document.getElementById('state_2')
let state_2_current_code = document.getElementById('state_2_current_code')
let state_2_char_completed = document.getElementById('state_2_char_completed')
let state_2_char_completed_input = document.getElementById(
  'state_2_char_completed_input',
)
let state_2_new_code = document.getElementById('state_2_new_code')
let state_2_char_not_completed = document.getElementById(
  'state_2_char_not_completed',
)
let all_values = []
let decoded_main_value = ''
let state_2_current_code_index = 0
let is_prefix = {
  isPrefix: false,
  val: null,
}

run.addEventListener('click', function () {
  all_values = []
  all_values.push(new Value('A', A_input.value))
  all_values.push(new Value('B', B_input.value))
  all_values.push(new Value('C', C_input.value))
  all_values.push(new Value('D', D_input.value))
  all_values.push(new Value('E', E_input.value))
  all_values.push(new Value('F', F_input.value))
  if (!validation()) {
    alert('Enter proper values !!')
    return
  } else {
    let flag = false
    for (val of all_values) {
      for (other of all_values) {
        if (other.value !== val.value && other.code.startsWith(val.code)) {
          let entry = 'ABCDEF'
          entry = entry.replace(other.value, '')
          let x = makeID(entry, 5)
          x += other.value
          decode_main_value(x)
          goToStateTwo()
          is_prefix['isPrefix'] = true
          is_prefix['val'] = val.code
          flag = true
          break
        }
      }
      if (flag) break
    }
    if (!flag) {
      let x = makeID('ABCDEF', 6)
      decode_main_value(x)
      goToStateTwo()
      is_prefix['isPrefix'] = false
      is_prefix['val'] = null
    }
  }
})

state_2_char_completed.addEventListener('click', function () {
  let tempCode = decoded_main_value.substring(0, state_2_current_code_index + 1)
  let tempChar = state_2_char_completed_input.value
  state_2_char_completed_input.value = ''
  switch (tempChar) {
    case 'A':
      setAnswerForState_2(0, tempCode)
      break
    case 'B':
      setAnswerForState_2(1, tempCode)
      break
    case 'C':
      setAnswerForState_2(2, tempCode)
      break
    case 'D':
      setAnswerForState_2(3, tempCode)
      break
    case 'E':
      setAnswerForState_2(4, tempCode)
      break
    case 'F':
      setAnswerForState_2(5, tempCode)
      break
    default:
      alert('Wrong Answer !!!')
  }
  if (decoded_main_value.length === 0) {
    endOfGame(true)
  }
})

state_2_char_not_completed.addEventListener('click', function () {
  state_2_current_code_index++
  if (state_2_current_code_index === decoded_main_value.length) {
    state_2_char_not_completed.disabled = true
  } else {
    state_2_current_code.innerHTML +=
      decoded_main_value[state_2_current_code_index]
  }
})

function endOfGame(flag) {
  if (flag) alert('Good Job :)))')
  else alert('Game Over :(((')
  state_2_char_completed.disabled = true
  state_2_char_not_completed.disabled = true
  state_2_char_completed_input.disabled = true
}

function setAnswerForState_2(index, tempCode) {
  if (is_prefix['isPrefix'] && tempCode.startsWith(is_prefix['val'])) {
    endOfGame(false)
  } else {
    if (tempCode === all_values[index].code) {
      decoded_main_value = decoded_main_value.slice(
        state_2_current_code_index + 1,
      )
      state_2_current_code_index = -1
      state_2_new_code.innerHTML += all_values[index].value
      state_2_current_code.innerHTML += '  '
    } else {
      alert('Wrong Answer !!!')
    }
  }
}

function goToStateTwo() {
  state_2_char_completed.disabled = false
  state_2_char_not_completed.disabled = false
  state_2_char_completed_input.disabled = false
  state_two.style.display = 'block'
  state_2_new_code.innerHTML = ''
  state_2_current_code_index = 0
  state_2_current_code.innerHTML =
    decoded_main_value[state_2_current_code_index]
}

function decode_main_value(main_value) {
  decoded_main_value = ''
  for (x of main_value) {
    switch (x) {
      case 'A':
        decoded_main_value += all_values[0].code
        break
      case 'B':
        decoded_main_value += all_values[1].code
        break
      case 'C':
        decoded_main_value += all_values[2].code
        break
      case 'D':
        decoded_main_value += all_values[3].code
        break
      case 'E':
        decoded_main_value += all_values[4].code
        break
      case 'F':
        decoded_main_value += all_values[5].code
        break
    }
  }
}

function validation() {
  for (val of all_values) {
    if (!check(val.code)) {
      alert('Enter proper values !!')
      return false
    }
  }
  return true
}

function checkForPrefix() {
  for (val of all_values) {
    for (other of all_values) {
      if (other.value !== val.value && other.code.startsWith(val.code)) {
        return false
      }
    }
  }
  return true
}

function check(input) {
  if (input === '' || typeof input == 'undefined') return false
  for (x of input) {
    if (x !== '1' && x !== '0') {
      return false
    }
  }
  return true
}

function makeID(entries, len) {
  var result = ''
  var characters = entries
  var charactersLength = characters.length
  for (var i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

class Value {
  constructor(value, code) {
    this.value = value
    this.code = code
  }
}
