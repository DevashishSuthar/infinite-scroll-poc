import React, { useState } from 'react';

import InfiniteScroll from 'react-infinite-scroller';

const InfiniteScrollView = () => {
    const [postsData, setPostsData] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(25);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchDataFromAPI = async () => {
        try {
            setIsLoading(true);
            const apiEndpoint = `https://jsonplaceholder.typicode.com/posts?_page=${pageNo}&_limit=${limit}`;
            const apiResponse = await fetch(apiEndpoint, { method: 'GET' });
            const response = await apiResponse.json();
            console.log('RESPONSE: ', response);
            if (response && response.length) {
                setPageNo(pageNo + 1);
                setPostsData([...postsData, ...response]);
            } else {
                setHasMore(false);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const loadMorePostsData = () => {
        if (isLoading) return;
        fetchDataFromAPI();
    };

    return (
        <div>
            <h2>InfiniteScroll</h2>
            <div style={{ border: '1px solid black', height: 500, overflow: 'auto', }}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMorePostsData}
                    hasMore={hasMore}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    useWindow={false}
                >
                    {postsData && postsData.length ? (
                        <>
                            {postsData.map((postObj, index) => (
                                <div key={index} style={{ border: '1px solid black', width: '80%', marginLeft: '10%', marginTop: '2%' }}>
                                    <h4>UserId:- {postObj.userId}</h4>
                                    <h4>Id:- {postObj.id}</h4>
                                    <h5>Title:- {postObj.title}</h5>
                                    <h5>Body:- {postObj.body}</h5>
                                </div>

                            ))}
                        </>
                    ) : null}
                </InfiniteScroll>
                {isLoading ? <span>Loading posts data...</span> : null}
            </div>
        </div>
    )
};

export default InfiniteScrollView;