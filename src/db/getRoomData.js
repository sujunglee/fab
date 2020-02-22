import db from "./init"

const getRoomData = async ({roomID}) => {
    const snapshot = await db.ref("rooms/active/" + roomID).once("value")
    const title = snapshot.val().meta_data.title;
    const timeCreated = snapshot.val().meta_data.time_created;
    const pictureA = snapshot.val().optionA.picture;
    const pictureB = snapshot.val().optionB.picture;
    const results = {
        title: title,
        timeCreated: timeCreated,
        pictureA: pictureA,
        pictureB: pictureB
    }
    return results
}

export default getRoomData