import { useState, useEffect } from "react";

import { collection, query, onSnapshot } from "firebase/firestore";

import { db } from "../../utils/db/firebaseConfig";

import { Route } from "react-router-dom";

import "../../styles/components/layout/Nav.scss";

import ChannelNav from "../micro/chat/ChannelNav";
import HomeNav from "../macro/home/HomeNav";
import NotificationSideBar from "../micro/notification/SideBar";
import BlastSideBar from "../micro/blast/SideBar";

function Nav({ businessId, setCustomerId }) {
    return (
        <div className="Nav">
            <div className="User">
                <picture>
                    <source
                        srcSet="https://placekitten.com/64/64"
                        type="image/webp"
                    />
                    <img
                        className="UserImage"
                        alt="whatever"
                        src="https://placekitten.com/64/64"
                    />
                </picture>

                <div>
                    <div>Ryan Florence</div>
                    <div>
                        <button className="textButton">log out</button>
                    </div>
                </div>
            </div>
            <nav className="LinkNav">
                <HomeNav />

                <Route path="/business/chat">
                    <ChannelNav />
                </Route>

                <Route path="/business/notification">
                    <NotificationSideBar />
                </Route>

                <Route path="/business/sms">
                    <BlastSideBar />
                </Route>
            </nav>
        </div>
    );
}

export default Nav;
