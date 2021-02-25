import * as actionTypes from "./actionTypes";

export function changeCategory(category) {
  //bu aksiyon aslında bir obje döndürür.
  return { type: actionTypes.CHANGE_CATEGORY, payload: category };
}

export function getCategoriesSuccess(categories) {
  return { type: actionTypes.GET_CATEGORIES_SUCCESS, payload: categories };
}

//api ye bağlanma asenkron olaylardandır.Redux Thunk diye bir yapı var.
export function getCategories() {
  //return de bir fonksiyon döndürüyoruz.
  return function (dispatch) {
    let url = "http://localhost:3000/categories";
    //response değişken başka bir değişkende olabilir.Gelen response u json a çevir.Çevirmemiz lazım json gelmiyor json formatında geliyor ama gelen istek hep string tir.
    //Her then dediğimiz zaman bir öncekinin sonucuyla ilgilenir.
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getCategoriesSuccess(result)));
  };
}
