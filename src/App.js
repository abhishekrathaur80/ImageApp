import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import NavTab from "./components/NavTab";
import ImagesContainer from "./components/ImagesContainer";
import "./App.css";

const tabItemsList = [
  {
    id: "mountain",
    tabName: "Mountain",
  },
  {
    id: "flowers",
    tabName: "Flowers",
  },
  {
    id: "beaches",
    tabName: "Beaches",
  },
  {
    id: "cities",
    tabName: "Cities",
  },
];

const App = () => {
  const [imagesData, setImagesData] = useState([]);
  const [activeTabId, setActiveTabId] = useState("mountain");
  const [searchInput, setSearchInput] = useState("");
  const [activeState, setActiveState] = useState("Mountain");
  const [isLoading, setIsLoading] = useState(false);
  const [pageNavigateLeft, setPageNavigateLeft] = useState(false);
  const [pageNavigateRight, setPageNavigateRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dataSize, setDataSize] = useState(2);

  useEffect(() => {
    getImagesData();
  }, [activeState]);

  const getImagesData = async () => {
    setIsLoading(true);
    const apiUrl = `https://api.unsplash.com/search/collections/?query=${activeState}&client_id=gHnKY0t9jaQdZ1SOJHlP5X58hiEGCfSo47zAo229sCU`;

    const options = {
      method: "GET",
    };
    const response = await fetch(apiUrl, options);
    const jsonData = await response.json();
    const photosCollectionsData = jsonData.results.map((eachCollection) => ({
      id: eachCollection.id,
      title: eachCollection.title,
      previewPhotos: eachCollection.preview_photos,
      description: eachCollection.cover_photo.alt_description,
      height: eachCollection.cover_photo.height,
      likes: eachCollection.cover_photo.likes,
      name: eachCollection.cover_photo.user.name,
      location: eachCollection.cover_photo.user.location,
    }));
    setImagesData(photosCollectionsData);
    setIsLoading(false);
  };

  const onChangingTabItem = (id) => {
    setActiveTabId(id);
    setActiveState(id.charAt(0).toUpperCase() + id.slice(1).toLowerCase());
  };

  const onClickingSearchButton = () => {
    setActiveState(
      searchInput.charAt(0).toUpperCase() + searchInput.slice(1).toLowerCase()
    );
    setActiveTabId("");
    setSearchInput("");
  };

  const checkPaginationValidator = () => {
    if (currentIndex > 0 && dataSize < imagesData.length) {
      setPageNavigateLeft(true);
      setPageNavigateRight(true);
    } else if (currentIndex === 0 && dataSize < imagesData.length) {
      setPageNavigateLeft(false);
      setPageNavigateRight(true);
    } else if (currentIndex > 0 && dataSize > imagesData.length) {
      setPageNavigateLeft(true);
      setPageNavigateRight(false);
      setCurrentIndex((prevIndex) => prevIndex - 2);
      setDataSize((prevDataSize) => prevDataSize - 2);
    }
  };

  const onClickingNextButton = () => {
    setCurrentIndex((prevIndex) => prevIndex + 2);
    setDataSize((prevDataSize) => prevDataSize + 2);
    checkPaginationValidator();
  };

  const onClickingPrevButton = () => {
    setCurrentIndex((prevIndex) => prevIndex - 2);
    setDataSize((prevDataSize) => prevDataSize - 2);
    checkPaginationValidator();
  };

  const navigatedData = imagesData.slice(currentIndex, dataSize);

  return (
    <div className="app-container">
      <div className="content-container">
        <img
          src="https://media.licdn.com/dms/image/C560BAQGnZlUHAASEvw/company-logo_200_200/0/1669653906405?e=1697673600&v=beta&t=D0_aJFUJFuEbGSr1JLScYrh1tYbOUCKo-BL1lEZGYu8"
          alt="logo"
          className="website-logo"
        />
        <div className="search-box-container">
          <input
            type="search"
            placeholder="Search by title"
            className="search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="search-icon-container"
            onClick={onClickingSearchButton}
            type="button"
          >
            <FiSearch style={{ color: "darkblue" }} />
          </button>
        </div>
        <ul className="tab-list-container">
          {tabItemsList.map((tabItem) => (
            <NavTab
              key={tabItem.id}
              tabItemDetails={tabItem}
              tabSelect={activeTabId === tabItem.id}
              tabId={tabItem.id}
              onChangingTabItem={onChangingTabItem}
            />
          ))}
        </ul>
        <div className="current-state-container">
          <h1 className="active-state">{activeState}</h1>
        </div>
        <hr className="hr-line" />
        {isLoading ? (
          <div className="shimmer-spinner-container">
            <div className="shimmer-spinner">{}</div>
          </div>
        ) : (
          <ImagesContainer imagesList={navigatedData} />
        )}
      </div>
      <div className="pagination-container">
        {pageNavigateLeft ? (
          <button
            type="button"
            className="active-btn"
            onClick={onClickingPrevButton}
          >
            Prev
          </button>
        ) : (
          <button type="button" className="static-btn">
            Prev
          </button>
        )}
        {pageNavigateRight ? (
          <button
            type="button"
            className="active-btn"
            onClick={onClickingNextButton}
          >
            Next
          </button>
        ) : (
          <button type="button" className="static-btn">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
