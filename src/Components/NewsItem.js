import { Component } from "react";

export default class NewsItems extends Component {
  render() {
    let { title, description,imgUrl, urlNews} = this.props;
    return (
      <>
        <div className="card" style={{ width: "18rem" }}>
          <img src={imgUrl} className="card-img-top" alt="..." width={200} height={200} />
          <div className="card-body">
            <h5 className="card-title">{title.slice(0,40)}...</h5>
            <p className="card-text">
              {description.slice(0,70)}...
            </p>
            <a href={urlNews} target="_blank" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </>
    );
  }
}
