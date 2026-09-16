const form = document.getElementById("enquiryForm");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");

const API_URL ="https://customer-enquiry-api.onrender.com/api/enquiry";

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    formMessage.textContent = "";
    submitBtn.disabled = true;
    submitBtn.querySelector("span").textContent = "Sending...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name,email,phone,message
            })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }

        formMessage.textContent = data.message;
        formMessage.style.color = "green";
        form.reset();
    } catch (error) {
        formMessage.textContent =
            error.message || "Unable to submit enquiry. Please try again.";
        formMessage.style.color = "red";
    } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector("span").textContent = "Send Enquiry";
    }

});