import React from "react";

import { Redirect } from "react-router-dom";

const WYDiscover = React.lazy(() => import("../pages/discover"));
const WYRecommend = React.lazy(() => import("../pages/discover/c-pages/recommend"));
const WYRanking = React.lazy(() => import("../pages/discover/c-pages/ranking"));
const WYSongs = React.lazy(() => import("../pages/discover/c-pages/songs"));
const WYDjradio = React.lazy(() => import("../pages/discover/c-pages/djradio"));
const WYArtist = React.lazy(() => import("../pages/discover/c-pages/artist"));
const WYAlbum = React.lazy(() => import("../pages/discover/c-pages/album"));

const WYPlayer = React.lazy(() => import("../pages/player"));
const WYFriend = React.lazy(() => import("../pages/friend"));
const WYMine = React.lazy(() => import("../pages/mine"));


// import WYDiscover from "../pages/discover";
// import WYRecommend from '../pages/discover/c-pages/recommend'
// import WYAlbum from '../pages/discover/c-pages/album'
// import WYArtist from '../pages/discover/c-pages/artist'
// import WYRanking from '../pages/discover/c-pages/ranking'
// import WYDjradio from '../pages/discover/c-pages/djradio'
// import WYSongs from '../pages/discover/c-pages/songs'

// import WYPlayer from '../pages/player'
// import WYMine from "../pages/mine";
// import WYFriend from "../pages/friend";

const routes = [
  {
    path: "/",
    exact: true,
    // component: WYDiscover,
    render: () => <Redirect to="/discover" />,
  },
  {
    path: "/discover",
    component: WYDiscover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => <Redirect to="/discover/recommend" />,
      },
      {
        path: "/discover/recommend",
        component: WYRecommend,
      },
      {
        path: "/discover/ranking",
        component: WYRanking,
      },
      {
        path: "/discover/songs",
        component: WYSongs,
      },
      {
        path: "/discover/djradio",
        exact: true,
        component: WYDjradio,
      },
      {
        path: "/discover/artist",
        component: WYArtist,
      },
      {
        path: "/discover/album",
        component: WYAlbum,
      },
      {
        path: "/discover/player",
        component: WYPlayer,
      }
    ],
  },
  {
    path: "/mine",
    component: WYMine,
  },
  {
    path: "/friend",
    component: WYFriend,
  },
];

export default routes;