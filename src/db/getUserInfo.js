import db from "./init"

<<<<<<< HEAD
const getUserInfo = async ({userID}) => {
    const snapshot = await db.ref("users/" + userID).once("value");
    return snapshot.val();
};
=======
const getUserInfo = async ({ userID }) => {
  const snapshot = await db.ref("users/" + userID).once("value")
  return {
    badge: snapshot.val().meta_data.badge,
    numcorrect: snapshot.val().meta_data.number_correct,
    numvoted: snapshot.val().meta_data.number_voted,
    rooms: snapshot.val().rooms_owned
  }
}
>>>>>>> 6b49decc357dc7d9e23f573e2a25c3e07ba49b75

export default getUserInfo
