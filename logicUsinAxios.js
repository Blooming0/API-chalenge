function userSetter() {
    return new Promise((resolve, reject) => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    let users = response.data
                    let counter = 1;
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
                                <h1  style="color: black;">${user.name}</h1>
                        `
                        document.getElementById("edit").innerHTML = name
                        document.getElementById("user").innerHTML += contentOfUser

                    }

                } else {

                    reject("eror when getting posts")
                }

            })
        resolve()
    })

}

function GetThePosts(index, el) {
    
    document.getElementById("posts").innerHTML = ""

    axios.get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
            let posts = response.data;
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

