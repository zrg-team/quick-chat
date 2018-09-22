import React from 'react'
import moment from 'moment'
// import getWeb3 from '../common/utils/web3'
// import { ABI, SMART_CONTRACT_ADDRESS } from '../common/models'

export default class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      round: 0,
      totalPrize: 0,
      totalTokenPrize: 0,
      startTime: 0,
      totalPlayer: 0,
      totalTicket: 0
    }
    this.web3 = null
    this.contractInstance = null
    this.finish = this.finish.bind(this)
  }

  finish () {
    const { ContractInstance } = this.state
    if (ContractInstance) {
      ContractInstance.randaoFinish({}, {
        gas: 300000,
        from: this.web3.eth.accounts[0],
        value: 0
      }, (err, result) => {
        this.setState({
          selected: undefined
        })
      })
    }
  }

  async componentWillMount () {
    // function onScroll () {
    //   const navbar = document.getElementById('myNavbar')
    //   if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    //     navbar.className = 'w3-bar' + ' w3-card' + ' w3-animate-top' + ' w3-white w3-text-dark-gray'
    //   } else {
    //     navbar.className = navbar.className.replace(' w3-card w3-animate-top w3-white w3-text-dark-gray', ' w3-text-white')
    //   }
    // }
    // if (process.browser) {
    //   window.onscroll = function () { onScroll() }
    //   try {
    //     this.web3 = await getWeb3()
    //     const MyContract = this.web3.eth.contract(ABI)
    //     this.contractInstance = MyContract.at(SMART_CONTRACT_ADDRESS)

    //     this.updateState()
    //     setInterval(this.updateState.bind(this), 10e3)
    //   } catch (err) {
    //     console.error(err)
    //   }
    // }
  }

  updateState () {
    if (!this.contractInstance) {
      return false
    }
    this.contractInstance.round((err, result) => {
      if (result != null) {
        const round = result.toNumber()
        this.setState({
          round
        })
        this.contractInstance.getRoundPrize(round, (err, result) => {
          if (result != null) {
            this.setState({
              totalPrize: parseFloat(this.web3.fromWei(result[0], 'ether')),
              totalTokenPrize: parseFloat(this.web3.fromWei(result[1], 'ether'))
            })
          }
        })
        this.contractInstance.getRoundInformation(round, (err, result) => {
          if (result != null) {
            this.setState({
              startTime: result[1].toNumber()
            })
          }
        })
        this.contractInstance.getRoundCountInformation(round, (err, result) => {
          if (result != null) {
            this.setState({
              totalPlayer: result[1].toNumber(),
              totalTicket: result[2].toNumber()
            })
          }
        })
      }
    })
  }

  render () {
    const {
      round,
      totalPrize,
      totalTokenPrize,
      startTime,
      totalPlayer,
      totalTicket } = this.state

    return (
      <div className='index-background'>
        <div key='top-image' className='bgimg-1 w3-display-container' id='home'>
          <div className='w3-display-middle' style={{whiteSpace: 'nowrap'}}>
            <img src={require('../assets/images/casino-logo.png')} className='w3-image w3-center w3-padding-large w3-xlarge w3-wide w3-animate-zoom' alt='Photo of logo' />
          </div>
        </div>
        <div key='top-content' className='w3-content w3-container w3-padding-64' id='about'>
          <h3 className='w3-center'>BLOCK CASINO</h3>
          <p className='w3-center'><em>Innovating Truly Fair Play Powered by Blockchain</em></p>
          <p>It is questionable if traditional lotteries provide for fair play.
          Code audit show that most blockchain lotteries are either centralized or designed so that their creators hold the right to use the prize pool.
          Fire Lotto is built on the Ethereum blockchain and uses a secure Random Number Generator based on the Bitcoin decentralized protocol.
          The program code is available for inspection.</p>
          <div className='w3-row'>
            <div className='w3-col m6 w3-center w3-padding-large'>
              <p><b><i className='fa fa-user w3-margin-right' />EASY TO USE</b></p><br />
              <img src={require('../assets/images/bigwin.png')} className='w3-round w3-image w3-hover-opacity-off' alt='Photo of Me' width='280' height='260' />
            </div>
            <div className='w3-col m6 w3-hide-small w3-padding-large w3-padding-64 w3-margin-top'>
              <div className='w3-card-4 w3-white w3-padding-large w3-margin-top'>
                <p>Most blockchain lotteries have difficult interfaces.<br />
                  While designing Block Casino, we made sure that it would be easy to use <br /> even for those with only basic computer skills.<br />
                  We have developed an unique one-click buying mechanism which is fast, convenient and secure.</p>
              </div>
            </div>
          </div>
        </div>
        <div key='addition-content' className='w3-row w3-center w3-padding-16 display-flex w3-text-white'>
          <div className='w3-col s4 w3-section color1 w3-padding-large w3-text-white information-block'>
            <span className='w3-xlarge w3-text-sand'>Price</span><br />
            0.003 ETH (~2 USD)
            <br />
            Player purchases a ticket.
          </div>
          <div className='w3-col s4 w3-section color2 w3-padding-large w3-text-white information-block'>
            <span className='w3-xlarge w3-text-sand'>Prize</span><br />
            The prize pool is funded by ticket sales
            <br />
            and last round fund.
          </div>
          <div className='w3-col s4 w3-section color3 w3-padding-large w3-text-white information-block'>
            <span className='w3-xlarge w3-text-sand'>Payouts</span><br />
            The winners can redeem their prize to
            <br />
            their cryptocurrency wallets everytime.
          </div>
        </div>
        <div key='middle-image' className='bgimg-2 w3-display-container w3-opacity-min'>
          <div className='w3-display-middle'>
            <div className='w3-card-4 w3-white'>
              <div className='w3-container w3-center w3-padding-large'>
                <span className='w3-xxlarge w3-text-pink w3-wide '>LET PLAY ROUND {round}</span>
                <p>Start From : <span className='w3-text-khaki'>{ moment.unix(startTime).fromNow() }</span></p>
                <p>Number of Players : <span className='w3-badge w3-green'>{ totalPlayer }</span></p>
                <p>Total Prize : <span className='w3-badge w3-indigo'>{ totalPrize }</span> <span className='w3-text-indigo'>ETH</span></p>
                <p>Total Prize Tokens  : <span className='w3-badge w3-pink'>{ totalTokenPrize }</span> <span className='w3-text-pink'>OPENLT</span></p>
                <p>Total Ticket : <span className='w3-badge w3-blue'>{ totalTicket }</span></p>
                <p>Start Time : <span className='w3-text-khaki'>{ moment.unix(startTime).format('MMMM Do YYYY, h:mm:ss a') }</span></p>
              </div>
            </div>
          </div>
        </div>
        <div key='end-content' className='w3-content w3-container w3-padding-64' id='portfolio'>
          <p className='w3-center'><em>Enough talking ! At current<br /> You free to play on ropsten testnet </em></p><br />
          <div onClick={this.finish}> Finish Row </div>
        </div>
      </div>
    )
  }
}
