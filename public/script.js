document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const responseMessage = document.getElementById("responseMessage");

    console.log("Form Data:", { name, email, message });

    try {
      const response = await fetch("/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        responseMessage.textContent = "Message sent successfully.";
        responseMessage.style.color = "green";
        this.reset();
      } else {
        const errorText = await response.text();
        responseMessage.textContent = `Error: ${errorText}`;
        responseMessage.style.color = "red";
      }
    } catch (error) {
      responseMessage.textContent =
        "Error: Could not connect to the server. Please try again later.";
      responseMessage.style.color = "red";
    }
  });