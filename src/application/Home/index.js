import React from 'react';
import {
  Top,
  Tab,
  TabItem,
} from './style';
import { NavLink, Outlet } from 'react-router-dom';// 利用 NavLink 组件进行路由跳转
import Player from '../Player';
import {useNavigate} from 'react-router-dom';

function Home (){
  const navigate = useNavigate()
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">Web App</span>
        <span className="iconfont search" onClick={() => navigate('/search')}>&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" className={({ isActive }) => {return isActive ? 'selected' : ''}}><TabItem><span > 推荐 </span></TabItem></NavLink>
        <NavLink to="/singers" className={({ isActive }) => {return isActive ? 'selected' : ''}}><TabItem><span > 歌手 </span></TabItem></NavLink>
        <NavLink to="/rank" className={({ isActive }) => {return isActive ? 'selected' : ''}}><TabItem><span > 排行榜 </span></TabItem></NavLink>
      </Tab>
      <Outlet/>
      <Player></Player>
    </div>
  );
}

export default React.memo(Home);