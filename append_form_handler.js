const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, 'app.js');

const customHandler = `

/* ==========================================
   FORMSPREE AJAX SUBMISSION HANDLER
   ========================================== */
document.addEventListener("DOMContentLoaded", function() {
  const forms = document.querySelectorAll('form[action^="https://formspree.io"]');
  
  forms.forEach(form => {
    form.addEventListener("submit", async function(event) {
      event.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : "Send";
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
      }

      const data = new FormData(form);
      
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          let title = "Message Sent!";
          let message = "Thank you! Our team will get back to you shortly.";
          
          if (form.id === "applicationForm") {
             title = "Application Received!";
             message = "Thank you for applying. Our HR team will review your profile.";
          } else if (window.location.pathname.includes("review")) {
             title = "Review Submitted!";
             message = "Thank you for your valuable feedback!";
          }
          
          // Show the gorgeous toast!
          if (typeof showSuccessNotification === 'function') {
             showSuccessNotification(title, message);
          } else {
             alert(message);
          }
          
          // Reset the form
          form.reset();
          
          if (submitBtn) {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
          }
        } else {
          alert("Oops! There was a problem submitting your form. Please try again.");
          if (submitBtn) {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
          }
        }
      } catch (error) {
        alert("Oops! There was a problem submitting your form. Please check your connection.");
        if (submitBtn) {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
      }
    });
  });
});
`;

fs.appendFileSync(appJsPath, customHandler);
console.log('Successfully appended custom Formspree handler to app.js');
