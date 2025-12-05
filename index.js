
    //Menu bar
    let sidebar=document.querySelector('.sidebar');
    let menubtn=document.querySelector('#menubtn');

    menubtn.addEventListener('click',(event)=>{
        event.preventDefault()
        sidebar.style.display='flex';
    })

    let sideBar=document.querySelector('.sidebar');
    let hideSideBar=document.querySelector('#closeicon');
    hideSideBar.addEventListener('click',(event)=>{
        event.preventDefault();
        sideBar.style.display='none';

    })

    //scrolling menu

    let scrollMenu=document.querySelectorAll("nav a[href^='#']");
    
        scrollMenu.forEach(menu=>{
        menu.addEventListener("click",function(e){
            e.preventDefault();

            const target=document.querySelector(this.getAttribute("href"));
            if(target){
                target.scrollIntoView({
                behavior:"smooth",
                block:"start"
            });
            }
        });
    });

    //view resume

    const viewResume=document.querySelector("#resumeBtn");
    const resumePath="./images/FrontEndResume.pdf";

    viewResume.addEventListener("click", async()=>{
        viewResume.textContent="opening...";
        viewResume.style.opacity="0.6";
        viewResume.style.pointerEvents="none";

        try{
            const response=await fetch(resumePath);

            if(!response.ok){
                throw new Error("Resume file not found");
            }
            window.open(resumePath, "_blank");

            setTimeout(()=>{
                viewResume.textContent="Download Resume";
                viewResume.style.opacity="1";
                viewResume.style.pointerEvents="auto";
            }, 1200);
        }catch(error){
            viewResume.textContent="File Not Found";
            viewResume.style.background="red";

            setTimeout(()=>{
                viewResume.textContent="View Resume";
                viewResume.style.background="";
                viewResume.style.pointerEvents="auto";
                viewResume.style.opacity="1";
            }, 2000);
        };
    });

//contact form
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const subjectInput = document.getElementById("subjectInput");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const popup = document.getElementById("successPopup");
const closePopup = document.getElementById("closePopup");


[nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    if (!input) return;

    input.value = localStorage.getItem(input.id) || "";

    input.addEventListener("input", () => {
        localStorage.setItem(input.id, input.value);
        validateForm();
    });
});

const allowedDomains = ["gmail.com", "outlook.com"];

// Email validation function

function validateEmail(email) {
    const domain = email.split("@")[1];
    return allowedDomains.includes(domain);
}

// Check form validation

function validateForm() {
    if (
        nameInput.value.trim() &&
        validateEmail(emailInput.value.trim()) &&
        subjectInput.value.trim() &&
        messageInput.value.trim()
    ) {
        sendBtn.disabled = false;
        sendBtn.style.opacity = "1";
    } else {
        sendBtn.disabled = true;
        sendBtn.style.opacity = "0.6";
    }
}

validateForm();

//Form Submission

form.addEventListener("submit", (e) => {

    if (!validateEmail(emailInput.value.trim())) {
        e.preventDefault();

        emailInput.classList.add("shake");
        setTimeout(() => emailInput.classList.remove("shake"), 400);

        alert("Please enter a valid email.");
        return;
    }

    sendBtn.classList.add("loading");
});

// Show popup after redirect
window.addEventListener("load", () => {
    const params = new URLSearchParams(window.location.search);

    if (params.has("success")) {
        popup.style.display = "flex";

        document.getElementById("contact").scrollIntoView({behavior:"smooth"});

        localStorage.removeItem("nameInput");
        localStorage.removeItem("emailInput");
        localStorage.removeItem("subjectInput");
        localStorage.removeItem("messageInput");

        form.reset();

        //popup doesn't show agian on reload
        const cleanURL=window.location.origin+window.location.pathname;
        window.history.replaceState({},document.title, cleanURL);
    }
});

// Close popup
closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});
