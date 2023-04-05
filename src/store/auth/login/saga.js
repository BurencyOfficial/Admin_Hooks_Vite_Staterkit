// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(
      fireBaseBackend.loginUser,
      user.email,
      user.password
    );
    yield put(loginSuccess(response));
    history('/dashboard');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");

    const response = yield call(fireBaseBackend.logout);
    yield put(logoutUserSuccess(response));
    history('/login');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    const fireBaseBackend = getFirebaseBackend();
    const response = yield call(
      fireBaseBackend.socialLoginUser,
      data,
      type,
    );
    localStorage.setItem("authUser", JSON.stringify(response));
    yield put(loginSuccess(response));

    history('/dashboard');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
