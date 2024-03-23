// Function to make products cards for users wishlist

const productCardGenerator1 = (pro) => {
  function createProductCard(product) {
    return `
      <div class="product">
      <a href="product.html?id=${product._id}">
        <img src="../Images/Product/${product.imageUrl1}" alt=" product img" />
        <img id="change" src="../Images/Product/${product.imageUrl2}" alt=" product img" />
        <div class="descr">
          <span>NIKE</span>
          <h4>${product.title}</h4>
          <h5>₹ ${product.price}</h5>
        </div>
        <div class="cart">
        <a  onclick='removeWl("${product._id}")' title="Remove from Wishlist"><i class="bx bx-x wishlist"></i></a>
        <a   onclick='addToCart("${product._id}")'    title="Add to cart"><i class="bx bxs-cart-add cart1"></i></a>
        </div>
        </a>
      </div>`;
  }

  // Fetching the users wishlist product to display
  fetch("https://upstyle-tivn.onrender.com/wishlist", { credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
      if (data.length == 0) {
        document.getElementById("emptyWish").style.display = "block";
      }
      for (let i = 0; i < data.length; i++) {
        let objId = data[i].itemId;
        fetch(`https://upstyle-tivn.onrender.com/product/${objId}`)
          .then((res2) => res2.json())
          .then((data2) => {
            let productCard = createProductCard(data2);
            pro.insertAdjacentHTML("beforeend", productCard);
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

let pro = document.getElementById("productContainer1");
productCardGenerator1(pro);

// Function to remove the wishlist function using fetch with delete

function removeWl(productId) {
  fetch(`https://upstyle-tivn.onrender.com/removefromwishlist/${productId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        location.reload();
      } else {
        console.error("Failed to remove product to cart.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to add the products in the cart from the wishlist

function addToCart(productId) {
  fetch(`https://upstyle-tivn.onrender.com/add-to-cart-only/${productId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        colorCart(productId); // Change color after successful addition to cart
      } else {
        console.error("Failed to add product to cart-only.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to color the cart

function colorCart(productId) {
  const cartIcon = document.querySelector(`.carting-${productId}`);
  cartIcon.style.color = "blue";
}
// Fetching the users profile

function fetchUserProfile() {
  fetch("https://upstyle-tivn.onrender.com/viewprofile", { credentials: "include" })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      // Display fetched user profile data
      document.querySelector(".avatar img").src = data.avatarUrl;
      document.querySelector(".firstName").textContent = data.firstName;
      document.querySelector(".lastName").textContent = data.lastName;
      document.querySelector("#firstNameInput").value = data.firstName;
      document.querySelector("#lastNameInput").value = data.lastName;
      document.querySelector("#emailInput").textContent = data.email;
      document.querySelector(".email").textContent = data.email;
      document.querySelector("#phoneInput").textContent = data.phone;
      document.querySelector("#addr1").value = data.addrs1;
      document.querySelector("#addr2").value = data.addrs2;
      document.querySelector("#passwordInput").value = data.password;
    })
    .catch((err) => {
      console.log(err);
    });
}

// Fetch and display user profile data when the page loads
window.addEventListener("load", fetchUserProfile);

// Function to show the editable profile form
function showEditProfileForm() {
  document.querySelector(".avatar").style.display = "none";
  document.querySelector("#editProfile").style.display = "none";

  // Show the editable form
  document.querySelector(".user-info").style.display = "block";
  document.querySelector("#updateProfile").style.display = "block";
}

// Function to handle form submission (update profile)

document
  .querySelector("#updateProfile")
  .addEventListener("click", function (e) {
    e.preventDefault();

    // Collect data from the form
    const firstName = document.querySelector("#firstNameInput").value;
    const lastName = document.querySelector("#lastNameInput").value;
    const password = document.querySelector("#passwordInput").value;
    const addrs1 = document.querySelector("#addr1").value;
    const addrs2 = document.querySelector("#addr2").value;

    // Update the displayed data
    document.querySelector(".firstName").textContent = firstName;
    document.querySelector(".lastName").textContent = lastName;

    // Hide the form and display the updated data

    document.querySelector(".user-info").style.display = "none";
    document.querySelector(".avatar").style.display = "block";
    document.querySelector("#updateProfile").style.display = "none";
    document.querySelector("#editProfile").style.display = "block";

    // Send the updated data to the server using a fetch request
    fetch("https://upstyle-tivn.onrender.com/user-update", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        addrs1,
        addrs2,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "profile.html";
        } else {
          console.error("Failed to update profile data.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

// Add click event listener to the "Edit Profile" button

document
  .querySelector("#editProfile")
  .addEventListener("click", showEditProfileForm);

// Fetch and display user profile data when the page loads

window.addEventListener("load", fetchUserProfile);

document.querySelector("#editProfile").addEventListener("click", function (e) {
  e.preventDefault();

  // Toggle the visibility of the password field
  const passwordField = document.querySelector(".password");
  const updateButton = document.querySelector("#updateProfile");

  if (passwordField.style.display === "none") {
    passwordField.style.display = "block";
    updateButton.style.display = "block";
  } else {
    passwordField.style.display = "none";
    updateButton.style.display = "none";
  }
});

// Function to logout it will delete the cookie
document.getElementById("logout").addEventListener("click", function (e) {
  e.preventDefault();

  fetch("https://upstyle-tivn.onrender.com/user-logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "landingPage.html";
      } else {
        console.error("Failed to logout.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// Function to delete the users account

document.getElementById("deleteAcc").addEventListener("click", function (e) {
  e.preventDefault();
  fetch("https://upstyle-tivn.onrender.com/delete-account", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "landingPage.html";
      } else {
        console.error("Failed to delete.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

const searchInput = document.getElementById("search-input");
const searchIcon = document.getElementById("search-icon");
const searchResultsPopup = document.getElementById("search-results-popup");

// Function to fetch search results

async function fetchSearchResults(query) {
  try {
    const response = await fetch(`https://upstyle-tivn.onrender.com/search?query=${query}`);
    const data = await response.json();

    displaySearchResults(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}

// Function to display search results in the popup

function displaySearchResults(results) {
  searchResultsPopup.innerHTML = "";

  results.forEach((result) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("result-item");

    //  Anchor tag for the result item
    const resultLink = document.createElement("a");
    resultLink.href = `product.html?id=${result._id}`;

    // Span for the title and set its text content
    const titleSpan = document.createElement("span");
    titleSpan.textContent = result.title;

    // Append the title span to the anchor tag

    resultLink.appendChild(titleSpan);

    // Append the anchor tag to the result item

    resultItem.appendChild(resultLink);

    searchResultsPopup.appendChild(resultItem);
  });

  searchResultsPopup.style.display = "block";
}
searchResultsPopup.style.display = "none";

// Event listener for input changes

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();

  if (query === "") {
    searchResultsPopup.style.display = "none";
    return;
  }

  fetchSearchResults(query);
});

// Event listener to close the search results when clicking outside

document.addEventListener("click", (event) => {
  if (
    !searchResultsPopup.contains(event.target) &&
    event.target !== searchInput
  ) {
    searchResultsPopup.style.display = "none";
  }
});

// Event listener to handle search when clicking the search icon

searchIcon.addEventListener("click", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();

  fetchSearchResults(query);
});
