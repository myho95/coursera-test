(function(global){
    var ajaxUtils = {};
    function getNewRequestObject(){
        if (global.XMLHttpRequest){
            return (new XMLHttpRequest());
        }
        else if (global.ActiveXObject){
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        }
        else {
            return (global.alert("Ajax is not supported!"));
        }
    }
    ajaxUtils.sendGetRequest = function (requestURL, responseHandler, isJsonResponse){
        let request = getNewRequestObject()
        request.onreadystatechange = function (){
            handleResponse(request, responseHandler, isJsonResponse);
        }
        request.open("GET", requestURL, true);
        request.send();
    }

    function handleResponse(request, responseHandler, isJsonResponse){
        if (request.readyState === 4 && request.status === 200){
            // Default isJsonResponse is true
            if (isJsonResponse == undefined){
                isJsonResponse = true;
            }
            if (isJsonResponse){
                responseHandler(JSON.parse(request.responseText))
            }
            else {
                responseHandler(request.responseText)
            }
        }
    }
    global.$ajaxUtils = ajaxUtils;
})(window);
