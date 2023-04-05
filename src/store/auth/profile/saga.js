import { all, call, fork, put, takeEvery } from "redux-saga/effects"
import {
  postFakeProfile,
  postJwtProfile,
} from "../../../helpers/fakebackend_helper"
import { profileError, profileSuccess } from "./actions"

// Login Redux States
import { EDIT_PROFILE } from "./actionTypes"
//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"

const fireBaseBackend = getFirebaseBackend()

function* editProfile({ payload: { user } }) {
  try {
    const response = yield call(
      fireBaseBackend.editProfileAPI,
      user.username,
      user.idx
    )
    yield put(profileSuccess(response))

  } catch (error) {
    yield put(profileError(error))
  }
}
export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
