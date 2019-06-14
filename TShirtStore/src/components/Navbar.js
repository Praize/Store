import React ,{Component} from 'react'
import {Link} from 'react-router-dom';
import logo from '../images/tShirt-shopping.png';
import {ButtonContainer} from './Button';
import styled from 'styled-components';
import axios from 'axios';
import Suggestions from './Suggestions';
import {LoginSignin} from './moreStyle';
import SignIn from './SignIn';


const { API_KEY } = process.env
const API_URL = 'http://api.musicgraph.com/api/v2/artist/suggest'

export default class Navbar extends Component{
    
    state = {
        query: '',
        results: []
      }
    
      getInfo = () => {
        axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=7`)
          .then(({ data }) => {
            this.setState({
              results: data.data
            })
          })
      }
    
      handleInputChange = () => {
        this.setState({
          query: this.search.value
        }, () => {
          if (this.state.query && this.state.query.length > 1) {
            if (this.state.query.length % 2 === 0) {
              this.getInfo()
              console.log("see");

            }
          } else if (!this.state.query) {
              console.log("nothing");
          }
        })
      }


    render(){
        return(
          <React.Fragment>
          <NavWrapper  className="navbar navbar-expand-sm  navbar-dark px-sm-5 ">

                {/* 
                https://www.iconfinder.com/icons/1243689/call_phone_icon
                Creative Commons (Attribution 3.0 Unported);
                https://www.iconfinder.com/Makoto_msk */}

              <Link to="/" >
                  <img src={logo} alt="store" className="navbar-brand"/>
              </Link>

              <ul className="navbar-nav align-items-center">
                  <Link to="/" className="nav-link">
                        Product
                  </Link>
              </ul>


        <searchContainer class="d-flex justify-content-center h-100">

          <div class="searchbar">
                <input className="search_input" type="text" name="" placeholder="Search Product..." ref={input => this.search = input}
                      onChange={this.handleInputChange}/>
                <span><i className="fas fa-search"></i></span>
                <Suggestions results={this.state.results} />
          </div>

        </searchContainer>
 
              <div className="ml-50">
                  <Link to="/cart" className="ml-auto">
                      <LoginSignin onClick={()=>{
                              console.log("Login");
                      }}>
                      <span><i className="fas fa-sign-in-alt" alt="login"></i></span>
                      login
                      </LoginSignin>
                      
                
                  </Link>
                  <Link to="/cart" className="ml-4">
                      <LoginSignin onClick={()=>{
                              console.log("Register");
                      }}>
                        <span><i className="fas fa-sign-out-alt" alt="sign up"></i></span>
                        register
                        
                      </LoginSignin>

                  </Link>


              </div>
              
              <Link to="/cart" className="ml-auto">
                  <ButtonContainer>
                    <span className="mr-2"><i className="fas fa-cart-plus"></i></span>
                    my cart
                  </ButtonContainer>

              </Link>
              
          </NavWrapper>
          



                


          </React.Fragment>
        )
    }
}


const NavWrapper = styled.nav `
     background: var(--mainBlue);
     .nav-link{
         color: var(--mainWhite) !important;
        font-size:1.3rem;
        text-transform: capitalize !important;
    }

     .searchbar {
      margin-bottom: auto;
      margin-top: auto;
      height: 60px;
      background-color: var(--mainWhite);
      border-radius: 30px;
      padding: 10px;
      
      }
  
      .search_input{
      color: #000;
      border: 0;
      outline: 0;
      background: none;
      width: 0;
      caret-color:transparent;
      line-height: 40px;
      transition: width 0.4s linear;
      }
      .searchbar:hover > .search_input{
          padding: 0 10px;
          width: 450px;
          caret-color:red;
          transition: width 0.4s linear;
          }
      
          .searchbar:hover > .search_icon{
          background: white;
          color: #e74c3c;
          }
          .search_icon{
              height: 40px;
              width: 40px;
              float: right;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              color:white;
              } 
  
`;
 