import axios from "axios";

const api = {
  // Query NYT API
  searchNYT: function(topic, startYear, endYear) {
    const authKey = "3d58200a38834639bf957e8da27355bc";
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";
    return axios.get(queryURL);
  },
  // Retrieves saved articles from the db
  getArticle: function() {
    return axios.get("/");
  },
  // Saves a new article to the db
  saveArticle: function(articleObj) {
    return axios.post("/", articleObj);
  },
  // Deletes an article from the db
  deleteArticle: function(id) {
    return axios.delete(`/${id}`);
  }
};

export default api;
