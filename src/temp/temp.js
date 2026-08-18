import needle from 'needle';


console.log('ironman before promise');
export const JOKE_URL = 'https://official-joke-api.appspot.com/random_joke';
function getJoke() {
    return new Promise((resolve, reject) => {    needle.get(JOKE_URL, (err, response, body) => {
        if (err) {
            reject(err)
        } else {
            resolve(body)
        }
    })})

}
const prom = getJoke()
prom.then((res)=>{
    console.log(res)
    console.log('after then promise')
})
console.log('afterThen')