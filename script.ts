// Select elements
const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeDisplayElement = document.getElementById("resume-display") as HTMLDivElement;
const shareableLinkContainer = document.getElementById("shareable-link-container") as HTMLDivElement;
const shareableLinkElement = document.getElementById("shareable-link") as HTMLAnchorElement;
const downloadPdfButton = document.getElementById("download-pdf") as HTMLButtonElement;
const profileImageInput = document.getElementById("profile-image") as HTMLInputElement;
const resumeImageContainer = document.getElementById("resume-image-container") as HTMLDivElement;

// Handle form submission
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent page reload

  // Collect input values
  const userName = (document.getElementById("username") as HTMLInputElement).value;
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const education = (document.getElementById("education") as HTMLInputElement).value;
  const experience = (document.getElementById("experience") as HTMLInputElement).value;
  const skills = (document.getElementById("skills") as HTMLInputElement).value;

  // Validate required fields
  if (!userName || !name || !email || !phone) {
    alert("Please fill in all required fields (Username, Name, Email, and Phone).");
    return;
  }

  // Handle profile image preview
  let profileImageHTML = "";
  const imageFile = profileImageInput.files?.[0];
  if (imageFile) {
    const reader  = new FileReader();
    reader.onload = function (e) 
    {
      const imgElement = document.createElement("img");
      imgElement.src = e.target?.result as string;
      imgElement.alt = "Profile Picture";
      imgElement.style.maxWidth = "150px";

      imgElement.style.borderRadius = "50%";

      resumeImageContainer.innerHTML = "";
      resumeImageContainer.appendChild(imgElement);

      profileImageHTML = `
      <div>
      <img src="${e.target?.result}" alt="Profile Picture" style ="max-width:150px; border-radius: 50%;">
      </div>
      `;
      // update the resume content with the image

      updateResumeHTML();
    };
    reader.readAsDataURL(imageFile);
  } else {
    updateResumeHTML();
  }

  // Save resume data to local storage
  const resumeData = {
    userName,
    name,
    email,
    phone,
    education,
    experience,
    skills,
  };
  localStorage.setItem(userName, JSON.stringify(resumeData));

  // Generate the resume content dynamically
  function updateResumeHTML() {

  const resumeHTML = `
    <h2>Editable Resume</h2>
    <div id="resume-content">
    ${profileImageHTML} <!--Include the image-->
      <h3>Personal Information</h3>
      <p><b>Name:</b> <span contenteditable="true">${name}</span></p>
      <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
      <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>
      <h3>Education</h3>
      <p contenteditable="true">${education}</p>
      <h3>Experience</h3>
      <p contenteditable="true">${experience}</p>
      <h3>Skills</h3>
      <p contenteditable="true">${skills}</p>
    </div>
  `;
  resumeDisplayElement.innerHTML = resumeHTML;
  }
});

  // Generate shareable URL
  const shareableURL = new URL(window.location.href);
  shareableURL.searchParams.set("username", encodeURIComponent("username"));
  shareableLinkElement.href = shareableURL.toString();
  shareableLinkElement.textContent = "Shareable Link";
  shareableLinkContainer.style.display = "block"; // Show shareable link container;

// Handle PDF download
downloadPdfButton.addEventListener("click", () => {
  const elementToPrint = resumeDisplayElement.cloneNode(true) as HTMLDivElement;

  const newWindow = window.open("", "_blank");
  newWindow?.document.write(`
    <html>
      <head>
        <title>Download Resume</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
          #resume-content { max-width: 800px; margin: auto; }
          img { max-width: 150px; border-radius: 50%; }
        </style>
      </head>
      <body>${elementToPrint.outerHTML}</body>
    </html>
  `);
  newWindow?.document.close();
  newWindow?.print();
});

// Prefill form based on the username in the URL
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");

  if (username) {
    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
      const resumeData = JSON.parse(savedResumeData);
      (document.getElementById("username") as HTMLInputElement).value = username;
      (document.getElementById("name") as HTMLInputElement).value = resumeData.name;
      (document.getElementById("email") as HTMLInputElement).value = resumeData.email;
      (document.getElementById("phone") as HTMLInputElement).value = resumeData.phone;
      (document.getElementById("education") as HTMLInputElement).value = resumeData.education;
      (document.getElementById("experience") as HTMLInputElement).value = resumeData.experience;
      (document.getElementById("skills") as HTMLInputElement).value = resumeData.skills;
    }
  }
});
