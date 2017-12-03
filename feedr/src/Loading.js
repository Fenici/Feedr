import React, {Component} from 'react'

class Loading extends Component {
  constructor(props) {

    super(props)
    this.state = {

      loading: false

    }
  }

  render() {

    return (if (this.state.loading) {
        
      <div>
        <div className="loader" style={{}}></div>
      </div>)
    }
  }

}

export default Loading
