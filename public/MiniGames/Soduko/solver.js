// const my_table = [
//   [3, 1, 2, 4],
//   [4, 2, 1, 3],
//   [1, 4, 3, 2],
//   [2, 3, 4, 1],
// ]

var my_table =  [
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
  ]
function choice(arr, cursed) {
  let len = arr.length
  if(len == cursed.length){
    return -1;
  }
  while(true){
    let index = Math.floor(Math.random() * len);
    if(arr[index] != cursed){
      return arr[index];
    }
  }

}
function generate_soduko(i, j){
  if(i == 4){
    return true;
  }
  let cursed = [];
  get_domains(my_table);
  let hashmap = my_hashmap;
  let domains = my_domains;
  let domain_index = hashmap[i.toString() + ',' + j.toString()];
  let domain = domains[domain_index];
  
  while(true){
    console.log("hiiiiiiiiiiii")
    
    
    let value = choice(domain, cursed)
    if(value == -1){
      return false;
    }
    let ans = false;
    my_table[i][j] = value;
    if(j == 3){
      ans = generate_soduko(i + 1, 0);
    } else {
      ans = generate_soduko(i, j + 1);
    
    }
    if(ans == true) {
      return true;
    } else {
      cursed.push(value)
    }

  }

  
  
}

generate_soduko(0, 0)



var my_table_copy;
// deep copy of table
function copy_table(table) {
  my_table_copy = [];
  for (let i = 0; i < table.length; i++) {
    my_table_copy[i] = [];
    for (let j = 0; j < table[i].length; j++) {
      my_table_copy[i][j] = table[i][j];
    }
  }
}

copy_table(my_table);

var table_intro = document.getElementsByClassName('table_intro')
var my_domains = null
var my_hashmap = null
const guessedTable = []
for (let i = 0; i < 4; i++) {
  guessedTable.push([[],[],[],[]])
}
const cell_clicked = []
for(let i=0;i<4;i++){
  cell_clicked.push([false,false,false,false])
}

setTable()

for (let i = 0; i < 16; i++) {
  table_intro[i].addEventListener('click', function () {
    let index_y = i % 4
    let index_x = Math.floor(i / 4)
    if(cell_clicked[index_x][index_y] == false){
      cell_clicked[index_x][index_y] = true
      // font size decrease
      table_intro[i].firstChild.style.fontSize = '10px'
      // table_intro[i]=guessedTable[index_x][index_y]
    }
    else{
      cell_clicked[index_x][index_y] = false
      my_table[index_x][index_y] = my_table_copy[index_x][index_y]
      table_intro[i].firstChild.style.fontSize = '20px'
    }
    for(let i=0;i<16;i++){
      let index_y = i % 4
      let index_x = Math.floor(i / 4)
      if(cell_clicked[index_x][index_y] == true){
      my_table[index_x][index_y] = -1
      get_domains(my_table)
      let index = my_hashmap[`${index_x},${index_y}`]
      my_table[index_x][index_y] = my_domains[index];
      }      
    }

    // console.log(index_x, index_y)
    // console.log(my_table)
    // get_domains(my_table)
  
    // console.log(my_hashmap)
    // console.log(my_domains)
    // let index = my_hashmap[`${index_x},${index_y}`]
    // if(my_table[index_x][index_y] === -1){
    //   my_table[index_x][index_y] = my_domains[index];
    // }
    // console.log(index)
    // console.log(my_domains[index])

    // console.log(my_table)
    setTable()

  })
}

function setTable() {
  let index = 0
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      table_intro[index].firstChild.innerHTML = my_table[i][j]
      index++
    }
  }
}

function remove(array, obj) {
  let index = array.indexOf(obj)
  if (index > -1) {
    array.splice(index, 1)
  }
}

function get_values_in_square(board, row, col) {
  row = Math.floor(row / 2) * 2
  col = Math.floor(col / 2) * 2

  let values = []
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      values.push(board[row + i][col + j])
    }
  }
  // remove duplicate items
  values = values.filter(function (item, pos) {
    return values.indexOf(item) == pos
  })
  return values
}

function get_domains(table) {
  let empty_cells = []
  let n = table.length
  let hashmap = {}

  let index = 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (table[i][j] == -1) {
        empty_cells.push([i, j])
        hashmap[i.toString() + ',' + j.toString()] = index
        index++
      }
    }
  }

  let domains = []

  for (
    let domain_index = 0;
    domain_index < empty_cells.length;
    domain_index++
  ) {
    let domain = []

    let x = empty_cells[domain_index][0]
    let y = empty_cells[domain_index][1]

    for (let value = 1; value <= n; value++) {
      domain.push(value)
    }

    for (let j = 0; j < n; j++) {
      remove(domain, table[x][j])
    }
    for (let i = 0; i < n; i++) {
      remove(domain, table[i][y])
    }

    let square_values = get_values_in_square(table, x, y)

    for (let i = 0; i < square_values.length; i++) {
      remove(domain, square_values[i])
    }

    domains.push(domain)
  }

  // iter key in hashmap
  // for (let key in hashmap) {
  //   let x = parseInt(key.split(',')[0])
  //   let y = parseInt(key.split(',')[1])

  //   let count = []
  //   for (let i = 0; i < domains[hashmap[key]].length; i++) {
  //     count.push(0)
  //   }

  //   for (let i = 0; i < n; i++) {
  //     if (table[i][y] == -1) {
  //       let key2 = i.toString() + ',' + y.toString()
  //       let domain2 = domains[hashmap[key2]]
  //       for (let j = 0; j < domain2.length; j++) {
  //         let index = domains[hashmap[key]].indexOf(domain2[j])

  //         if (index > -1) {
  //           count[index] += 1
  //         }
  //       }
  //     }
  //   }

  //   for (let j = 0; j < n; j++) {
  //     if (table[x][j] == -1) {
  //       let key2 = x.toString() + ',' + j.toString()
  //       let domain2 = domains[hashmap[key2]]
  //       for (let j = 0; j < domain2.length; j++) {
  //         let index = domains[hashmap[key]].indexOf(domain2[j])

  //         if (index > -1) {
  //           count[index] += 1
  //         }
  //       }
  //     }
  //   }
  //   let new_domain = []
  //   for (let ind = 0; ind < count.length; ind++) {
  //     if (count[ind] == 0) {
  //       new_domain.push(domains[hashmap[key]][ind])
  //     }
  //   }
  //   if (new_domain.length != 0) {
  //     domains[hashmap[key]] = new_domain
  //   }
  // }

  my_hashmap = hashmap
  my_domains = domains
  return hashmap, domains
}
