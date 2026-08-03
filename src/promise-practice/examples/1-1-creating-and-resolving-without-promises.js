import { resolveSoon, resolveSoonWithPromise } from './1-1-needle-utils.js';

resolveSoon(() => {
  console.log('after request in the callback')
})
console.log('outside async call')

const promise = resolveSoonWithPromise()
promise.then((result) => {
  console.log('inside then')
  console.log(result)
})
console.log('after then')