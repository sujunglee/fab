import fb from "./init"
const db = fb.database();
import { BADGES } from '../constants/badges';
import moment from "moment";

const addUser = async ({ userID }) => {
    const userEntry = {
        meta_data: { badge: BADGES.NORMAL, number_correct: 0, number_voted: 0, time_created: moment().toISOString() },
        rooms_owned: null
    }
    await db.ref(`users`)
        .child(userID)
        .set(userEntry)
        .catch(error => alert(error));
}

export default addUser;