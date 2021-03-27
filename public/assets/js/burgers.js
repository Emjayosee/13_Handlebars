// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
  if (event) {
    console.info('DOM loaded');
  }

  // UPDATE
  const changeDevourBtns = document.querySelectorAll('.change-devour');

  // Set up the event listener for the create button
  if (changeDevourBtns) {
    changeDevourBtns.forEach((button) => {
      button.addEventListener('click', (e) => {
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute('data-id');
        const eaten = e.target.getAttribute('data-newlyeaten');

        const newlyeaten = {
          devour: eaten,
        };

        fetch(`/api/burgers/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          // make sure to serialize the JSON body
          body: JSON.stringify(newlyeaten),
        }).then((response) => {
          console.log
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          if (response.devoured) {
            console.log(`changed devour to: ${eaten}`);
            location.reload('/');
          } else {
            alert('something went wrong!');
          }
        });
      });
    });
  }

  // CREATE
  const createBurgerBtn = document.getElementById('create-form');

  if (createBurgerBtn) {
    createBurgerBtn.addEventListener('submit', (e) => {
      e.preventDefault();

      // Grabs the value of the textarea that goes by the name, "quote"
      const newBurger = {
        burger_name: document.getElementById('bun').value.trim(),
        devoured: document.getElementById('devoured').checked,
      };

      // Send POST request to create a new quote
      fetch('/api/burgers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newBurger),
      }).then(() => {
        // Empty the form
        document.getElementById('bun').value = '';

        // Reload the page so the user can see the new quote
        console.log('Created a new burger!');
        location.reload();
      });
    });
  }

  // DELETE
  const deleteBurgerBtns = document.querySelectorAll('.delete-burger');

  // Set up the event listeners for each delete button
  deleteBurgerBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');

      // Send the delete request
      fetch(`/api/burger/${id}`, {
        method: 'DELETE',
      }).then((res) => {
        console.log(res);
        console.log(`Eaten burger: ${id}`);

        // Reload the page
        location.reload();
      });
    });
  });
});
