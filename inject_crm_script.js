const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

const scriptToInject = `
<!-- CRM Integration Script -->
<script>
  document.addEventListener("DOMContentLoaded", function() {
    const forms = document.querySelectorAll('form[action^="https://formspree.io"]');
    forms.forEach(form => {
      form.addEventListener("submit", function(e) {
        e.preventDefault(); // Stop immediate navigation
        
        const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('input[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
        }
        
        const formData = new FormData(form);
        const data = {
          name: formData.get('name') || formData.get('fullName') || 'Unknown',
          email: formData.get('email') || formData.get('_replyto') || 'Unknown',
          phone: formData.get('phone') || formData.get('contact') || '',
          message: formData.get('message') || '',
          source: window.location.pathname || 'Website Contact Form'
        };
        
        // 1. Send to CRM
        fetch('https://leads.ethanda.com/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).finally(() => {
          // 2. Resume Formspree submission
          form.submit();
        });
      });
    });
  });
</script>
</body>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    if (content.includes('formspree.io')) {
        // Remove old injected script if it exists
        content = content.replace(/<!-- CRM Integration Script -->[\s\S]*?<\/script>\s*<\/body>/, '</body>');
        // Inject new script
        content = content.replace('</body>', scriptToInject);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated CRM script in ${file}`);
    }
});
console.log('CRM integration complete across all HTML files.');
