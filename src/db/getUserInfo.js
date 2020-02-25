import db from "./init"

const getUserInfo = async ({ userID }) => {
  const snapshot = await db.ref("users/" + userID).once("value")
  return {
    badge: snapshot.val().meta_data.badge,
    numcorrect: snapshot.val().meta_data.number_correct,
    numvoted: snapshot.val().meta_data.number_voted,
    rooms: snapshot.val().rooms_owned
  }
}

export default getUserInfo
