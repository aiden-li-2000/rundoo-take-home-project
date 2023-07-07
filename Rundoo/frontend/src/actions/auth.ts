import axios from "axios";
import * as actions from "./types";
import { Dispatch, AnyAction } from "redux";

export const checkAuthenticated =
  () => async (dispatch: Dispatch<AnyAction>) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const body = JSON.stringify({ token: localStorage.getItem("access") });

      try {
        const res = await axios.post(
          "http://localhost:8000/auth/jwt/verify/",
          body,
          config
        );

        if (res.data.code !== "token_not_valid") {
          dispatch({
            type: actions.AUTHENTICATED_SUCCESS,
          });
        } else {
          dispatch({
            type: actions.AUTHENTICATED_FAIL,
          });
        }
      } catch (err) {
        dispatch({
          type: actions.AUTHENTICATED_FAIL,
        });
      }
    } else {
      dispatch({
        type: actions.AUTHENTICATED_FAIL,
      });
    }
  };

export const load_user = () => async (dispatch: Dispatch<AnyAction>) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        "http://localhost:8000/auth/users/me/",
        config
      );

      dispatch({
        type: actions.USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: actions.USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: actions.USER_LOADED_FAIL,
    });
  }
};

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    console.log("Ahahahah")
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(
        "http://localhost:8000/auth/jwt/create/",
        body,
        config
      );
      dispatch({
        type: actions.LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(load_user());
    } catch (err) {
      dispatch({
        type: actions.LOGIN_FAIL,
      });
    }
  };

export const logout = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch({
    type: actions.LOGOUT,
  });
};

export const signup =
  (
    email: string,
    name: string,
    address: string,
    city: string,
    country: string,
    password: string,
    re_password: string
  ) =>
  async (dispatch: Dispatch<AnyAction>) => {
    console.log("here1")
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      email,
      name,
      address,
      city,
      country,
      password,
      re_password,
    });

    try {
      const res = await axios.post(
        "http://localhost:8000/auth/users/",
        body,
        config
      );

      dispatch({
        type: actions.SIGNUP_SUCCESS,
        payload: res.data,
      });
      return 1;
    } catch (err) {
      dispatch({
        type: actions.SIGNUP_FAIL,
      });
    }
  };

// export const verify = (uid: string, token: string) => async (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify({ uid, token });

//   try {
//     await axios.post(
//       `${process.env.DJANGO_API_URL}/auth/users/activation/`,
//       body,
//       config
//     );

//     dispatch({
//       type: actions.ACTIVATION_SUCCESS,
//     });
//   } catch (err) {
//     dispatch({
//       type: actions.ACTIVATION_FAIL,
//     });
//   }
// };

// export const reset_password = (email: string) => async (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify({ email });

//   try {
//     await axios.post(
//       `${process.env.DJANGO_API_URL}/auth/users/reset_password/`,
//       body,
//       config
//     );

//     dispatch({
//       type: actions.PASSWORD_RESET_SUCCESS,
//     });
//   } catch (err) {
//     dispatch({
//       type: actions.PASSWORD_RESET_FAIL,
//     });
//   }
// };

// export const reset_password_confirm =
//   (uid: string, token: string, new_password: string, re_new_password: string) =>
//   async (dispatch) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const body = JSON.stringify({ uid, token, new_password, re_new_password });

//     try {
//       await axios.post(
//         `${process.env.DJANGO_API_URL}/auth/users/reset_password_confirm/`,
//         body,
//         config
//       );

//       dispatch({
//         type: actions.PASSWORD_RESET_CONFIRM_SUCCESS,
//       });
//     } catch (err) {
//       dispatch({
//         type: actions.PASSWORD_RESET_CONFIRM_FAIL,
//       });
//     }
//   };