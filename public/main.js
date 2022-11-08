// main.js
const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'put',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({
        name: 'ruru',
        quote: 'update!'
      })
    })
    .then(res => {
        if (res.ok) return res.json();
      })
      .then(response => {
        // console.log(response);
        window.location.reload(true);
      });
});
    
  