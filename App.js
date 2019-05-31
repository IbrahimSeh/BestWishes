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
        let user;
        if (localStorageManager.isLoggedIn()) user = localStorageManager.getUser();
        else user = { name: '', userID: 1 };
        this.state = {
            ...user,
            history: '',
            login: this.login,
            logout: this.logout,
            getHistory: this.getHistory
        };
        if (!localStorage.users) {
            localStorage.users = JSON.stringify([
                {
                    "userId": "1",
                    "name": "Ameer",
                    "userName": "a@b.com",
                    "password": 123456
                },
                {
                    "userId": "2",
                    "name": "Saeed",
                    "userName": "saeednamih@gmail.com",
                    "password": 5678
                },
                {
                    "userId": "3",
                    "name": "Sally",
                    "userName": "sallydabbah@gmail.com",
                    "password": 9101112
                },
                {
                    "userId": "4",
                    "name": "Ameer",
                    "userName": "ameer.outlook.com",
                    "password": 12345
                }
            ]);
        }
        if (!localStorage.userWishes) {
            localStorage.userWishes = JSON.stringify([
                {
                    "ID": "1",
                    "from": "Ameer",
                    "wishContent": "Happy birthday wish you all the best",
                    "imageURL": "https://blog.serenataflowers.com/pollennation/wp-content/uploads/2016/05/original-happy-birthday-messages-FT.gif",
                    "eventID": "1"
                },
                {
                    "ID": "2",
                    "from": "sally",
                    "wishContent": "I wish that your birthday brings a new year as sweet, peppy and fiery as you my dear. Happy birthday.",
                    "imageURL": "https://blog.serenataflowers.com/pollennation/wp-content/uploads/2016/05/original-happy-birthday-messages-FT.gif",
                    "eventID": "1"
                },
                {
                    "ID": "3",
                    "from": "Samah seh",
                    "wishContent": "I wish that your birthday brings a new year as sweet, peppy and fiery as you my dear. Happy birthday.",
                    "imageURL": "https://blog.serenataflowers.com/pollennation/wp-content/uploads/2016/05/original-happy-birthday-messages-FT.gif",
                    "eventID": "1"
                }]);
        }
    }
    async login(email, password) {
        const result = await api.login(email, password);
        if (result.error) {
            alert(result.error);
            return;
        }
        const res = await api.myEvents(result.userId);
        if (res.error) {
            alert(res.error);
            return;
        }
        console.log(res.id);
        console.log(result.userId);
        const user = { name: 'amir', userID: result.userId };
        this.setState(user);
        localStorageManager.login(user);
        this.state.history.push("/AlertDismissible");
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
