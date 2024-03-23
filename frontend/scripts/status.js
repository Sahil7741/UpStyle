let log = document.querySelector(".log");

let profile = document.querySelector(".profile");
fetch("https://upstyle-tivn.onrender.com/user-status", {
  method: "get",
  credentials: "include",
})
  .then((res) => res.json())
  .then((data) => {
    if (data.status) {
      profile.style.display = "block";
      let avatarUrl = `../Images/Avatar/${data.avatarUrl}`;
      let imgElement = document.querySelector(".profile img");
      imgElement.src = avatarUrl;
      log.style.display = "none";
    } else {
      profile.style.display = "none";
      log.style.display = "block";
    }
  })
  .catch((err) => {
    console.log(err);
  });
