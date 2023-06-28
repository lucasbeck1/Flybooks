import axios from "axios";
import jwt from "jwt-decode";

export const GET_ALL_BOOKS = "GET_ALL_BOOKS";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_BOOKS_BY_NAME = "GET_BOOKS_BY_NAME";
export const GET_BOOK_DETAILS = "GET_BOOK_DETAILS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_LANGUAGES = "GET_LANGUAGES";
export const GET_GENDERS = "GET_GENDERS";
export const GET_ALL_AUTHOR = "GET_ALL_AUTHOR";
export const GET_ALL_SAGA = "GET_ALL_SAGA";
export const GET_ALL_EDITORIAL = "GET_ALL_EDITORIAL";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const FILTER_BOOKS = "FILTER_BOOKS";
export const ORDER_BOOKS = "ORDER_BOOKS";
export const FILTER_PRICE = "FILTER_PRICE";
export const GET_SAGA = "GET_SAGA";
export const GET_EDITORIAL = "GET_EDITORIAL";
export const GET_AUTHOR = "GET_AUTHOR";
export const GET_USER_STRIPE = "GET_USER_STRIPE"
export const GET_TOKEN = "GET_TOKEN";
export const CLEAR_STORAGE = "CLEAR_STORAGE"
export const GET_USER_DETAIL = "GET_USER_DETAIL";
export const CLEAR_IMAGE = "CLEAR_IMAGE"
export const GET_MY_PRODUCTS = "GET_MY_PRODUCTS"
export const GET_MY_BOOKS = "GET_MY_BOOKS"
export const DARK_MODE = "DARK_MODE";
export const SEARCH_BOOKS = "SEARCH_BOOKS";


const localhost = "http://localhost:3001";
const deploy = 'https://flybooks.up.railway.app'
// const deploy = 'http://localhost:3001'


export function searchBooks(payload) {
  return async function (dispatch) {
    try {
      console.log(payload);
      return dispatch({
        type: SEARCH_BOOKS,
        payload
      })
    } catch (err) {
      console.log(err);

    }

  }
}

export function filterBooks(payload) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: FILTER_BOOKS,
        payload
      })
    } catch (error) {
      console.log(error);
    }
  }
};


export function loginUser(payload) {
  if (payload) {
    return async function (dispatch) {
      try {
        let token = await axios.post(`${deploy}/local/login`, payload);
        return dispatch({
          type: GET_TOKEN,
          payload: token.data
        })
      } catch (error) {
        console.log(error.message);
      }
    };
  }
}
export function loginGoogle() {
    return async function (dispatch) {
      try {
        let token = await axios.get(`${deploy}/logingoogle/login-google`);
        return dispatch({
          type: GET_TOKEN,
          payload: token.data
        })
      } catch (error) {
        console.log(error.message);
      }
    };
}


export function filterPrice(payload) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: FILTER_PRICE,
        payload
      })
    } catch (error) {
      console.log(error);
    }
  }
};


export function clearImage() {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CLEAR_IMAGE
      })
    } catch (error) {
      console.log(error);
    }
  }
};


export function orderBooks(payload) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: ORDER_BOOKS,
        payload
      })
    } catch (error) {
      console.log(error);
    }
  }
};





