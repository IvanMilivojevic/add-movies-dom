const addMovieModalTrigger = document.querySelector("header button");
const addMovieModal = document.getElementById("add-modal");
const backdrop = document.getElementById("backdrop");
const addMovieConfirmButton = addMovieModal.querySelector(".btn--success");
const addMovieCancelButton = addMovieConfirmButton.previousElementSibling;
const userInputs = addMovieModal.getElementsByTagName("input");
const entryTextSection = document.getElementById("entry-text");
const listRoot = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");
const deleteMovieConfirmButton = deleteMovieModal.querySelector(".btn--danger");
const deleteMovieCancelButton = deleteMovieConfirmButton.previousElementSibling;
const movies = [];
let movieToDeleteId;

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const showAddMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter valid values (rating between 1 and 5).");
    return;
  }

  const jsUrl = "https://miro.medium.com/max/720/1*LjR0UrFB2a__5h1DWqzstA.png";
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: jsUrl, // hard coded image so that there is no need to type url in input
    rating: ratingValue
  };

  movies.push(newMovie);
  console.log(movies);
  closeModals();
  renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
      <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
      </div>
      <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
      </div>
    `;
  newMovieElement.addEventListener("click", startDeleteMovieHandler.bind(null, id));
  listRoot.append(newMovieElement);
};

const startDeleteMovieHandler = movieId => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();
  movieToDeleteId = movieId;
};

const deleteMovieHandler = () => {
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].id === movieToDeleteId) {
      movies.splice(i, 1);
      listRoot.children[i].remove();
      break;
    }
  }
  closeModals();
  updateUI();
};

const clearMovieInput = () => {
  for (const input of userInputs) {
    input.value = "";
  }
};

const closeModals = () => {
  const openModal = document.querySelector(".modal.visible");
  openModal.classList.remove("visible");
  toggleBackdrop();
  clearMovieInput();
};

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

addMovieModalTrigger.addEventListener("click", showAddMovieModal);
addMovieConfirmButton.addEventListener("click", addMovieHandler);
addMovieCancelButton.addEventListener("click", closeModals);
backdrop.addEventListener("click", closeModals);
deleteMovieCancelButton.addEventListener("click", closeModals);
deleteMovieConfirmButton.addEventListener("click", deleteMovieHandler);
