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
    ajaxUtils.sendGetRequest = function (requestURL, responseHandler){
        let request = getNewRequestObject()
        request.onreadystatechange = function (){
            handleResponse(request, responseHandler);
        }
        request.open("GET", requestURL, true);
        request.send();
    }

    function handleResponse(request, responseHandler){
        if (request.readyState === 4 && request.status === 200){
            responseHandler(request)
        }
    }
    global.$ajaxUtils = ajaxUtils;
})(window);
