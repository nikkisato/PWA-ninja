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
