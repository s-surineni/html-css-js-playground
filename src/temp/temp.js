function asyncExample() {
    setTimeout(() => {
        console.log("inside set timeout");
    }, 10)
    console.log("outside setttimeout");
    
}