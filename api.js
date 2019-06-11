
import axios from "axios";

const URL = 'http://localhost:3080';

const getWishes = async (eventId) => {
    try {
        const result = await axios.get(URL + '/event/' + eventId);
        const { data } = result;
        const { wishes } = data[0];
        return { eventWishes: wishes }
    } catch (error) {
        console.dir(error);
        return { error };
    }
}
const getEvent = async (eventId) => {
    try {
        const result = await axios.get(URL + '/event/' + eventId);
        const { data } = result;
        return { event: data[0] }
        /*  if (data.status.code == 401) {
              return { error: data.status.message };
          } else {
              return { id: data.id }
          }*/
    }
    catch (error) {
        console.dir(error);
        return { error };
    }
}
const getUserEventsByUserID = async (userId) => {
    try {
        const token = "userId:" + userId;
        const result = await axios.get(URL + '/user/my-events', { headers: { Authorization: `Bearer ${token}` } });
        const { data } = result;
        return { userEvents: data.filter(event => event.userId == userId) }
        /*  if (data.status.code == 401) {
              return { error: data.status.message };
          } else {
              return { id: data.id }
          }*/
    }
    catch (error) {
        console.dir(error);
        return { error };
    }
}
const login = async (email, password) => {
    try {
        const result = await axios.post(URL + '/login', {
            email, password
        });
        const { data } = result;
        if (data.status.code == 200) {
            return { userId: data.userId };
        } else {
            return { error: data.error };
        }
    } catch (error) {
        console.dir(error);
        return { error };
    }
}
const register = async (username, email, password) => {
    try {
        const result = await axios.post(URL + '/register', {
            username, email, password
        });
        const { data } = result;
        if (data.status.code == 200) {
            return { userId: data.userId };
        } else {
            return { error: data.error };
        }
    }
    catch (error) {
        console.dir(error);
        return { error };
    }
}
const createNewEvent = async (title, category, startDate, endDate, location, userId) => {
    try {
        const token = "userId:" + userId;
        const result = await axios.post(URL + '/user/new-event', { title, category, startDate, endDate, location }, { headers: { Authorization: `Bearer ${token}` } });
        const { data } = result;
        if (data.status.code == 200) {
            return { eventId: data.eventId };
        } else {
            return { error: data.error };
        }
    }
    catch (error) {
        console.dir(error);
        return { error };
    }
}
const createWish = async (eventId, userId, from, body, image) => {
    try {
        const result = await axios.post(URL + '/new-wish/' + eventId, { userId, from, body, image });
        const { data } = result;
        if (data.status.code == 200) {
            return { wishId: data.wishId };
        } else {
            return { error: data.error };
        }
    }
    catch (error) {
        console.dir(error);
        return { error };
    }
}
export {
    login,
    register,
    getWishes,
    getEvent,
    getUserEventsByUserID,
    createNewEvent,
    createWish
};