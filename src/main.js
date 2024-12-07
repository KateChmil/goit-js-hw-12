import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from "./js/pixabay-api.js";
import { clearGallery, toggleLoader, renderGallery,toggleMoreLoadButton } from "./js/render-functions.js"

const searchForm = document.querySelector("#search-form");
const sInput = document.querySelector("#search-input");
const loadMoreBtn = document.querySelector("#load-more");
const PERPAGE = 15;

let currentPage = 1;
//let request = "";

const lightbox = new SimpleLightbox("#gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});










searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const request = sInput.value.trim();
    if (!request) {
        iziToast.error({ title: "Error", message: "Search field cannot be empty!" });
    return;}
     
    clearGallery();
    toggleMoreLoadButton(false);
    toggleLoader(true);
    //added here
    const currentPage = 1;
    
   fetchImages(request) 
      .then((data) => {
    toggleLoader(false);
    if (!data.hits.length) {
              iziToast.warning({
          title: "No Results",
          message: "Sorry, there are no images matching your search query. Please try again!",
        });
        return;}
          
        renderGallery(data.hits)
        lightbox.refresh();         
    })
      
    try {
        const data = await fetchImages(request, currentPage);
        toggleLoader(false);
        if (!data.hits.length) {
              iziToast.warning({
          title: "No Results",
          message: "Sorry, there are no images matching your search query. Please try again!",
        });
            return;
        };

         renderGallery(data.hits)
        lightbox.refresh();


        if (currentPage * 15 < data.totalHits) {
            toggleMoreLoadButton(true);
         }
    } catch (error) {
   toggleLoader(false);
    iziToast.error({ title: "Error", message: "Something went wrong. Please try again later." })
    }
    
})
    
loadMoreBtn.addEventListener("click", async () => {
    const request = sInput.value.trim();
    currentPage += 1;
    try {
        const data = await fetchImages(request, currentPage);
        renderGallery(data.hits);


     const { height: cardHeight } = document
      .querySelector(".gallery li")
      .getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
        
        
    if (currentPage * PERPAGE >= data.totalHits) {
        toggleMoreLoadButton(false);
        iziToast.info({ title: "End of Results", message: "We`re sorry, but you`ve reached the end of search results." });
    }
    } catch (error) {
        toggleLoader(false);
    iziToast.error({ title: "Error", message: "Something went wrong. Please try again later." })
    }
    
})





