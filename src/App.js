
import React,{useState,useCallback,setTheArray} from 'react';
import SearchBar from './Components/SearchBar';
import './App.css';
import axios from 'axios';
import ImageList from './Components/ImageList'; 
// import LoadMore from './Components/LoadMore';

const API_KEY = process.env.REACT_APP_API_KEY;

export default class App extends React.Component {

  state={ 
    page:1,
    images:[],
    isLoading: false,
    errorMsg:'',
    text:''
   }
  


   handleCallback = (childData) =>{
    this.setState({text: childData});
    console.log(this.state.text);
}



  onSearchSubmit= async (term) => {
   

     const response= await axios.get('https://api.unsplash.com/search/photos',{
       params: {query: term},
       headers: {
         Authorization: `Client-ID ${API_KEY}`
       }
     });

     this.setState((prevState)=>({ ...prevState,images: response.data.results,text:term }));

     console.log(response.data.results);
     console.log(this.state);
 }



  loadImages = async() => {
   console.log('load more');
   
  /*  this.setState({page: this.setState.page+1});

    this.setState({isLoading:true});
     */

    console.log(this.state);

     const response= await axios.get('https://api.unsplash.com/search/photos',{
      params: {query: this.state.text,page:this.state.page+1},
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      }}); 

      this.setState((prevState) => ({ images: [...prevState.images, ...response.data.results], errorMsg: '',isLoading: false,page:prevState.page+1}));
    /*   axios.get('https://api.unsplash.com/search/photos/'+API_KEY+term)
      .then(response => { 
        
      })
      .catch(()=>{ this.setState({errorMsg: 'Error while loading data.Try again later.'}) 
      }); */

  };

 
/*   loadMore = () => {
      this.setState((prevState) => ({page: prevState.page + 1}));
  } */

  

  render(){

     // const {isLoading, errorMsg}=this.state;

      return (
        <div className="App">
            <SearchBar userSubmit={this.onSearchSubmit}  parentCallback = {this.handleCallback}/> 

            <span>{this.state.images.length} images has been found</span> 

            <ImageList foundImages={this.state.images}/>

            {
              this.state.errorMsg && <p className="errorMsg">{this.state.errorMsg}</p>
            }

            {/* const {text}= this.state.text; */}

            <div className="load-more">
                <button className="btn-search load" type="submit" onClick={this.loadImages}>
                  { this.state.isLoading ? 'Loading...' : 'Load More'}
                </button>
            </div>

        </div>
      );
  }

}

