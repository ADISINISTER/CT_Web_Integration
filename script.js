// Handle Form Submission
document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const membership = document.getElementById("membership").value;

  // CleverTap User Profile Push
  clevertap.profile.push({
    Site: {
      Name: name,
      Email: email,
      Phone: phone,
      Membership: membership,
    },
  });

  alert(`Welcome, ${name}! Your membership is set to ${membership}.`);
});
// Check if Service Worker is Supported
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("clevertap_sw.js").then(
      function (registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );

        // Enable Web Push Notifications
        document
          .getElementById("subscribeBtn")
          .addEventListener("click", function () {
            clevertap.notifications.push({
              titleText: "Get Notifications",
              bodyText: "Allow notifications to stay updated!",
              okButtonText: "Allow",
              rejectButtonText: "No Thanks",
            });
          });
      },
      function (err) {
        // Registration failed
        console.error("ServiceWorker registration failed: ", err);
      }
    );
  });
} else {
  console.error("Service Workers are not supported in this browser.");
}


// Handle Deep Link
document.getElementById("deeplinkBtn").addEventListener("click", function () {
  const deepLink = "https://demo.clevertap.com/"; // Replace with your deep link URL
  window.location.href = deepLink;
});

// Track Custom Events
document.getElementById("Custom Event").addEventListener("click", function () {
  clevertap.event.push("Product Viewed", {
    page_name: "CleverTap Integration Demo",
  });alert("Product Viewed");
});

// Web pop event
document.getElementById("webpop").addEventListener("click", function () {
  clevertap.event.push("PageViewed"); // Event Name "Web Pop Event"
//  alert("Web Pop Event");
});

function onnativeBanner() {
  document.getElementById("nativeDisplay").addEventListener("click", function (event) {
    console.log("Native button clicked");
    clevertap.event.push("Native Event");
  });
}