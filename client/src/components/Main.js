import React, { Component } from 'react';
import Article from './Article/Article.js'
import  Navbar from './Navbar/Navbar.js';
import Search from './Search/Search.js';
import Saved from './Saved/Saved.js';
import API from '../utils/api.js'


class Main extends Component {

  state = {
    topic: "",
    startYear: "",
    endYear: "",
    articles: [],
    saved: []
  };

  // When the component mounts, get a list of all saved articles and update this.state.saved
  componentDidMount() {
    this.getSavedArticles()
  }

  // Method for getting saved articles (all articles) from the db
  getSavedArticles = () => {
    API.getArticle()
      .then((res) => {
        this.setState({ saved: res.data });
      });
  }

  // A helper method for rendering one search results div for each article
  renderArticles = () => {
    return this.state.articles.map(article => (
      <Article
        _id={article._id}
        title={article.headline.main}
        date={article.pub_date}
        url={article.web_url}
        handleSaveButton={this.handleSaveButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  // A helper method for rendering one div for each saved article
  renderSaved = () => {
    return this.state.saved.map(save => (
      <Saved
        _id={save._id}
        title={save.title}
        date={save.date}
        url={save.url}
        handleDeleteButton={this.handleDeleteButton}
      />
    ));
  }

  // Keep track of what user types into topic input so that input can be grabbed later
  handleTopicChange = (event) => {
    this.setState({ topic: event.target.value });
   
  }

  // Keep track of what user types into topic input so that input can be grabbed later
  handleStartYearChange = (event) => {
    this.setState({ startYear: event.target.value });
  }

  // Keep track of what user types into topic input so that input can be grabbed later
  handleEndYearChange = (event) => {
    this.setState({ endYear: event.target.value });
  }

  // When the search form submits, perform NYT api search with user input
  handleFormSubmit = (event) => {
    event.preventDefault();

    API.searchNYT(this.state.topic, this.state.startYear, this.state.endYear)
      .then((res) => {
        this.setState({ articles: res.data.response.docs });
        
      
      });

  }

  // When save article button is clicked, add article to db
  handleSaveButton = (id) => {

    const findArticleByID = this.state.articles.find((el) => el._id === id);
    console.log("findArticleByID: ", findArticleByID);
    const newSave = { _id: findArticleByID._id, title: findArticleByID.headline.main, url: findArticleByID.web_url};
    API.saveArticle(newSave)
    .then((res)=>{
      this.getSavedArticles();
    }
    ); 
   

  
  }

  // When delete article button is clicked, remove article from db
  handleDeleteButton = (id) => {
    console.log("id:",id)
    API.deleteArticle(id)
      .then(this.getSavedArticles());
  }

  
  render() {
    return (
    
       
     

      <div className="main-container">
       
        <div className="container">
          {/* Jumbotron */}
       
          <Navbar/>
          <Search
            handleTopicChange={this.handleTopicChange}
            handleStartYearChange={this.handleStartYearChange}
            handleEndYearChange={this.handleEndYearChange}
            handleFormSubmit={this.handleFormSubmit}
            renderArticles={this.renderArticles}
          />
          {/* Saved Articles Section */}
         
            
              <div className="col-lg-12">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title">
                      <strong>
                        <i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong>
                    </h3>
                  </div>
                  <div className="panel-body">
                    <ul className="list-group">
                      {this.renderSaved()}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          
          <footer>
            <hr />
            <p className="pull-right">
              <i className="fa fa-github" aria-hidden="true"></i>
              by  Jonas Morel.
            </p>
          </footer>
        </div>
  

    );
  }

}

export default Main;
