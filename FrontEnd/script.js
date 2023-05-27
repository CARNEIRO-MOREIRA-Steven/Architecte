
const imageApi = fetch("http://localhost:5678/api/works");
imageApi.then(async (reponseImage) =>{
    const image = await reponseImage.json()
    console.log(image);


for (let i = 0; i<image.length; i++){
try {
    const imageId = image[i].id;
    const imageUrl = image[i].imageUrl;
    const imageTitle = image[i].title;
    const imageCategory = image[i].category;
    const userId = image[i].userId;
    console.log(imageId);
    console.log(imageUrl);
    console.log(imageTitle);
    console.log(imageCategory);
    console.log(userId);


const cardGallery = document.createElement("figure")
const imageGallery = document.createElement("img");
const titleGallery = document.createElement("figcaption");

const sectionGallery = document.querySelector(".gallery");

sectionGallery.appendChild(cardGallery);
cardGallery.appendChild (imageGallery);
cardGallery.appendChild(titleGallery);

imageGallery.src = image[i].imageUrl;
titleGallery.innerHTML = image[i].title


}catch (err) {
    console.log(err);
}
}})

.catch((err) => {
    console.log(err);
});

