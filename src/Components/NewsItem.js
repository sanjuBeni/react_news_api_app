import { Component } from "react";

export default class NewsItems extends Component {
  render() {
    let { title, description,imgUrl, urlNews, author,publishDate} = this.props;
    return (
      <>
        <div className="card" style={{ width: "18rem" }}>
          <img src={imgUrl} className="card-img-top" alt="..." width={200} height={200} />
          <div className="card-body">
            <h5 className="card-title">{title.slice(0,40)}...</h5>
            <p className="card-text">
              {description.slice(0,70)}...
            </p>
            <p className="card-text"><small className="text-muted">By {author} on {new Date(publishDate).toGMTString()}</small></p>
            <a rel="noreferrer" href={urlNews} target="_blank" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </>
    );
  }
}
