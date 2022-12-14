import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRankList } from './store/index'
import Loading from '../../components/loading';
import {
  List, 
  ListItem,
  SongList,
  Container
} from './style';
import Scroll from '../../components/scroll/index';
import { EnterLoading } from './../Singers/style';
import { filterIndex } from '../../api/utils';
// import { renderRoutes } from 'react-router-config';
import {useNavigate} from 'react-router-dom'
import { Outlet } from 'react-router-dom';

function Rank(props) {
  const navigate = useNavigate()
  const { rankList:list, loading, songsCount } = props;

  const { getRankListDataDispatch } = props;

  let rankList = list ? list.toJS() : [];

  useEffect(() => {
    if(!rankList.length){
      getRankListDataDispatch();
    }
    // eslint-disable-next-line
  }, []);

  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  const enterDetail = (detail) => {
    navigate(`/rank/${detail.id}`)
  }
  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index+1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  }
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
       {
        list.map((item,index) => {
          return (
            <ListItem key={item.accountId+""+index} tracks={item.tracks} onClick={() => enterDetail(item)}>
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt=""/>
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              { renderSongList(item.tracks)  }
            </ListItem>
          )
       })
      } 
      </List>
    )
  }

  let displayStyle = loading ? {"display":"none"}:  {"display": ""};
  return (
    <Container play={songsCount}>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>?????????</h1>
            { renderRankList(officialList) }
          <h1 className="global" style={displayStyle}>?????????</h1>
            { renderRankList(globalList, true) }
          { loading ? <EnterLoading><Loading></Loading></EnterLoading> : null }
        </div>
      </Scroll> 
      <Outlet/>
    </Container>
    );
}

// ??????Redux?????????state????????????props???
const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading']),
  songsCount: state.getIn(['player', 'playList']).size
});
// ??????dispatch???props???
const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch() {
      dispatch(getRankList());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));