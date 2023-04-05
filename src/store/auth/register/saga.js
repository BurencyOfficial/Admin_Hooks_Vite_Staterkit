import { all, call, fork, put, takeEvery } from "redux-saga/effects"
import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper"
import { registerUserFailed, registerUserSuccessful } from "./actions"

//Account Redux states
import { REGISTER_USER } from "./actionTypes"
//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend()

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  console.log("using the following url for registration: ")
  try {
    console.log("Trying to register user (within try block)")
    const response = yield call(
      fireBaseBackend.registerUser,
      user.email,
      user.password
    )
    yield put(registerUserSuccessful(response))

  } catch (error) {
    console.log("There was an error registering: ", error)
    yield put(registerUserFailed(error))
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga
