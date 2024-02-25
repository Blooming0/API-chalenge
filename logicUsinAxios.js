function userSetter() {
    return new Promise((resolve, reject) => {
        //the special things in axios library is : you don't need to check the response status and =>
        //if somthing bad happend for EX the status was over 300 or less than 200 the catch(mrthod aftar then) will handle the error .  
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
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
                resolve()
            })
            .catch((error) => {
                reject(error);
            })
    })

}
function GetThePosts(index, el) {
    document.getElementById("posts").innerHTML = ""
    let url = "https://jsonplaceholder.typicode.com/posts"
    axios.get(url)
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
        .catch(error => {
            alert(error)
        })
}
userSetter()
    .then(() => {
        GetThePosts(1)
    }).catch((error) => {
        alert("error happends while geting the users response for more detail : " + error)
    })