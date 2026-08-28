import needle from 'needle';

console.log('before promise')
new Promise((resolve, reject) => {
    needle.get('https://jsonplaceholder.typicode.com/users/1', (error, resp, body) => {
        console.log('error', error)
        // console.log('resp', resp)
        console.log('body', body)
        console.log('after request')
    });
})

console.log('after promise')
