import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import {Table, Button} from "reactstrap"
import alertify from "alertifyjs"

class cartDetail extends Component {
    removeFromCart(product){
        this.props.actions.removeFromCart(product);
        alertify.error(product.productName +"sepetten silindi")
    }
  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map((cartItem) => ( //burda this.props.cart oldu çünkü buraya gelen aşağıdaki mapStateToProps taki parametrem cart
              <tr key={cartItem.product.id}>
                <th scope="row">{cartItem.product.id}</th>
                <td>{cartItem.product.productName}</td>
                <td>{cartItem.product.unitPrice}</td>
                <td>{cartItem.quantity}</td>
                
                <td>
                  <Button
                    color="success"
                    onClick={() => this.removeFromCart(cartItem.product)}
                  >
                    sil
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  //return içerisinde action diye bir obje döndürür.
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(cartDetail);
