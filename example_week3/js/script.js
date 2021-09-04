$(function(){
    $("#header-button").click(
        function(event){
            $(event.target).focus();
        });
    $("#header-button").blur(
        function(){ 
            let screenwidth = window.innerWidth;
            if (screenwidth < 768){
                $("#navbarNav").collapse('hide')
            }
        });
});

(function(global){
    let dc = {}

    const homeHtml = "snippets/home_snippet.html"
    const allCatagoriesUrl ="files/menu-catagories.json"
    const menuTitle = "snippets/menu-title-snippet.html"
    const menuContent = "snippets/menu-snippet.html"
    const insertedSiteInMainPage = "#main-content"
    const dogList = "files/dog-list.json"
    const myDogHtml = "snippets/my-dogs-snippet.html"

    // Convenience function for inserting innerHTML for 'select'
    let insertHtml = function (selector, html){
        const targetElem = document.querySelector(selector)
        targetElem.innerHTML = html;
    }

    // Show loading icon inside element identified by 'selector'.
    let showLoading = function(selector){
        let html = "<div class='text-center'>"
        html += "<img src='images/loading_gif.gif' width=250 height=250></div>"
        insertHtml(selector,html)
    }
    
    // set a global variable for randoming a index of dog lists for My dog Page
    let randomIndex;
        

    // On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function(event){
        // On first load, show home view
        showLoading(insertedSiteInMainPage);
        $ajaxUtils.sendGetRequest(homeHtml,function(responseText){
            // Change {{randomDogName}} into the particular dog name
            $ajaxUtils.sendGetRequest(dogList, function (dogList){
                randomIndex = Math.floor(Math.random()*dogList.length)
                responseText = insertProperty(responseText, "randomDogName", dogList[randomIndex].dog_name)

                // Load the home page view
                document.querySelector(insertedSiteInMainPage).innerHTML = responseText;  
            }
            ,true)
        }, false)

    });
    
    

    // Return substitute of "propName" with propValue in given string
    let insertProperty = function(string, propName, propValue){
        let propToReplace = "{{" + propName + "}}"
        string = string.replace(new RegExp(propToReplace,"g"), propValue)
        return string
    };
    
    // on the first load, show home view
    dc.loadMenuCatagories = function(){
        showLoading(insertedSiteInMainPage)
        $ajaxUtils.sendGetRequest(allCatagoriesUrl, buildAndShowCatagoriesHtml, true)
    }
    
    // load the menu view
    let buildAndShowCatagoriesHtml = function(catagories){
        $ajaxUtils.sendGetRequest(menuTitle, function(menuTitle){
            $ajaxUtils.sendGetRequest(menuContent, function(menuContent){
                let catagoriesViewHtml =  buildCatagoriesViewHtml(catagories, menuTitle, menuContent)
                insertHtml(insertedSiteInMainPage, catagoriesViewHtml)
                switchMenuToActive()
            }, false)
        }, false);
    }

    //Build the menu page base on the data from the server
    let buildCatagoriesViewHtml = function(catagories, menuTitle, menuContent){
        let finalHtml = menuTitle
        finalHtml += "<section class='row justify-content-between'>"

        // Loop over catagories 
        for (let i=0; i < catagories.length; i++){
            // Insert catagory values
            let html = menuContent
            const name = catagories[i].name
            const short_name =  catagories[i].short_name
            const image_type = catagories[i].image_type
            html = insertProperty(html, "name", name)
            html = insertProperty(html, "short_name", short_name)
            html = insertProperty(html, "image_type", image_type)
            finalHtml += html
        }
        finalHtml += "</section>"
        return finalHtml
    }
    
    let switchMenuToActive = function(){
        // Remove 'active' from Home button
        let classes = document.querySelector("#navHomeButton").className
        classes = classes.replace(new RegExp("active","g"), "")
        document.querySelector("#navHomeButton").className = classes

        // Add 'active' to Menu button
        classes = document.querySelector("#navMenuButton").className
        if (classes.indexOf("active") == -1){
            classes += " active"
            document.querySelector("#navMenuButton").className = classes
        }
    };
    let switchMyDogsToActive = function(){
        // Remove 'active' from Home button
        let classes = document.querySelector("#navHomeButton").className
        classes = classes.replace(new RegExp("active","g"), "")
        document.querySelector("#navHomeButton").className = classes

        // Add 'active' to Menu button
        classes = document.querySelector("#navMyDogsButton").className
        if (classes.indexOf("active") == -1){
            classes += " active"
            document.querySelector("#navMyDogsButton").className = classes
        }
    };

    // Load the My Dog view
    dc.randomDogsToday = function(){
        $ajaxUtils.sendGetRequest(myDogHtml, function(myDogHtml){
            $ajaxUtils.sendGetRequest(dogList, function(dogList){
                let finalMyDogsHtml = myDogHtml
                finalMyDogsHtml = insertProperty(finalMyDogsHtml, "dogName" , dogList[randomIndex].dog_name)
                finalMyDogsHtml = insertProperty(finalMyDogsHtml, "dogInfo", dogList[randomIndex].dog_info)
                finalMyDogsHtml = insertProperty(finalMyDogsHtml, "dogImage", dogList[randomIndex].dog_image)

                insertHtml(insertedSiteInMainPage, finalMyDogsHtml)
                switchMyDogsToActive()
            },true)
        }
        ,false)
    }

    global.$dc = dc
})(window);