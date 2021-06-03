import React from "react";

import { Redirect } from "react-router-dom";

import WYRecommend from '../pages/discover/c-pages/recommend'
import WYAlbum from '../pages/discover/c-pages/album'
import WYArtist from '../pages/discover/c-pages/artist'
import WYRanking from '../pages/discover/c-pages/ranking'
import WYDjradio from '../pages/discover/c-pages/djradio'
import WYSongs from '../pages/discover/c-pages/songs'

import WYDiscover from "@/pages/discover";
import WYMine from "@/pages/mine";
import WYFriend from "@/pages/friend";

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