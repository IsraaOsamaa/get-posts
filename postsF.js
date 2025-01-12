let users = document.querySelector(".users");
let posts = document.querySelector(".posts");

function getUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      // check the response is ok
      if (response.ok) {
        return response.json();
      } else {
        reject(Error("with user request!"));
      }
    })
    .then((data) => {
      // get users
      for (user of data) {
        let userDiv = `
        <div class="user" onclick='whenClicked(${user.id} , this)'>    
        <p>${user.name}</p>
        <p>${user.email}</p>
      </div>
        `;
        users.innerHTML += userDiv;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function getPosts(userId) {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((UserPost) => {
      // make posts empty
      posts.innerHTML = "";
      // get User Posts
      for (post of UserPost) {
        let postDiv = `
          <div class="post">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
          </div>
      `;
        posts.innerHTML += postDiv;
      }
    });
}

function whenClicked(id, element) {
  getPosts(id);
  // remove selected from all
  users.querySelectorAll(".selected").forEach((div) => {
    div.classList.remove("selected");
  });
  // add selected class
  element.classList.add("selected");
}

getUsers();
getPosts(1);

// need whenSelected function
