function asyncExample(callback) {
    setTimeout(() => {
        console.log("inside set timeout");
        callback()
    }, 10)


}

function waitForTiemout() {
    console.log("outside setttimeout");
}
asyncExample(waitForTiemout)

function asyncExample2() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("inside set timeout");
            resolve()
        }, 10)
    })

}

function waitForTimeout2() {
    const prom = asyncExample2();
    prom.then(()=> console.log("after set timeout"));
}

waitForTimeout2()