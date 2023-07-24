import './index.css'

const TabItem = (props) => {
  const {tabItemDetails, tabSelect, tabId, onChangingTabItem} = props;
  const {tabName} = tabItemDetails
  const tabItemClassName = tabSelect ? 'tab-button select' : 'tab-button'
  const onClickingTabItem = () => {
    onChangingTabItem(tabId)
  }
  return (
    <li className="tab-item-container" onClick={onClickingTabItem}>
      <button className={tabItemClassName} type="button">
        {tabName}
      </button>
    </li>
  )
}

export default TabItem
