
import axios from "axios";

const URL = 'http://localhost:3080';

const getUserWishesByUserID = (userId) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const userWishes = wishes.filter(wish => wish.userID == userId);
            resolve(userWishes);
        }, 500);
    })
}

const getEvents = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(events);
        }, 500);
    })
}
const getWishes = async (eventId, userId) => {
    try {
        const token = "userId:" + userId;
        const result = await axios.get(URL + '/events', { headers: { Authorization: `Bearer ${token}` } });
        const { data } = result;
        const { wishes } = data.filter(event => event.userId == userId).filter(event => event.id == eventId)[0];
        return { eventWishes: wishes }
    } catch (error) {
        console.dir(error);
        return { error };
    }
}
const getEvent = async (eventId, userId) => {
    try {
        const token = "userId:" + userId;
        const result = await axios.get(URL + '/events', { headers: { Authorization: `Bearer ${token}` } });
        const { data } = result;
        console.log(data.filter(event => event.id == eventId));
        return { event: data.filter(event => event.id == eventId)[0] }
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
const getWish = id => {
    return new Promise(resolve => {
        setTimeout(() => {
            const wish = wishes.find(w => w.ID === id);
            resolve(wish);
        }, 500);
    });
}

const getUserEventsByUserID = async (userId) => {
    try {
        const token = "userId:" + userId;
        const result = await axios.get(URL + '/events', { headers: { Authorization: `Bearer ${token}` } });
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
export {
    login,
    register,
    getWishes,
    getEvents,
    getEvent,
    getUserEventsByUserID,
    getUserWishesByUserID,
    getWish
};