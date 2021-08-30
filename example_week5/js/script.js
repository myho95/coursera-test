document.addEventListener("DOMContentLoaded",
function (event){
    document
    .getElementById("myButton")
    .addEventListener("click", function (){
        $ajaxUtils.sendGetRequest("data/name.json", 
            function(res){
                let message = "Hello " + res.firstName + " " + res.lastName + "."
                if (res.isMarried){
                    message += " Do you have children?"
                }
                else{
                    message += " Would you like I introduce a mlem boy for you?"
                }
                document.getElementById("myGreeting").innerHTML = "<h2>" + message + "</h2>";
            });
        }
    );
}
);

