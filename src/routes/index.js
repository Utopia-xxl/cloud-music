//routes/index.js
import React from 'react';
import { useRoutes, Navigate } from "react-router-dom";
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';
import Album from '../application/Album';
import Singer from '../application/Singer';

function MyRouter () {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
      children:[
        {
          path:"/",
          element: <Navigate to={"/recommend"}/>,
        },
        {
          // index: true,
          path: "/recommend",
          element:<Recommend/>,
          children:[
            {
              path: "/recommend:id",
              element: <Album/>
            }
          ]
        },
        {
          path:"/singers",
          element:<Singers/>,
          children:[
            {
              path:"/singers/:id",
              element: <Singer/>
            }
          ]
        },
        {
          path:"/rank",
          element:<Rank/>,
          key: "rank",
          children:[
            {
              path: "/rank/:id",
              element: <Album/>
            }
          ]
        }
      ]
    }
  ]);
  return element;
}

export default MyRouter;