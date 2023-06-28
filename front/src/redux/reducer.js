import jwt from "jwt-decode";
import {
  CHANGE_PAGE,
  GET_ALL_BOOKS,
  GET_ALL_USERS,
  GET_BOOKS_BY_NAME,
  GET_BOOK_DETAILS,
  GET_CATEGORIES,
  GET_GENDERS,
  GET_LANGUAGES,
  GET_ALL_AUTHOR,
  GET_ALL_SAGA,
  GET_ALL_EDITORIAL,
  FILTER_BOOKS,
  FILTER_PRICE,
  ORDER_BOOKS,
  GET_SAGA,
  GET_EDITORIAL,
  GET_AUTHOR,
  GET_USER_STRIPE,
  GET_TOKEN,
  CLEAR_STORAGE,
  GET_USER_DETAIL,
  CLEAR_IMAGE,
  GET_MY_PRODUCTS,
  GET_MY_BOOKS,
  DARK_MODE,
  SEARCH_BOOKS


} from "./actions";

const initialState = {
  users: [],
  userDetail: [],
  allbooks: [],
  books: [],
  detailsBook: {},
  categories: [],
  languages: [],
  genders: [],
  allAuthor: [],
  allSaga: [],
  allEditorial: [],
  currentPage: 1,
  images: [],
  auxState: [],
  sessionState: [],
  stripeState: [],
  myproductDetail: [],
  darkMode: false,
  filters: {
    categorie: "",
    author: "",
    editorial: "",
    saga: "",
    language: "",
    typebook: "",
    state: "",
    priceMin: "",
    priceMax: "",
    gender: [],
  },
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_BOOKS:


      return {
        ...state,
        allbooks: payload,
        books: payload,
      };
    case CLEAR_STORAGE:
      return {
        ...state,
      };
    case GET_GENDERS:
      return {
        ...state,
        genders: payload.map((elm) => {
          return elm.name;
        }),
      };
    case GET_TOKEN:

      let currentToken = jwt(payload);
      return {
        ...state,
        sessionState: currentToken,
      };
    case GET_USER_STRIPE:

      return {
        ...state,
        stripeState: payload,
      };
    case GET_CATEGORIES:
      let categories = payload.map((el) => el.name);
      return {
        ...state,
        categories: categories,
      };
    case GET_LANGUAGES:
      return {
        ...state,
        languages: payload.map((elm) => {
          return elm.name;
        }),
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload,
      };
    case GET_USER_DETAIL:
      return {
        ...state,
        userDetail: [payload]
      };
    case GET_ALL_AUTHOR:
      return {
        ...state,
        allAuthor: payload,
      };

    case GET_ALL_SAGA:
      return {
        ...state,
        allSaga: payload,
      };

    case GET_ALL_EDITORIAL:
      return {
        ...state,
        allEditorial: payload,
      };

    case GET_BOOKS_BY_NAME:
      state.books = state.allbooks;

      return {
        ...state,
        books: payload,
      };

    case GET_BOOK_DETAILS:
      return {
        ...state,
        detailsBook: payload,

      };
    case GET_MY_BOOKS:
      // console.log(state.myproductDetail);
      return {
        ...state,
        myproductDetail: payload
      }
    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case FILTER_BOOKS:

      let newFilter = payload
      let filter = state.filters
      let filteredBooks = state.allbooks.slice();

      if (newFilter === 'Clear') {
        return ({
          ...state,
          books: state.allbooks,
          filters: {
            categorie: "",
            author: "",
            editorial: "",
            saga: "",
            language: "",
            typebook: "",
            state: "",
            priceMin: "",
            priceMax: "",
            gender: [],
          },
        })
      };



      if (newFilter.gender && newFilter.gender.length) {
        filter = { ...filter, gender: [...filter.gender, newFilter.gender] };
      }
      else if(newFilter && (newFilter.priceMin === '' || newFilter.priceMin === 0) ){
        filter = {...filter, priceMin: ""};
      }
      else if(newFilter && (newFilter.priceMax === '' || newFilter.priceMax === 0)){
        filter = {...filter, priceMax: ""};
      }
      else if (newFilter && newFilter.genderDelete) {
        const genderDel = newFilter.genderDelete;
        const genderFilter = filter.gender.filter(gen => gen !== genderDel);
        filter = { ...filter, gender: [...genderFilter] };
      }
      else {
        filter = { ...filter, ...newFilter };
      };




      if (filter.categorie) { filteredBooks = filteredBooks.filter(b => b.categorie === filter.categorie) };
      if (filter.author) { filteredBooks = filteredBooks.filter(b => b.author === filter.author) };
      if (filter.editorial) { filteredBooks = filteredBooks.filter(b => b.editorial === filter.editorial) };
      if (filter.saga) { filteredBooks = filteredBooks.filter(b => b.saga === filter.saga) };
      if (filter.language) { filteredBooks = filteredBooks.filter(b => b.language === filter.language) };
      if (filter.typebook) { filteredBooks = filteredBooks.filter(b => b.typebook === filter.typebook) };
      if (filter.state) { filteredBooks = filteredBooks.filter(b => b.state === filter.state) };
      if (filter.priceMin) { filteredBooks = filteredBooks.filter(b => b.price >= filter.priceMin) };
      if (filter.priceMax) { filteredBooks = filteredBooks.filter(b => b.price <= filter.priceMax) };

      if (filter.gender.length) {
        for (let i = 0; i < filter.gender.length; i++) {
          filteredBooks = filteredBooks.filter(b => b.gender.includes((filter.gender[i])))
        };
      };


      return {
        ...state,
        books: filteredBooks,
        filters: filter
      };

    case FILTER_PRICE:
      let max_or_min = payload.name;
      let filterPrice = payload.value;
      let booksFiltered1 = state.books.slice();

      if (max_or_min === "Min") {
        let booksFiltered2 = state.books
          .slice()
          .filter((el) => parseInt(el.price) >= parseInt(filterPrice));
        if (booksFiltered2.length > 0) booksFiltered1 = booksFiltered2;
      } else if (max_or_min === "Max") {
        let booksFiltered2 = state.books
          .slice()
          .filter((el) => parseInt(el.price) <= parseInt(filterPrice));
        if (booksFiltered2.length > 0) booksFiltered1 = booksFiltered2;
      }

      return {
        ...state,
        books: booksFiltered1,
      };

    case ORDER_BOOKS:
      const order = payload;
      let booksOrdered = state.books.slice();

      if (order === "AZ") {
        booksOrdered = booksOrdered.sort(function (a, b) {
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          return 0;
        });
      } else if (order === "ZA") {
        booksOrdered = booksOrdered.sort(function (a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return 1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return -1;
          }
          return 0;
        });
      } else if (order === "LP") {
        booksOrdered = booksOrdered.sort(function (a, b) {
          if (a.price > b.price) {
            return 1;
          }
          if (a.price < b.price) {
            return -1;
          }
          return 0;
        });
      } else if (order === "HP") {
        booksOrdered = booksOrdered.sort(function (a, b) {
          if (a.price < b.price) {
            return 1;
          }
          if (a.price > b.price) {
            return -1;
          }
          return 0;
        });
      }

      return {
        ...state,
        books: booksOrdered,
      };
    case GET_SAGA:
      return {
        ...state,
        books: payload,
      };
    case GET_EDITORIAL:
      return {
        ...state,
        books: payload,
      };
    case GET_AUTHOR:
      return {
        ...state,
        books: payload,
      };
    case "IMAGE":
      return {
        ...state,
        images: payload,
      };
    case CLEAR_IMAGE:
      return {
        ...state,
        images: []
      };
    case GET_MY_PRODUCTS:
      return {
        ...state
      }
    case DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode
      }
    case SEARCH_BOOKS:
      // console.log(state.books.length);
      // console.log(payload);

      return {
        ...state,
        books: state.allbooks?.filter(book => book.title.toLowerCase().includes(payload))
      }
    default:
      return state;
  }
};
export default rootReducer;
