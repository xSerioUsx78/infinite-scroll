import { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';


const Index = () => {

  const [posts, setPosts] = useState({
    next: '',
    results: []
  });
  const [url, setUrl] = useState(`http://127.0.0.1:8000/posts/?limit=15&offset=0`);
  const [q, setQ] = useState('');
  const [more, setMore] = useState(false);
  
  useEffect(() => {
    let cancel;
    const fetchPosts = async () => {
      try {
        const res = await axios.get(url, {
          cancelToken: new axios.CancelToken(c => cancel = c)
        });
        setPosts(prevPosts => ({
          ...prevPosts,
          next: res.data.next,
          results: prevPosts.results.concat(res.data.results)
        }));
        res.data.next ? setMore(true) : setMore(false);
      } catch (e) {
        if (axios.isCancel(e)) return;
        console.log(e.response.data);
      }
    }
    fetchPosts();
    return () => cancel();
  }, [q, url]);

  const handleOnSearch = (e) => {
    let q = e.target.value;
    setQ(q);
    setPosts({
      next: '',
      results: []
    })
    setUrl(`http://127.0.0.1:8000/posts/?limit=15&offset=0&q=${q}`);
  }

  const handleNext = () => {
    more && setUrl(posts.next);
  }

  // const onScroll = (e) => {
  //   let clientHeight = e.nativeEvent.srcElement.clientHeight;
  //   let scrollHeight = e.nativeEvent.srcElement.scrollHeight;
  //   let scrollTop = e.nativeEvent.srcElement.scrollTop;
  //   if ((scrollHeight - scrollTop) === clientHeight && posts.next) {
  //     console.log(scrollHeight - scrollTop, clientHeight);
  //     setUrl(posts.next);
  //   }
  // }

  return (
    <div id="scrollable" style={{height: '100vh', overflowY: 'auto'}}>
      <InfiniteScroll
      dataLength={posts.results.length}
      next={handleNext}
      hasMore={more}
      loader={<h4>Loading...</h4>}
      scrollableTarget="scrollable"
      >
        <input onChange={handleOnSearch} />
        {posts.results.length > 0 
        ?
        posts.results.map((post) => (
          <div key={post.id}>
            <div>
              <h4>{post.title}</h4>
            </div>
            <div>
              <p>{post.text}</p>
            </div>
          </div>
        ))
        :
        <p>No data found!</p>
        }
      </InfiniteScroll>
    </div>
  );
}
 
export default Index;