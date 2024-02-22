function userSetter() {
    document.getElementById("selectedName").innerHTML = ""
    let counter = 1;
    let request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/users")
    request.responseType = "json"
    request.send()
    request.onload = function () {
        let users = request.response
        for (user of users) {
            let contentOfUser =
                `
                
                                    <div class="profail col-3" onclick="GetThePosts(${counter++}, this)" >
                                        <h3 class="name" id="name">${user.name}</h3>
                                        <h5 class="contact">${user.email}</h5>
                                    </div>
                        `
            document.getElementById("user").innerHTML += contentOfUser
        }
    }
}

function GetThePosts(index, el) {
    document.getElementById("posts").innerHTML = ""
    let request = new XMLHttpRequest()
    request.open("GET", "https://jsonplaceholder.typicode.com/posts")
    request.responseType = "json"
    request.send()
    request.onload = function () {
        let posts = request.response
        for (post of posts) {
            if (post.userId == index) {
                let contentOfPost =
                    `
                                    <div class="post">
                                        <div class="title" >
                                            <h1 >${post.title}</h1>
                                        </div>
                                    <hr>
                                        <div class="body" >
                                            <h2>${post.body}</h2>
                                        </div>
                                    </div>
                                `
                document.getElementById("posts").innerHTML += contentOfPost
            }
        }
    }
    //somthing new take A note here
    //selected elements


    let selectedElements = document.getElementsByClassName("selected")
    for (seleced of selectedElements) {
        seleced.classList.remove("selected")
    }
    el.classList.add("selected")



    //name of the poster (edit it Not complete) 
    console.log(el)
    document.getElementById("selectedName").innerHTML = document.getElementById("name").value
}
userSetter()
GetThePosts(1)