// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageItem, isActive, onClickTabItem} = props
  const {language} = languageItem
  const tabClassName = isActive ? 'active-tab' : 'normal-tab'
  const onClickTab = () => {
    onClickTabItem(languageItem.id)
  }
  return (
    <button className={tabClassName} onClick={onClickTab} type="button">
      {language}
    </button>
  )
}

export default LanguageFilterItem
