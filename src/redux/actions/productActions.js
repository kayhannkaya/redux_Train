import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function createProductSuccess(product) {
  return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: product };
}

export function updateProductSuccess(product) {
  return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: product };
}

export function saveProductApi(product) {
  //default get tir.
  //Bu adrese post yap demek.Bu yöntem api den api ye değişir.
  return fetch("http://localhost:3000/products/" + (product.id || ""), {
    method: product.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product), //ben yolladğım için bilgiyi elimde string var json a çeviriyorum.
  })
    .then(handleResponse)
    .catch(handleError);
}
export function saveProduct(product){
  //bu dispatch bizim action mızın devreye girmesini sağlıyordu.
  return function (dispatch){
    //burda saveProduct için => bununla operasyonumu yazıcam. handleResponse da bir tane o eklenmeye veya güncellenmeye çalışılan datayı göndericez.
    //burda saveProductApi ile veritabanına gittik product işlemini yap. Ve benim redux ıma söyleki dispatch ile artık o yeni eklenen product saveProduct tır.
    return saveProductApi(product).then(savedProduct=>{
      product.id?dispatch(updateProductSuccess(savedProduct)):dispatch(createProductSuccess(savedProduct))

    }).catch(error=>{throw error}) //eğer üstteki operasyondan bir hata dönerse
  }
}

export async function handleResponse(response){
  if(response.ok){
    return response.json()
  }
  //responsun sonucuna göre bir karar vericek durum oluşturduk.
  const error=await response.text() // sonuç ok değilse hata var
  throw new Error(error)
}

export function handleError(error){
  console.error("Bir hata oluştu")
  throw error;
}


//api ye bağlanma asenkron olaylardandır.Redux Thunk diye bir yapı var.
export function getProducts(categoryId) {
  //return de bir fonksiyon döndürüyoruz.
  return function (dispatch) {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url = url + "?categoryId=" + categoryId;
    }
    //response değişken başka bir değişkende olabilir.Gelen response u json a çevir.Çevirmemiz lazım json gelmiyor json formatında geliyor ama gelen istek hep string tir.
    //Her then dediğimiz zaman bir öncekinin sonucuyla ilgilenir.
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getProductsSuccess(result)));
  };
}
