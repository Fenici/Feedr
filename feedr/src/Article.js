import React, {Component} from 'react'
import Popup from './Popup.js'


class Articles extends Component {
  constructor(props) {
    super(props)


    this.handleClick = this.handleClick.bind(this)
  }

handleClick(){

  this.props.showPopup(this.props.title,this.props.description,this.props.url) 

}

  render() {
    return (<article className="article">
      <section className="featuredImage">
        <img src={this.props.image} alt=""/>
      </section>
      <section className="articleContent">
        <a href="#" onClick={this.handleClick}>
          <h3>{this.props.title} </h3>
        </a>
        <h6>{this.props.category}</h6>
      </section>
      <section className="impressions">
        {this.props.count}
      </section>

      <div className="clearfix"></div>
    </article>)

  }

}

export default Articles
