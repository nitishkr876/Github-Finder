// Init Github
const github = new Github;

// Init UI
const ui = new UI;

// Search input
const searchUser = document.getElementById('searchUser');

// Search input event listener
searchUser.addEventListener('keyup', (e) => {
  // Get input text
  const userText = e.target.value;

  if(userText !== '') {
    // Make http call
    github.getUser(userText)
      .then(data => {
        if(data.profile.message === 'Not Found') {
          // Show alert
          ui.showAlert('User not found', 'alert alert-danger');
        } else if (data.profile.message) {
          ui.showAlert(data.profile.message, 'alert alert-danger');
        } else {
          // show profile
          ui.clearAlert();

          const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const created_timestamp = new Date(data.profile.created_at);
          data.profile.created_at = months[created_timestamp.getMonth()] + " " + created_timestamp.getFullYear();

          ui.showProfile(data.profile);          
          ui.showRepos(data.repos);          
        }

        // if(!data.profile.message) {
        //   // show profile
        //   ui.clearAlert();
        //   ui.showProfile(data.profile);          
        //   ui.showRepos(data.repos);          
        // }
      })
  } else {
    // Clear profile
    ui.clearProfile();
  }
});