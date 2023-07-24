import './index.css'

const ImagesListItem = (props) => {
  const {imageDetails} = props
  const {
    previewPhotos,
    description,
    likes,
    name,
    location,
    title,
  } = imageDetails
  return (
    <li className="image-list-item">
      {previewPhotos.map(each => {
        const {urls, id} = each;
        return (
          <div className="image-container">
            <img src={urls.thumb} className="image" key={id} alt="thumbnail" />
            <div className="popup">
              <h1 className="popup-name">
                {title.charAt(0).toUpperCase() + title.slice(1).toUpperCase()}
              </h1>
              <p>
                Description: <span className="value">{description}</span>
              </p>
              <p>
                Likes: <span className="value">{likes}</span>
              </p>
              <p>
                Photographer Name: <span className="value">{name}</span>
              </p>
              <p>
                Location: <span className="value">{location}</span>
              </p>
            </div>
          </div>
        )
      })}
    </li>
  )
}

export default ImagesListItem
