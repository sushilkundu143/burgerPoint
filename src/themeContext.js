import React, { PureComponent } from "react"
import PropTypes from 'prop-types'


const { Provider, Consumer } = React.createContext()

class ThemeContextProvider extends PureComponent {
  constructor(){
    super()
    this.state = {
      status: {}
    }
  }
  
updateValue = (val) => {
  console.log('update state with new value:', val)
  if(Object.keys(val).length > 0) {
   this.setState(prevState => { 
     return {status: val}
    })
  }
}
  render() {
    console.log('status:', this.state.status)
    return (
      <Provider value={{status: this.state.status, updateValue: this.updateValue}}>
        {this.state && this.props.children}
      </Provider>
    );
  }
}

ThemeContextProvider.propTypes = {
  status: PropTypes.object
}

export { ThemeContextProvider, Consumer as ThemeContextConsumer}
