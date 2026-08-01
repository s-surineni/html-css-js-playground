function asyncExample() {
    setTimeout(() => {
        console.log("inside set timeout");
        waitForTiemout()
    }, 10)
    function waitForTiemout()  {
    console.log("outside setttimeout");
    }
    
}
asyncExample()