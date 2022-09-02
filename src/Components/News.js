import { Component } from "react";
import NewsItems from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
  }

  static defaultProps = {
    country: "in",
    pageSize: 15,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  async updateNews(pageNo) {
    this.props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${pageNo}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let jsonData = await data.json();
    this.props.setProgress(70);
    // console.log(jsonData);
    this.setState({
      articles: jsonData.articles,
      totalResults: jsonData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=91367dbca3854177b8b02d21aebca4c0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let jsonData = await data.json();
    // // console.log(jsonData);
    // this.setState({
    //   articles : jsonData.articles,
    //   totalResults: jsonData.totalResults,
    //   loading: false
    // })
    this.updateNews(this.state.page);
  }

  handleNextClick = async () => {
    // console.log(this.state.totalResult);
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=91367dbca3854177b8b02d21aebca4c0&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({
    //     loading: true
    //   })
    //   let data = await fetch(url);
    //   let jsonData = await data.json();

    //   this.setState({
    //     page : this.state.page + 1,
    //     articles : jsonData.articles,
    //     loading : false
    //   });
    this.setState({
      page: ++this.state.page,
      loading: true,
    });
    // console.log(this.state.page);
    this.updateNews(this.state.page);
  };
  handlePreviousClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=91367dbca3854177b8b02d21aebca4c0&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading : true
    // })
    // let data = await fetch(url);
    // let jsonData = await data.json();

    // this.setState({
    //   page : this.state.page - 1,
    //   articles : jsonData.articles,
    //   loading : false
    // })
    this.setState({
      page: --this.state.page,
      loading: true,
    });

    this.updateNews(this.state.page);
  };

  fetchMoreData = async () =>{
    this.setState({page: ++this.state.page});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let jsonData = await data.json();
    // console.log(jsonData);
    this.setState({
      articles: this.state.articles.concat(jsonData.articles),
      totalResults: jsonData.totalResults,
      // loading: false,
    });
  }

  render() {
    // 91367dbca3854177b8b02d21aebca4c0
    return (
      <>
        {/* <div className="container my-4">
          <h2>News App - To Headling</h2>
          {this.state.loading && <Spinner/>}
          <div className="row mt-3">
            {!this.state.loading && this.state.articles.map((element) => {
              return <div className="col-md-4 my-2"  key={element.url}>
                        <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl = {element.urlToImage ? element.urlToImage : "https://www.pinkvilla.com/files/styles/fbimagesection/public/liger_vijay_deverakonda_ananya_panday_live_updates.jpg?itok=nS934czB" } urlNews = {element.url} author={element.author ? element.author : "Unknow"} publishDate={element.publishedAt}/>
                    </div>;
            })}
          </div> */}
        {/* <div className="d-flex justify-content-between mt-2">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-info" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-info" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
        {/* </div> */}
        {/* Infinite scroll  */}
        <div style={{marginTop: "70px"}}>
          <h2 className="mt-3 text-center">News App - To Headling</h2>
        </div>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          style={{ height: 'auto', overflow: 'none' }}
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container mt-4">
            <div className="row">
              {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItems
                        title={element.title ? element.title : ""}
                        description={
                          element.description ? element.description : ""
                        }
                        imgUrl={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://www.pinkvilla.com/files/styles/fbimagesection/public/liger_vijay_deverakonda_ananya_panday_live_updates.jpg?itok=nS934czB"
                        }
                        urlNews={element.url}
                        author={element.author ? element.author : "Unknow"}
                        publishDate={element.publishedAt}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
