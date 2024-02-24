function userSetter() {
    let counter = 1;
    return new Promise((resolve, reject) => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json()
                } else {

                    reject("eror when getting posts")
                }

            })

            .then(users => {
                for (user of users) {
                    let contentOfUser =
                        `
                                    <div class="profail col-3" onclick="GetThePosts(${counter++}, this)" >
                                        <h3 class="name" id="name">${user.name}</h3>
                                        <h5 class="contact">${user.email}</h5>
                                    </div>
                    `
                    let name =
                        `           
                                    <h1 id="oma" style="color: black;">${user.name}</h1>
                        `
                    document.getElementById("edit").innerHTML = name
                    document.getElementById("user").innerHTML += contentOfUser

                }

            })
        resolve()
    })

}

function GetThePosts(index, el) {
    document.getElementById("posts").innerHTML = ""

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((data) => {
            if (data.status >= 200 && data.status < 300) {
                let posts = data.json()
                return posts
            } else {
                return alert("eror when getting posts")
            }
        }).then((posts) => {
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
        })

    //somthing new take A note here
    //selected elements
    let selectedElements = document.getElementsByClassName("selected")
    for (seleced of selectedElements) {
        seleced.classList.remove("selected")
    }
    el.classList.add("selected")
}

userSetter()
    .then(() => {
        GetThePosts(1)
    })
    .catch((error) => {
        console.log(error)
    })