export function getAllBooks() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${deploy}/products`);
      return dispatch({
        type: GET_ALL_BOOKS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function setPage(payload) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CHANGE_PAGE,
        payload
      })

    } catch (error) {
      console.log(error);
    }
  }
}

export function getAllUsers() {
  return async function (dispatch) {
    try {
      const user = await axios.get(`${deploy}/users`);
      return dispatch({
        type: GET_ALL_USERS,
        payload: user.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUsersDetail(id) {
  return async function (dispatch) {
    try {
      const user = await axios.get(`${deploy}/users/${id}`);
      return dispatch({
        type: GET_USER_DETAIL,
        payload: user.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCategories() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${deploy}/categories`);
      return dispatch({
        type: GET_CATEGORIES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getLanguages() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${deploy}/languages`);
      return dispatch({
        type: GET_LANGUAGES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getGenders() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${deploy}/genders`);
      return dispatch({
        type: GET_GENDERS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllAuthor() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${deploy}/authors`);
      return dispatch({
        type: GET_ALL_AUTHOR,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllSaga() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${deploy}/sagas`);
      return dispatch({
        type: GET_ALL_SAGA,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllEditorial() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${deploy}/editorials`);
      return dispatch({
        type: GET_ALL_EDITORIAL,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}


export function getBooksByName(title) {
  return async function (dispatch) {
    try {
      const searchName = await axios.get(`${deploy}/products?search=${title}`);
      return dispatch({
        type: GET_BOOKS_BY_NAME,
        payload: searchName.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getBooksDetails(id) {
  return async function (dispatch) {
    try {
      let detailsBook = await axios.get(`${deploy}/products/${id}`);
      return dispatch({
        type: GET_BOOK_DETAILS,
        payload: detailsBook.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function myProductDetail(id) {
  return async function (dispatch) {
    try {
      let detailsBook = await axios.get(`${deploy}/products/${id}`);
      return dispatch({
        type: GET_MY_BOOKS,
        payload: detailsBook.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function findUserStripe(username) {
  if (username) {
    return async function (dispatch) {
      try {
        let res = await axios.get(`${deploy}/api/checkout?username=${username}`);
        return dispatch({
          type: GET_USER_STRIPE,
          payload: res.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  } else {
    return async function (dispatch) {
      try {
        const userNameGoogle = jwt(document.cookie)
        console.log(userNameGoogle)
        const result = userNameGoogle.username
        let res = await axios.get(`${deploy}/api/checkout?username=${result}`);
        return dispatch({
          type: GET_USER_STRIPE,
          payload: res.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }
}

export function authorByName(name) {
  return async function (dispatch) {
    try {
      let res = await axios.get(`${deploy}/filters/author/${name}`);
      return dispatch({
        type: GET_AUTHOR,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function editorialByName(name) {
  return async function (dispatch) {
    try {
      let res = await axios.get(`${deploy}/userController/editorial/${name}`);
      return dispatch({
        type: GET_EDITORIAL,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function sagaByName(name) {
  return async function (dispatch) {
    try {
      let res = await axios.get(`${deploy}/filters/saga/${name}`);
      return dispatch({
        type: GET_SAGA,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createPost(id, payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${deploy}/products/${id}`, payload);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}
export function payMailing(payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${deploy}/profile/sendMail`, payload);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}
export function cartMailing(payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${deploy}/profile/cartMail`, payload);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}



export function modificatePostInProfile(id, productId, payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${deploy}/products/${id}?title=${productId}`, payload);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}


export function addStorage(id, payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${deploy}/users/${id}/storage`, payload);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };
}

export function addPurchases(id, payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${deploy}/profile/purchases/${id}`, payload);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };
}

export function addReview(id, payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${deploy}/profile/reviews/${id}`, payload);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };
}

export function myReview(id, payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${deploy}/profile/myreviews/${id}`, payload);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };
}


export function createReview(id, payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${deploy}/profile/reviews/${id}`, payload);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };
}

export function addFavorites(id, payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${deploy}/profile/favorites/${id}`, payload);
      console.log("hola", post.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function addMyProducts(id, payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${deploy}/profile/myproducts/${id}`, payload);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };
}



export function createCustomer(payload) {
  if (payload) {
    return async function (dispatch) {
      try {
        let post = await axios.post(`${deploy}/api/checkout/stripe`, payload);
        console.log(post);
      } catch (error) {
        console.log(error);
      }
    };
  } else {
    return async function (dispatch) {
      try {
        const token = jwt(document.cookie)
        const payload = {
          username: token.username,
          email: token.email
        }
        let post = await axios.post(`${deploy}/api/checkout/stripe`, payload);
        console.log("customer", post)
      } catch (error) {
        console.log(error);
      }
    }
  }
}




