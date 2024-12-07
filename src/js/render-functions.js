export function renderGallery(images) {
    const gallery = document.querySelector("#gallery");
    const markup = images
        .map(
            ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
                return `
                 <li> <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" width="360px" height="200px" class="image"/>
                </a>
                <div class = "info">
                <div class="info-div"> <p class="section"> Likes: </p> <p class="result" > ${likes} </p> </div>
                <div class="info-div"> <p class="section"> Views: </p> <p class="result"> ${views} </p> </div>
                <div class="info-div"> <p class="section"> Comments: </p> <p class="result"> ${comments} </p> </div>
                <div class="info-div"> <p class="section"> Downloads: </p> <p class="result"> ${downloads} </p> </div>
                 </div>
                </li>
               `
            }
    )
        .join("")
    gallery.insertAdjacentHTML("beforeend", markup);
}

export function clearGallery() {
    gallery.innerHTML = "";
}

export function toggleLoader(show) {
    const loader = document.querySelector("#toggle-div");
    loader.classList.toggle("hidden", !show)
}

export function toggleMoreLoadButton(show) {
   const loadMoreBtn = document.querySelector("#load-more");
    loadMoreBtn.classList.toggle("hidden", !show)
}