//Offline data
db.enablePersistence().catch((err) => {
  if (err.code == 'failed-precondition') {
    console.log('Persistence failed');
  } else if (err.code == 'unimplemented') {
    console.log('Persistence is not available');
  }
});

//real time listener
db.collection('recipes').onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    //console.log(change, change.doc.data(), change.doc.id);
    if (change.type === 'added') {
      //add the document data to the web page
      renderRecipes(change.doc.data(), change.doc.id);
    }
    if (change.type === 'removed') {
      //remove the document data from the web page
    }
  });
});

//add new recipe
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value,
  };
  db.collection('recipes')
    .add(recipe)
    .catch((err) => {
      console.log(err);
    });

  form.title.value = '';
  form.ingredients.value = '';
});
