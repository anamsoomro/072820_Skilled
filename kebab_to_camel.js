/*
  Given that you have an already valid JSON string where the keys are
  all kebab-case, write a function called transformKebabCaseToCamelCase 
  that takes in this JSON string and returns a JSON string where all
  the keys are transformed to be camelCase.

  Turn a JSON string to an object
    JSON.parse(data: string): object

  Turn an object to a JSON string
    JSON.stringify(data: object): string

  Get the keys of an object into an array
    Object.keys(data: object): Array(string)
  
  Iterate through each key of an object.
    for (const property in object) {
      console.log(`${property}: ${object[property]}`);
    }
*/

const exampleJson = `{
  "first-name": "Jeff",
  "last-name": "Green",
  "address": {
    "city-and-state": "Boston, MA",
    "zip": "12345-1234"
  },
  "pets": [
    [],
    12345,
    "jeff",
    {
      "name": "Bruno",
      "pet-gender": "male"
    },
    {
      "name": "Lana",
      "pet-gender": "female"
    }
  ]
}`;

const exampleJsonCollection = `[{
  "first-name": "Jeff",
  "last-name": "Green",
  "address": {
    "city-and-state": "Boston, MA",
    "zip": "12345-1234"
  },
  "pets": [
    [],
    12345,
    "jeff",
    {
      "name": "Bruno",
      "pet-gender": "male"
    },
    {
      "name": "Lana",
      "pet-gender": "female"
    }
  ]
}]`;

// JSON: {} or JSON: [ {}, {} ]

function transformKebabCaseToCamelCase(data) {
  // Example is that if I was passed '{"first-name": "Fred"}', the result
  // should be '{"firstName": "Fred"}'

  let dataWorking = JSON.parse(data)
  conversion(dataWorking)
  return data
}

function conversion(data){
  if (typeof data === 'number' || typeof data === 'string' || typeof data === 'boolean') { // its a primitive value, return
    return data
  } if (Array.isArray(data)) { // its an array, go deeper
    data.map(elem => conversion(elem))
  } else { // its a hash, convert, go deeper if needed
    let convertedObj = {}
    let keys = Object.keys(data)
    for(let i = 0; i < keys.length; i++){ // iterate through all the keys
      let oldKey = keys[i]
      let key = keys[i] 
      for(let j = 0; j < key.length; j++){ // iterate through each character of the key
        if(key[j] === "-"){
          let remaining = key.slice(j+1, key.length)
          remaining = remaining[0].toUpperCase() + remaining.slice(1, remaining.length)
          let previous  = key.slice(0, j)
          key = previous + remaining
        }
      }
      // console.log(data[oldKey]) 
      convertedObj[key] = conversion(data[oldKey])
    }
    console.log (convertedObj)
  }
  return data
}


// const result = transformKebabCaseToCamelCase(exampleJson);
const result = transformKebabCaseToCamelCase(exampleJsonCollection);
// console.log(result);
document.getElementById("app").innerHTML = result;
