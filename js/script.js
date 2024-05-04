const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const themeColor = document.getElementById('theme-color');
hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    themeColor.content = "#000000"
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    themeColor.content = "#ffffff"
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

//  Store color theme for future visits

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); //add this
    themeColor.content = "#000000"
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
    themeColor.content = "#ffffff"
  }
}

// Save user preference on load

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

//Adding date

let myDate = document.querySelector("#datee");


// Function to get the client's IPv4 address
function getClientIPv4(callback) {
    // Make a request to a third-party service to get the client's IP address
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipv4 = data.ip;
            callback(ipv4);
        })
        .catch(error => {
            console.error('Error fetching IP address:', error);
            callback(null);
        });
}

// Function to send the IPv4 address to the server
function sendIPv4ToServer(ipv4) {
    if (!ipv4) {
        console.error('Invalid IPv4 address');
        return;
    }

    // Prepare JSON data
    const jsonData = {
        ipv4: ipv4
    };

    // Send JSON data to the server
    fetch('http://96.233.77.28:8001', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Telemetry sent successfully:', ipv4);
        } else {
            console.error('Failed to send Telemetry to server');
        }
    })
    .catch(error => {
        console.error('Error sending Telemetry to server:', error);
    });
}

// Usage: Call getClientIPv4 to get the IPv4 address and then send it to the server
getClientIPv4(sendIPv4ToServer);
