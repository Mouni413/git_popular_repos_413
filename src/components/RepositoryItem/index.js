// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoItem} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = repoItem
  return (
    <li className="repo-item">
      <img src={avatarUrl} className="avatar-img" alt={name} />
      <h1 className="repo-name">{name}</h1>
      <div className="star-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stars"
        />
        <p className="stars-des">{starsCount} stars</p>
      </div>
      <div className="star-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stars"
        />
        <p className="stars-des">{forksCount} forks</p>
      </div>
      <div className="star-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stars"
        />
        <p className="stars-des">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
