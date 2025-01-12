let users = document.querySelector(".users");
let posts = document.querySelector(".posts");

function getPosts(id) {
  let request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  ); // get the URL
  request.responseType = "json";
  request.send();

  request.onload = function () {
    // get response info in postsinfo
    let postsinfo = request.response;
    if (request.status >= 200 && request.status < 300) {
      // remove all
      posts.innerHTML = "";

      // get posts
      for (post of postsinfo) {
        let postDiv = `
            <div class="post">
              <h3>${post.title}</h3>
              <p>${post.body}</p>
            </div>
        `;
        posts.innerHTML += postDiv;
      }
    }
  };
}

function getUsers() {
  let userRequest = new XMLHttpRequest();
  userRequest.open("GET", "https://jsonplaceholder.typicode.com/users"); // get the URL
  userRequest.responseType = "json";
  userRequest.send();

  userRequest.onload = function () {
    if (userRequest.status >= 200 && userRequest.status < 300) {
      let postsinfo = userRequest.response;
      // get users
      for (user of postsinfo) {
        let userDiv = `
              <div class="user" onclick='whenClicked(${user.id} , this)'>
                
                <p>${user.name}</p>
                <p>${user.email}</p>
              </div>
        `;
        users.innerHTML += userDiv;
      }
    }
  };
}

function whenClicked(id, element) {
  getPosts(id);
  console.log(id);
  console.log(element);
  // remove selected ffrom all
  users.querySelectorAll(".user").forEach((div) => {
    div.classList.remove("selected");
  });
  // add selected class
  element.classList.add("selected");
  console.log("done");
}

getUsers();
getPosts(1);
