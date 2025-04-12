document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector("#signupForm");
  
    function showMessage(msg, duration = 3000) {
      const el = document.getElementById("message");
      if (!el) return;
      el.textContent = msg;
      el.style.display = "block";
      setTimeout(() => {
        el.style.display = "none";
      }, duration);
    }
  
    if (signupForm) {
      signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const name = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
  
        if (!name || !email || !password) {
          return showMessage("Please fill in all fields.");
        }
  
        try {
          const res = await fetch("https://rohith-bg-production.up.railway.app/signUp/createUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: name, email, password }),
          });
  
          const data = await res.json();
          console.log(data);
  
          if (res.ok) {
            showMessage("Registration successful! Redirecting...", 2000);
            setTimeout(() => {
              window.location.href = "login.html";
            }, 2000);
          } else {
            showMessage(data.msg || "Signup failed.");
          }
        } catch (err) {
          console.error(err);
          showMessage("Failed to connect to server.");
        }
      });
    }
  });