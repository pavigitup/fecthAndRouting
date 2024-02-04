import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemDetails extends Component {
  state = {blogData: {}, isLoader: true}

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    console.log(match)

    const {params} = match
    const {id} = params
    console.log(id)

    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    const updatedData = {
      id: data.id,
      author: data.author,
      title: data.title,
      topic: data.topic,
      content: data.content,
      imageUrl: data.image_url,
      avatarUrl: data.avatar_url,
    }
    this.setState({blogData: updatedData, isLoader: false})
  }

  renderBlogItemDetails = () => {
    const {blogData} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogData
    return (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    const {isLoader} = this.state
    return (
      <>
        {isLoader ? (
          <div className="loader">
            <Loader type="ThreeDots" color="#11B11F" height={100} width={100} />
          </div>
        ) : (
          <div className="blog-container">{this.renderBlogItemDetails()}</div>
        )}
      </>
    )
  }
}

export default BlogItemDetails
