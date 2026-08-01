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
    
    setTimeout(() => {
        console.log("inside set timeout");
    }, 10)
}

function waitForTimeout2() {
}