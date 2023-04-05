import { all, call, fork, put, takeEvery } from "redux-saga/effects"
import {
  postFakeForgetPwd,
  postJwtForgetPwd,
} from "../../../helpers/fakebackend_helper"
import { userForgetPasswordError, userForgetPasswordSuccess } from "./actions"

// Login Redux States
import { FORGET_PASSWORD } from "./actionTypes"
//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"

const fireBaseBackend = getFirebaseBackend()

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user, history } }) {
  try {
    const response = yield call(fireBaseBackend.forgetPassword, user.email)
    if (response) {
      yield put(
        userForgetPasswordSuccess(
          "Reset link are sended to your mailbox, check there first"
        )
      )
    }
  } catch (error) {
    yield put(userForgetPasswordError(error))
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser)
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)])
}

export default forgetPasswordSaga
