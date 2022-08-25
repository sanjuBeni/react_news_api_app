import { Component } from "react";
import NewsItems from "./NewsItem";

export default class News extends Component {
  articles = [];
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
    };
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=91367dbca3854177b8b02d21aebca4c0";
    let data = await fetch(url);
    let jsonData = await data.json();
    console.log(jsonData);
    this.setState({
      articles : jsonData.articles
    })
  }

  render() {
    // 91367dbca3854177b8b02d21aebca4c0
    return (
      <>
        <div className="container my-4">
          <h2>News App - To Headling</h2>
          <div className="row mt-3">
            {this.state.articles.map((element) => {
              return <div className="col-md-4 my-2">
                        <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl = {element.urlToImage ? element.urlToImage : "https://www.pinkvilla.com/files/styles/fbimagesection/public/liger_vijay_deverakonda_ananya_panday_live_updates.jpg?itok=nS934czB" } urlNews = {element.url}/>
                    </div>;
            })}
          </div>
        </div>
      </>
    );
  }
}
