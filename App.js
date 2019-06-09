import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import WishContext from './WishContext';
import NavBarComponent from './NavBarComponent';
import HomeComponent from './HomeComponent';
import JoinComponent from './JoinComponent';
import AboutComponent from './AboutComponent';
import AddABestWishComponent from './AddABestWishComponent';
import WishesComponent from './WishesComponent';
import EventsComponent from './EventsComponent';
import CreateNewEvent from './CreateNewEventComponent';
import LoginComponent from './LoginComponent';
import UpdateEventComponent from './UpdateEventComponent';
import MyEventsComponent from './MyEventsComponent';
import SearchedEventComponent from './SearchedEventComponent';
import MyWishes from './MyWishes';
import RedirectIfAnonymous from './RedirectIfAnonymous';
import ShowUserEvents from './ShowUserEvents';
import localStorageManager from './localstorage';
import UpdateWishComponent from './UpdateWishComponent';
import AlertDismissible from './AlertDismissible';
import * as api from "./api";



export default class App extends React.Component {
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getHistory = this.getHistory.bind(this);
        this.register = this.register.bind(this);
        this.createNewEvent = this.createNewEvent.bind(this);
        let user;
        if (localStorageManager.isLoggedIn()) user = localStorageManager.getUser();
        else user = { name: '', userID: 1 };
        this.state = {
            ...user,
            history: '',
            register: this.register,
            login: this.login,
            logout: this.logout,
            getHistory: this.getHistory,
            createNewEvent: this.createNewEvent
        };
    }
    async register(username, email, password) {
        const result = await api.register(username, email, password);
        if (result.error) {
            alert(result.error);
            return;
        }
        console.log(result.userId);
        const user = { name: username, userID: result.userId };
        this.setState(user);
        localStorageManager.login(user);
        this.state.history.push("/AlertDismissible");
    }
    async login(email, password) {
        const result = await api.login(email, password);
        if (result.error) {
            alert(result.error);
            return;
        }
        console.log(result.userId);
        const user = { name: 'amir', userID: result.userId };
        this.setState(user);
        localStorageManager.login(user);
        this.state.history.push("/AlertDismissible");
    }
    async createNewEvent(title, category, startDate, endDate, location,userId) {
        const result = await api.createNewEvent(title, category, startDate, endDate, location,userId);
        if (result.error) {
            alert(result.error);
            return;
        }
        console.log(result.eventId);
    }
    getHistory(history) {
        this.setState({ history: history });
    }
    logout() {
        this.setState({ name: '', userID: -1 });
        localStorageManager.logout();
    }
    render() {
        return (
            <>
                <WishContext.Provider value={this.state}>
                    <BrowserRouter>
                        <div>
                            <NavBarComponent />
                            <Switch>
                                <Route path="/AlertDismissible" component={AlertDismissible} />
                                <Route path="/" component={HomeComponent} exact />
                                <Route path="/events" component={EventsComponent} />
                                <Route path="/AddABestWishComponent/:eventID" component={AddABestWishComponent} />
                                <Route path="/event/:eventID" component={WishesComponent} />
                                <RedirectIfAnonymous path="/wishes/:userID" component={MyWishes} />
                                <RedirectIfAnonymous path="/CreateNewEvent" component={CreateNewEvent} />
                                <RedirectIfAnonymous path="/UserEvents/:userID" component={ShowUserEvents} />
                                <RedirectIfAnonymous path="/UpdateEventComponent/:eventID" component={UpdateEventComponent} />
                                <RedirectIfAnonymous path="/UpdateWishComponent/:wishID" component={UpdateWishComponent} />
                                <Route path="/about" component={AboutComponent} />
                                <Route path="/join" component={JoinComponent} />
                                <Route path="/login" component={LoginComponent} />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </WishContext.Provider>
            </>);
    }
}
ReactDOM.render(<App />, document.querySelector('#container'));
