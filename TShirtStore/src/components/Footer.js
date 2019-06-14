import React ,{Component} from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components';


export default class Footer extends Component{

    render(){
        return(

            <FooterContainer className="test">



                <section id="footer">
                    <div class="container">
                        <div class="row text-center p-5">
                            <div class="col-sm-2">
                            <span><i className="fab fa-twitter-square fa-2x"></i></span>                            
                            </div>
                            <div class="col-sm-2">
                            <span><i className="fab fa-facebook-square fa-2x"></i></span>
                            </div>
                            <div class="col-sm-2">   
                            <span><i class="fab fa-instagram fa-2x"></i></span>                          
                            </div>
                            <div class="col-sm-2">
                            <span><i className="fab fa-vimeo-square fa-2x"></i></span>
                            </div>
                            <div class="col-sm-2">   
                            <span><i class="fab fa-pinterest fa-2x"></i></span>                          
                            </div>
                            <div class="col-sm-2">
                            <span><i className="fab fa-youtube-square fa-2x"></i></span>
                            </div>
          
                        </div>

                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                                <p><u><Link to="">TShirt Shop</Link></u> is a Registered Retailer.</p>
                                <p class="h6">&copy; All right Reversed. 2019 <Link to="">TShirt Shop</Link></p>
                            </div>
                        </div>	
                    </div>
                </section>

                
                  
            </FooterContainer>

        );
    }

}
const FooterContainer = styled.div `

    background: var(--mainBlue);
    margin-bottom:0rem;
    .i {
        background:var(--mainWhite);
    }


`;