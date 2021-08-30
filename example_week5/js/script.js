document.addEventListener("DOMContentLoaded",
function (){
    document
    .getElementById("myButton")
    .addEventListener("click", function (){
        $ajaxUtils.sendGetRequest("data/mytext.txt", 
            function(request){
                let name = request.responseText
                document.getElementById("myGreeting").innerHTML = name;
            });
        }
    );
}
);

