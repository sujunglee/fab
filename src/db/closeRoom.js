import fb from "./init"
const db = fb.database();

const closeRoom = async ({ roomID }) => {
    console.log('closeroom')
    var snapshot = await db.ref("rooms/active/" + roomID).once("value")
    await db.ref(`rooms/inactive`)
        .child(roomID)
        .set(snapshot.val())
        .catch(error => alert(error));
    let dbRef = db.ref("rooms/active/" + roomID);
    dbRef.remove()
        .catch((error) => {
            console.log("remove failed: " + error.message)
        });

};

export default closeRoom;