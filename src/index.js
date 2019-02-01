import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import myStore from './store'

const listOfContacts = [{ id: 55, name: 'Karim' }, { id: 66, name: 'Fares' }]

const Contact = props => (
  <div key={props.contact.id}>
    {props.contact.name}
    <input
      type="button"
      value="X"
      onClick={() => props.onDelete(props.contact.id)}
    />
  </div>
)

const ConnectedContact = connect(
  null,
  dispatch => {
    return {
      onDelete: id => {
        dispatch({
          type: 'DELETE_CONTACT',
          idToDelete: id
        })
      }
    }
  }
)(Contact)

const ContactList = props => (
  <div>
    {props.list.map(el => (
      <ConnectedContact contact={el} />
    ))}
  </div>
)

const mapStateToProps = state => {
  return {
    list: state.contacts.filter(el =>
      el.name.includes(state.filter)
    )
  }
}

const ConnectedContactList = connect(mapStateToProps)(ContactList)

const SearchBar = props => (
  <div>
    <input
      type="text"
      value={props.textFilter}
      onChange={event => {
        props.onChangeFilter(event.target.value)
      }}
    />
  </div>
)

const mapStateToProps2 = state => {
  return { textFilter: state.filter }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeFilter: newValue => {
      dispatch({
        type: 'SET_FILTER',
        newFilter: newValue
      })
    }
  }
}

const ConnectedSearchBar = connect(
  mapStateToProps2,
  mapDispatchToProps
)(SearchBar)

const App = () => (
  <div>
    <h1>Contacts by GMC</h1>
    <ConnectedSearchBar />
    <ConnectedContactList />
  </div>
)

ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
