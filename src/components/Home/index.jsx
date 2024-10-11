import React, { useState, useEffect } from 'react';
import { Container, Header, TabsContainer, Tab } from "./styles";
import { TweetBox } from "./TweetBox";
import { Posts } from "./Posts";
import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

export const Home = () => {
    const [post, setPost] = useState([]);
    const [selectedTab, setSelectedTab] = useState('for-you');

    const getPost = () => {
        const postsCollection = collection(db, "posts");
        const postsQuery = query(postsCollection, orderBy("timestamp", "desc"));
        
        onSnapshot(postsQuery, (res) => {
            const docs = [];
            res.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id });
                console.log({ ...doc.data(), id: doc.id });
            });
            setPost(docs);
        });
    };

    useEffect(() => {
        getPost()
    }, [])

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
            {post.map((post) => (
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
        </Container>
    );
};