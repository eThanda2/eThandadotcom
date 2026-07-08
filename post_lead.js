fetch('https://leads.ethanda.com/api/opportunities', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    platform: 'Reddit',
    url: 'https://www.reddit.com/r/smallbusiness/comments/example_post/need_a_new_website_for_my_bakery',
    post_content: 'I am starting a local bakery and need a complete redesign of my basic WordPress site. Seeking an affordable developer with e-commerce experience.',
    suggested_reply: 'Hey! We at eT Tech (ethanda.com) specialize in e-commerce websites for local businesses. We can easily revamp your WordPress site to handle online orders smoothly. Let\'s chat!'
  })
})
.then(r => {
    console.log('Status:', r.status);
    return r.text();
})
.then(text => console.log('Response:', text))
.catch(e => console.error('Error:', e));
