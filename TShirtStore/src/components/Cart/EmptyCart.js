import React ,{Component} from 'react'
//import nothing from 'src/nothing';
import Title from '../Title';
import CartColumns from '../CartColumns';

export default class EmptyCart extends Component{

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-title"> 
                         <h1>your cart is currently empty</h1>
                    </div>
                </div>
            </div>

        )
    }
}
