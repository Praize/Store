import React, {Component} from 'react';
import {storeProducts,detailProduct} from './data';
import Cart from './components/Cart/Cart';

const ProductContext = React.createContext();
//Provider
//Consumer
 class ProductProvider extends Component{
     state = {
         product: [],
         detailProduct: detailProduct,
         cart:[],
         modalOpen:false,
         modalProduct:detailProduct,
         cartSubtotal:0,
         cartTax:0,
         cartTotal:0,
         openLogin:false
     };
     componentDidMount(){
         this.setProducts();
     }
     //setting product to retrieve  products in arry
     setProducts = () =>{
        let tempProduct = [];
        storeProducts.forEach(item =>{
            const singleItem = {...item};
            tempProduct = [...tempProduct,singleItem];
        })
        this.setState(() =>{
             return {product : tempProduct}
        });
     };
     getItem = id =>{
         const product = this.state.product.find(item => item.id === id);//later to change 
         return product;
     }
     //Handling of Details
     handleDetail = id =>{
        const product = this.getItem(id);
        this.setState(()=>{ 
            return {detailProduct:product }
        })
     };
     //Handling of Cart
     addToCart = (id) =>{
        let tempCartProduct = [...this.state.product];
        const index = tempCartProduct.indexOf(this.getItem(id));
        const cartProduct = tempCartProduct[index];
        cartProduct.inCart = true;
        cartProduct.count = 1;
        const price = cartProduct.price;
        cartProduct.total = price;
        this.setState(()=>{
            return {product:tempCartProduct , cart:[...this.state.cart , cartProduct]}
        } ,()=>{
            this.addTotals();
        });
    };
    //methods for Popp up window Product info Modal
    openModal = id =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {modalProduct:product,modalOpen:true};
        });
    };
    closeModal = () =>{
        this.setState(()=>{
            return {modalOpen:false};
        });
    };
    //Here i am adding a MODAL for LOGIN
    openLoginModal = () =>{
        this.setState(()=>{
            return {openLogin:true};
        });
    };
    closeLoginModal = () =>{
        this.setState(()=>{
            return {openLogin:false};
        });
    };
    //within cart processes
    increment = (id) =>{
        let tCart = [...this.state.cart];
        const selectedProduct = tCart.find(item=>item.id === id);
        const index = tCart.indexOf(selectedProduct);
        const prod = tCart[index];

        prod.count = prod.count + 1;
        prod.total = prod.count * prod.price;
 
        this.setState(()=>{
            return{cart:[...tCart]} 
        },()=>{
            this.addTotals();
        });

    }
    decrement = (id) =>{
        let tCart = [...this.state.cart];
        const selectedProduct = tCart.find(item=>item.id === id);
        const index = tCart.indexOf(selectedProduct);
        const prod = tCart[index];

        prod.count = prod.count - 1;

        if(prod.count === 0){
            this.removeItem(id);
        }
        else{
             prod.total = prod.count * prod.price;
 
             this.setState(()=>{
                return{cart:[...tCart]} 
            },()=>{
                this.addTotals();
            });
        }

    }
    removeItem = (id) =>{
        let tempProd = [...this.state.product];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProd.indexOf(this.getItem(id)); 
        let removedProd = tempProd[index];
        removedProd.inCart = false;
        removedProd.count = 0;
        removedProd.total = 0;

        this.setState(()=>{
            return {
                cart:[...tempCart],
                product:[...tempProd]
            }
        },()=>{
            this.addTotals();
        })
    }
    clearCart = () =>{
        this.setState(()=>{
            return {cart:[]}
        },()=>{
            this.setProducts();
            this.addTotals();
        });
    }
    //methods to add totals / subtotals tax tec
    addTotals = () => {
        let subtotal = 0;
        this.state.cart.map(item=>(subtotal += item.total));
        //const subTot = parseFloat(subtotal.toFixed(2));
        const tempTax = subtotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subtotal + tax; 
        this.setState(()=>{
            return{
                cartSubtotal:subtotal,
                cartTax:tax,
                cartTotal:total
            }
        })

    }
    //Seneme Potential methods
    render() {
        return(
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail:this.handleDetail,
                addToCart:this.addToCart,
                openModal:this.openModal,
                closeModal:this.closeModal,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart

            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;
export {ProductProvider,ProductConsumer};

