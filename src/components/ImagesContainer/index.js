import ImagesListItem from '../ImagesListItem'

import './index.css'

const ImagesDisplayContainer = (props) => {
  const {imagesList} = props;
  return (
    <ul className="images-list-container">
      {imagesList.map(each => (
        <ImagesListItem key={each.id} imageDetails={each} />
      ))}
    </ul>
  )
}

export default ImagesDisplayContainer
