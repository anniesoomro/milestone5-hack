// Select elements
var form = document.getElementById("resume-form");
var resumeDisplayElement = document.getElementById("resume-display");
var shareableLinkContainer = document.getElementById("shareable-link-container");
var shareableLinkElement = document.getElementById("shareable-link");
var downloadPdfButton = document.getElementById("download-pdf");
var profileImageInput = document.getElementById("profile-image");
var resumeImageContainer = document.getElementById("resume-image-container");
// Handle form submission
form.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault(); // Prevent page reload
    // Collect input values
    var userName = document.getElementById("username").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    // Validate required fields
    if (!userName || !name || !email || !phone) {
        alert("Please fill in all required fields (Username, Name, Email, and Phone).");
        return;
    }
    // Handle profile image preview
    var profileImageHTML = "";
    var imageFile = (_a = profileImageInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (imageFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a, _b;
            var imgElement = document.createElement("img");
            imgElement.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            imgElement.alt = "Profile Picture";
            imgElement.style.maxWidth = "150px";
            imgElement.style.borderRadius = "50%";
            resumeImageContainer.innerHTML = "";
            resumeImageContainer.appendChild(imgElement);
            profileImageHTML = "\n      <div>\n      <img src=\"".concat((_b = e.target) === null || _b === void 0 ? void 0 : _b.result, "\" alt=\"Profile Picture\" style =\"max-width:150px; border-radius: 50%;\">\n      </div>\n      ");
            // update the resume content with the image
            updateResumeHTML();
        };
        reader.readAsDataURL(imageFile);
    }
    else {
        updateResumeHTML();
    }
    // Save resume data to local storage
    var resumeData = {
        userName: userName,
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills,
    };
    localStorage.setItem(userName, JSON.stringify(resumeData));
    // Generate the resume content dynamically
    function updateResumeHTML() {
        var resumeHTML = "\n    <h2>Editable Resume</h2>\n    <div id=\"resume-content\">\n    ".concat(profileImageHTML, " <!--Include the image-->\n      <h3>Personal Information</h3>\n      <p><b>Name:</b> <span contenteditable=\"true\">").concat(name, "</span></p>\n      <p><b>Email:</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n      <p><b>Phone:</b> <span contenteditable=\"true\">").concat(phone, "</span></p>\n      <h3>Education</h3>\n      <p contenteditable=\"true\">").concat(education, "</p>\n      <h3>Experience</h3>\n      <p contenteditable=\"true\">").concat(experience, "</p>\n      <h3>Skills</h3>\n      <p contenteditable=\"true\">").concat(skills, "</p>\n    </div>\n  ");
        resumeDisplayElement.innerHTML = resumeHTML;
    }
});
// Generate shareable URL
var shareableURL = new URL(window.location.href);
shareableURL.searchParams.set("username", encodeURIComponent("username"));
shareableLinkElement.href = shareableURL.toString();
shareableLinkElement.textContent = "Shareable Link";
shareableLinkContainer.style.display = "block"; // Show shareable link container;
// Handle PDF download
downloadPdfButton.addEventListener("click", function () {
    var elementToPrint = resumeDisplayElement.cloneNode(true);
    var newWindow = window.open("", "_blank");
    newWindow === null || newWindow === void 0 ? void 0 : newWindow.document.write("\n    <html>\n      <head>\n        <title>Download Resume</title>\n        <style>\n          body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }\n          #resume-content { max-width: 800px; margin: auto; }\n          img { max-width: 150px; border-radius: 50%; }\n        </style>\n      </head>\n      <body>".concat(elementToPrint.outerHTML, "</body>\n    </html>\n  "));
    newWindow === null || newWindow === void 0 ? void 0 : newWindow.document.close();
    newWindow === null || newWindow === void 0 ? void 0 : newWindow.print();
});
// Prefill form based on the username in the URL
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById("username").value = username;
            document.getElementById("name").value = resumeData.name;
            document.getElementById("email").value = resumeData.email;
            document.getElementById("phone").value = resumeData.phone;
            document.getElementById("education").value = resumeData.education;
            document.getElementById("experience").value = resumeData.experience;
            document.getElementById("skills").value = resumeData.skills;
        }
    }
});
