import React from 'react';
import './SearchBar.css'


class SearchBar extends React.Component {

    state={ val : '' }

    onInputChange = (event) => {
        this.setState({val:event.target.value});
        console.log(this.state.val);
      /*   if(event.charCode===13)
        {
            console.log(this.state.val);
            this.props.parentCallback(this.state.val);
        } */
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        let searchItem=document.querySelector('.inputStyle').value;
      //  console.log('this.value '+searchItem.value);
        this.props.userSubmit(searchItem);
    }

    
  /*   onTrigger = () => {
        this.props.parentCallback(this.state.val);
      }; */

    render() {
    return (
     
        <div className="container1">

            <div className="container">

                <div className="row text-center">

                    <div className="form">

                        <form className="flex container" onSubmit={this.onFormSubmit}>

                            <br/>

                            <input className="inputStyle" type="text" placeholder="Search for Photos"  onKeyPress={this.onInputChange}/>


                            <button type="submit" className="btn-search"><i className="bi bi-search"></i></button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
        
    )
}
}

export default SearchBar;
 