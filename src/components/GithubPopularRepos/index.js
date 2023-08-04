import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apistatusContants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activetab: languageFiltersData[0].id,
    apistatus: apistatusContants.loading,
    reposlist: [],
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    const {activetab} = this.state
    this.setState({apistatus: apistatusContants.loading})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activetab}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        reposlist: updatedData,
        apistatus: apistatusContants.success,
      })
    } else {
      this.setState({apistatus: apistatusContants.failure})
    }
  }

  renderReposList = () => {
    const {reposlist} = this.state
    return (
      <ul className="repos-container">
        {reposlist.map(eachItem => (
          <RepositoryItem key={eachItem.id} repoItem={eachItem} />
        ))}
      </ul>
    )
  }

  renederLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt=" failure view"
        className="failure-img"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  onClickTabItem = id => {
    this.setState({activetab: id}, this.getRepos)
  }

  renderStatus = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apistatusContants.loading:
        return this.renederLoader()
      case apistatusContants.success:
        return this.renderReposList()
      case apistatusContants.failure:
        return this.renderFailureView()

      default:
        return ''
    }
  }

  render() {
    const {activetab} = this.state
    return (
      <div className="git-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="tabs-contianer">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              key={eachLanguage.id}
              languageItem={eachLanguage}
              isActive={activetab === eachLanguage.id}
              onClickTabItem={this.onClickTabItem}
            />
          ))}
        </ul>
        {this.renderStatus()}
      </div>
    )
  }
}
export default GithubPopularRepos
