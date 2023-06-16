//Création constante avec url API
const urlApiWorks = "http://localhost:5678/api/works";
const urlApiCategory = "http://localhost:5678/api/categories";
//Création variable des tableaux
let listWorks = [];
let listCategories = [];
//Initialise les constantes
const init = ()=>{
    //Méthode fetch pour récupérer le tableau dans l'API 
    fetch(urlApiWorks).then(response =>{
         return response.json();//Retourne le lien de l'API     
    }).then((data) => { // Récupère le tableau
        listWorks = data //Ajout du tableau a notre variable
        displayWorks(listWorks)//Affichage du tableau
    });
    fetch(urlApiCategory).then(response =>{
       return response.json();
    }).then((data) =>  {
    listCategories = data
    listCategories.unshift({id:0,name:"Tous"})//Ajout d'une case en début de tableau
    displayCategory(listCategories)
    }
    );
}

//Constante Filtre par catégories 
const filterByCategory = (idCategory) => {
    if(idCategory != 0){ //Si id catégorie différent  0
        displayWorks(listWorks.filter((work)=>{ //Filtrer liste works 
            return work.category.id == idCategory; //Retourner id catégorie dans works
        }))
    }else{ //Sinon id catégorie 0
        displayWorks(listWorks) //Afficher la list 
    }
}

//Constante afficher catégories
const displayCategory = (listCategories) =>{
//Boucle pour pour parcourir le tableau
    for (let i = 0; i<listCategories.length; i++){       
                //Récupération id + name dans la liste catégorie
                const { id,name} =listCategories[i];                
                //Accès section filters
                const sectionFilter = document.querySelector(".filters");
                //Crée button + parent
                const boutonFilter = document.createElement("button");
                boutonFilter.id = id; //Ajout propriété id au bouton = id 
                sectionFilter.appendChild(boutonFilter)
                //Affiche les filters        
                boutonFilter.innerHTML = name;
                //Event Listener button
                boutonFilter.addEventListener("click",function(filterid){//au click executer la fonction 
                filterByCategory(filterid.target.id);//appel fonction qui cible l'id                   
                })
            }
}
//Constante affciher works
const displayWorks = (listWorks) =>{
    //Accès à la section gallery
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.innerHTML =''; //Vider le contenue
    for (let i = 0; i<listWorks.length; i++){
               const {id, title,imageUrl,userId} = listWorks[i];
                //On crée nos constante et les balises
                const cardGallery = document.createElement("figure")
                cardGallery.setAttribute('data-image-id', id)
                const imageGallery = document.createElement("img");
                const titleGallery = document.createElement("figcaption");
                //On relie les dossier parents
                sectionGallery.appendChild(cardGallery);
                cardGallery.appendChild (imageGallery);
                cardGallery.appendChild(titleGallery);
                //On affiche les images et le titre par rapport a l'index
                imageGallery.src = imageUrl;
                titleGallery.innerHTML = title
                }
}


init();
