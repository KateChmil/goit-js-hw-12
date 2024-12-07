import axios from "axios";

const APIKEY = "47458933-146f1ea8ad921328f8e999f88";
const BASEURL = "https://pixabay.com/api/";
const PERPAGE = 15;


export async function fetchImages(request, page = 1) {
  const params = {
    key: APIKEY,
    q: request,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page,
    per_page: PERPAGE,
  };

  try {
    const response = await axios.get(BASEURL, { params });
    return response.data
   
  } catch (error) {
    toggleLoader(false);
    iziToast.error({ title: "Error", message: "Something went wrong. Please try again later." });
 }

}