export const deleteStorageItemById = (id, item) => {
  return async (dispatch) => {
    try {
      const pay = await axios.put(`${deploy}/users/${id}/storage?item=${item}`)
      console.log(pay)
    } catch (e) {
      console.log(e);
    }
  };
};
export const addBuyerToProduct = (id, payload) => {
  return async (dispatch) => {
    try {
      const pay = await axios.put(`${deploy}/products/buyers/${id}`, payload)
      console.log(pay)
    } catch (e) {
      console.log(e);
    }
  };
};

export const modifyMyPosts = (id, item, payload) => {
  return async (dispatch) => {
    try {
      const pay = await axios.put(`${deploy}/profile/myproducts/${id}?item=${item}`, payload)
      console.log(pay)
    } catch (e) {
      console.log(e);
    }
  };
};


export const deleteFavoriteItemById = (id, item) => {
  return async (dispatch) => {
    try {
      const pay = await axios.put(`${deploy}/users/${id}/favorites?item=${item}`)
      console.log(pay)
    } catch (e) {
      console.log(e);
    }
  };
};

export const clearStorage = (id) => {
  return async (dispatch) => {
    try {
      const pay = await axios.get(`${deploy}/users/${id}/storage`)
      console.log(pay)
    } catch (e) {
      console.log(e);
    }
  };
};

export const clearFavorites = (id) => {
  return async (dispatch) => {
    try {
      const pay = await axios.get(`${deploy}/users/${id}/favorites`)
      console.log(pay)
    } catch (e) {
      console.log(e);
    }
  };
};

export const getMyProducts = (id) => {
  return async (dispatch) => {
    try {
    await axios.get(`${deploy}/profile/user/${id}/`)
      return dispatch({
        type: GET_MY_PRODUCTS
      })

    } catch (e) {
      console.log(e);
    }
  };
};


export function createUser(payload) {
  return async function (dispatch) {
    try {
      let user = await axios.post(`${deploy}/local/register`, payload);
      console.log("------", user.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function createUserFromAdmin(payload) {
  return async function (dispatch) {
    try {
      let user = await axios.post(`${deploy}/users`, payload);
      console.log("------", user.data);
    } catch (error) {
      console.log(error);
    }
  };
}
export const startUploadingFile = (file = []) => {
  return async function (dispatch) {
    const cloudUrl = "https://api.cloudinary.com/v1_1/deudiau9e/upload";
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("upload_preset", "henrypf");

    try {
      let response = await fetch(cloudUrl, {
        method: "POST",
        body: formData
      });
      if (!response.ok) throw new Error("can't upload image")
      let cloudResponse = await response.json();
      return dispatch({
        type: "IMAGE",
        payload: cloudResponse.secure_url
      })
    } catch (error) {
      console.log(error);

    }
  }
}



export function disablePost(id) {
  return async function () {
    try {
      let post = await axios.put(`${deploy}/products/deletelogic/${id}`);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}



export function deletePost(id) {
  return async function () {
    try {
      let post = await axios.delete(`${deploy}/products/${id}`);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}


export function disableUser(id) {
  return async function () {
    try {
      let post = await axios.put(`${deploy}/users/deletelogic/${id}`);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteUser(id) {
  return async function () {
    try {
      let post = await axios.delete(`${deploy}/users/${id}`);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function modifyUser(id, payload) {
  return async function () {
    try {
      let post = await axios.put(`${deploy}/users/${id}`, payload);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function balanceProfile(id, payload) {
  return async function () {
    try {
      let post = await axios.put(`${deploy}/profile/balance/${id}`, payload);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}


export function modifyPost(id, payload) {
  return async function () {
    try {
      let post = await axios.put(`${deploy}/products/${id}`, payload);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function recoverPassword(payload) {
  return async function () {
    try {
      await axios.post(`${deploy}/local/recover-password`, payload);
    } catch (error) {
      console.log(error);
    }
  };
}

export function darkMode() {
  return {
    type: DARK_MODE,

  }
}
