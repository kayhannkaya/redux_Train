import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import { Badge } from "reactstrap";
import * as productActions from "../../redux/actions/productActions"

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  selectCategory = (category) => {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id);
  };
  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">Categories</Badge>
        </h3>
        <ListGroup>
          {this.props.categories.map((category) => (
            <ListGroupItem
              active={category.id === this.props.currentCategory.id}
              onClick={() => this.selectCategory(category)}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        {/* <h5>Seçili Kategori: {this.props.currentCategory.categoryName}</h5> */}
      </div>
    );
  }
}

// Map et bağla state e nereye props'a (bu componentin proplarına bir state i bağla)
function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  };
}
//action 'ı proplara bağla
function mapDispatchToProps(dispatch) {
  return {
    //bu komponentin actions ları diyoruz.
    //Reduxtaki action'ı buraya bağlıcam.Onun içinde importlara bak {bindActionCreator}
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
    },
  };
}

//connect fonksiyonu bir fonksiyon döndürüyordu.Ve parametre olarak CategoryList i gönderiyoruz.
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
