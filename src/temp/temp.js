function asyncSample() {
    setTimeout(() => {
        console.log('inside timeout')
    }, 100);
    console.log('after timeout')
}

asyncSample()