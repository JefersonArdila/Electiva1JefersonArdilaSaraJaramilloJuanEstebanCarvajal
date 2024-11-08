import React, { useState, useEffect } from 'react';
import { Container, Header, TabsContainer, Tab } from "./styles";
import { TweetBox } from "./TweetBox";
import { Posts } from "./Posts";
import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

export const Home = () => {
    const [post, setPost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [selectedTab, setSelectedTab] = useState('for-you');

    const getPost = () => {
        const postsCollection = collection(db, "posts");
        const postsQuery = query(postsCollection, orderBy("timestamp", "desc"));
        
        onSnapshot(postsQuery, (res) => {
            const docs = [];
            res.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setPost(docs);
        });
    };

    useEffect(() => {
        getPost();
    }, []);

    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(post.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Container>
            <Header>
                <TabsContainer>
                    <Tab 
                        active={selectedTab === 'for-you'}
                        onClick={() => setSelectedTab('for-you')}
                    >
                        For you
                    </Tab>
                    <Tab 
                        active={selectedTab === 'following'}
                        onClick={() => setSelectedTab('following')}
                    >
                        Following
                    </Tab>
                </TabsContainer>
            </Header>

            <TweetBox />
            {currentPosts.map((post) => (
                <Posts
                    key={post.id}
                    name={post.name}
                    username={post.name}
                    verified={post.verified}
                    text={post.text}
                    avatar={post.avatar}
                    imagePost={post.imagePost}
                />
            ))}

            <div className="pagination">
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => paginate(number)}>
                        {number}
                    </button>
                ))}
            </div>
        </Container>
    );
};
