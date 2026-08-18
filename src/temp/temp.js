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

async function getJoke() {
    return new Promise((resolve, reject) => {    needle.get(JOKE_URL, (err, response, body) => {
        if (err) {
            reject(err)
        } else {
            resolve(body)
        }
    })}

}
try {
    const res = await getJoke()
    console.log(res)
    console.log('after await')
} catch (err) {
    console.error('joke failed:', err.message)
}
console.log('afterAwait')
