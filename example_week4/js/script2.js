(function(){
    let names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];
    for (var i = 0; i < names.length; i++){
        if (names[i].charAt(0).toLowerCase() === "j"){
            hello.greeting(names[i])
        }
        else{
            goodBye.greeting(names[i])
        }
    }
})();