(function(window){
    let hello = {}
    let greeting = "Hello "
    hello.greeting = function (name){
        console.log(greeting + name)
    }
    window.hello = hello
})(window);
(function(window){
    let goodBye = {}
    let greeting = "Good Bye "
    goodBye.greeting = function (name){
        console.log(greeting + name)
    }
    window.goodBye = goodBye
})(window);

