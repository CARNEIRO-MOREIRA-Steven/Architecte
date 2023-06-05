const urlAuth = 'http://localhost:5678/api/users/login';
let comptUser = {};

const init = () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    email = e.target.email.value;
    password = e.target.password.value;
    comptUser = { email, password };
    console.log(comptUser);
    authentification();
  });
};

const authentification = () => {
  fetch(urlAuth, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comptUser)
  })
    .then( response => {
      if (!response.ok) {
        throw new Error("Erreur lors de l'authentification");
      }
      return response.json();
    })
    .then(data => {
      const { token, userId } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
      // Effectuer une vérification supplémentaire ici
      if (token && userId) {
        alert('Connexion en cours');
        window.location.href = 'index.html';
      } else {
        alert('Utilisateur inconnu');
      }
    })
    .catch(error => {
      console.error(error);
      alert(error);
    });
};

init();
