import needle from 'needle'

console.log('before promise')
const prom = new Promise((resolve, reject) => {
  needle.get('https://jsonplaceholder.typicode.com/users/1', (error, resp, body) => {
    if (error) {
      reject(error)
    } else {
      resolve(body)
    }
  })
})
const body = await prom
console.log('body', body)
console.log('after promise')
