import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'

class AccountContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      filteredTransactions: [],
      searchTerm: ''
    }
  }

  componentDidMount = () => {
    fetch('https://boiling-brook-94902.herokuapp.com/transactions')
    .then(response => response.json())
    .then(transactions => this.setState({
      transactions: transactions,
      filteredTransactions: transactions
    }))
  }

  handleChange = (event) => {
    const {value} = event.target
    this.setState({searchTerm:value})
    this.searchTransactions()
  }

  searchTransactions = () => {
    const {transactions, searchTerm} = this.state
    const searchQuery = transactions.filter(transaction => {
      return transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) || transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    })
    this.setState({filteredTransactions:searchQuery})

    if (searchTerm === ''){
      this.setState({filteredTransactions: transactions})
    }
  }

  render() {
    const {filteredTransactions} = this.state
      return (
        <div>
          <Search handleChange={this.handleChange}/>
          <TransactionsList filteredTransactions={filteredTransactions} />
        </div>
      )
    }
  }

export default AccountContainer
