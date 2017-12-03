import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import './normalize.css'
import './html5bp.css'
import Article from './Article.js'

class App extends Component {

  //create constructor
  constructor(props) {
    super(props)

    this.state = {
      loading: "none",
      popup:"none",
      articles: [],
      details:{}
    }
    //load the get news function
    this.togglePopup = this.togglePopup.bind(this)
    this.handleClose =this.handleClose.bind(this)
  }

  componentDidMount() {

    this.setState({loading: true})


    var apiRequestDig = fetch("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json").then(function(response){

        return response.json()

    });

    var apiRequestNews = fetch("https://newsapi.org/v2/sources?apiKey=dddbf940ede9423ba8a56f1e95346f3b").then(function(response){

      return response.json()

    })

    var apiREquestBuzzFeed = fetch("https://accesscontrolalloworiginall.herokuapp.com/https://www.buzzfeed.com/api/v2/feeds/index").then(function(response){

      return response.json()

    })



    var combinedData = {"apiRequestDig":{},"apiRequestNews":{}, "apiREquestBuzzFeed":{}};

    Promise.all([apiRequestDig,apiRequestNews,apiREquestBuzzFeed]).then(function(values){
        combinedData["apiRequestDig"] = values[0];
        combinedData["apiRequestNews"] = values[1];
        combinedData["apiREquestBuzzFeed"] = values[2];
        return combinedData;
    });


    console.log(combinedData)


    fetch("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json")
    .then(results => results.json())
    .then(results => {
      let articles = results.data.feed.map(article => {
        return {
          title: article.content.title_alt,
          image: article.content.media.images[0].url,
          category: article.content.tags[0].name,
          count: article.digg_score,
          description: article.content.description,
          url: article.content.url
        }
      })
      // console.log(articles);

      this.setState({
        articles: articles,
        loading: "none"

        })

      // console.log(this.state);
    })
  }


  togglePopup(title,description,url){
    this.setState({
      popup:true,
      details: {title:title,
                description:description,
                url:url}
    })
  }

  handleClose(){

    this.setState({
      popup:"none"

    })

  }


  render() {
    // console.log(this.state)
    return (<div className="App">
      <div>
        <header>
          <section className="container">
            <a href="#">
              <h1>Feedr</h1>
            </a>
            <nav>
              <ul>
                <li>
                  <a href="#">News Source:
                    <span>ALL</span>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Digg</a>
                    </li>
                    <li>
                      <a href="#">NEWS</a>
                    </li>
                    <li>
                      <a href="#">Buzzfeed</a>
                    </li>
                  </ul>
                </li>
              </ul>
              <section id="search">
                <input type="text" name="name" value=""/>
                <a href="#"><img src="images/search.png" alt=""/></a>
              </section>
            </nav>
            <div className="clearfix"></div>
          </section>
        </header>
        <div className="loader" style={{display: this.state.loading}}></div>
        <div className="popUp" style={{
            display: this.state.popup
          }}>
          <a href="#" onClick={this.handleClose} className="closePopUp">X</a>
          <div className="container">
            <h1>{this.state.details.title}</h1>
            <p>
              {this.state.details.description}
            </p>
            <a href={this.state.details.url} className="popUpAction" target="_blank">Read more from source</a>
          </div>
        </div>
        <section id="main" className="container">
          { this.state.articles.map(article => {
              return (<Article
                image = {article.image}
                title = {article.title}
                category = {article.category}
                count = {article.count}
                description = {article.description}
                url = {article.url}
                showPopup = {this.togglePopup}
              />)

            })
          }
        </section>
      </div>

    </div>);
  }
}

export default App;
