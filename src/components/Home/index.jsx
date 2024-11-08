import React, { useState, useEffect, useCallback } from "react";
import { Container, Header, TabsContainer, Tab } from "./styles";
import { TweetBox } from "./TweetBox";
import { Posts } from "./Posts";
import { db, auth } from "../../firebase";
import { collection, onSnapshot, orderBy, query, doc, getDoc, getDocs, where, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Button } from "@mui/material";

export const Home = ({
  selectedTab,
  setSelectedTab,
  showFollowingUsers,
  showFollowersUsers,
  username,
  selectedUser,
  onUserClick,
}) => {
  const [posts, setPosts] = useState([]);
  const [userList, setUserList] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Cargar la lista de usuarios (seguidores o seguidos)
  const loadUserList = useCallback(async (isFollowers) => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRelation = isFollowers ? userData.usersFollowers : userData.usersFollowing;

        console.log("userRelation:", userRelation); // Verificar los usuarios relacionados

        if (userRelation && userRelation.length > 0) {
          const usersQuery = query(
            collection(db, "users"),
            where("username", "in", userRelation)
          );
          const userSnapshots = await getDocs(usersQuery);
          setUserList(userSnapshots.docs.map((doc) => doc.data()));
        } else {
          setUserList([]);
        }
      } else {
        console.error("No se encontró el documento del usuario autenticado.");
      }
    } else {
      console.error("No hay usuario autenticado.");
    }
  }, []);

  // Cargar los posts del usuario seleccionado o de todos los usuarios
  const loadPosts = useCallback((username = null) => {
    const postsCollection = collection(db, "posts");
    const postsQuery = username
      ? query(postsCollection, where("username", "==", username), orderBy("timestamp", "desc"))
      : query(postsCollection, orderBy("timestamp", "desc"));

    onSnapshot(postsQuery, (res) => {
      const loadedPosts = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPosts(loadedPosts);
    });
  }, []);

  useEffect(() => {
    if (showFollowersUsers) {
      loadUserList(true);
    } else if (showFollowingUsers) {
      loadUserList(false);
    } else {
      loadPosts(selectedUser?.username);
    }
  }, [showFollowersUsers, showFollowingUsers, selectedUser, loadUserList, loadPosts]);

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === "next") return prevPage + 1;
      if (direction === "prev" && prevPage > 1) return prevPage - 1;
      return prevPage;
    });
  };

  // Función para paginar los datos
  const currentData = (data) => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };

  const currentPosts = currentData(posts);
  const currentUsers = currentData(userList);

  const handleFollowToggle = async (username) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const currentUserDocRef = doc(db, 'users', currentUser.uid);
      const selectedUserDocRef = doc(db, 'users', username);

      const currentUserDoc = await getDoc(currentUserDocRef);
      const selectedUserDoc = await getDoc(selectedUserDocRef);

      if (currentUserDoc.exists() && selectedUserDoc.exists()) {
        const isFollowing = currentUserDoc.data().usersFollowing?.includes(username);

        if (isFollowing) {
          // Dejar de seguir
          await updateDoc(currentUserDocRef, {
            usersFollowing: arrayRemove(username),
          });
          await updateDoc(selectedUserDocRef, {
            usersFollowers: arrayRemove(currentUser.uid),
          });
        } else {
          // Seguir
          await updateDoc(currentUserDocRef, {
            usersFollowing: arrayUnion(username),
          });
          await updateDoc(selectedUserDocRef, {
            usersFollowers: arrayUnion(currentUser.uid),
          });
        }

        // Recargar las listas de usuarios
        loadUserList(true);
        loadUserList(false);
      } else {
        console.error("El documento del usuario no existe.");
      }
    } else {
      console.error("No hay usuario autenticado.");
    }
  };

  return (
    <Container>
      <Header>
        <TabsContainer>
          <Tab active={selectedTab === "for-you"} onClick={() => setSelectedTab("for-you")}>For you</Tab>
          <Tab active={selectedTab === "following"} onClick={() => setSelectedTab("following")}>Following</Tab>
        </TabsContainer>
      </Header>

      {/* Mostrar caja de tweets y listado de posts */}
      {!showFollowingUsers && !showFollowersUsers && selectedTab === "for-you" && (
        <>
          <TweetBox />
          {currentPosts.length > 0 ? currentPosts.map((post) => (
            <Posts
              key={post.id}
              name={post.name}
              username={post.username}
              verified={post.verified}
              text={post.text}
              avatar={post.avatar}
              imagePost={post.imagePost}
            />
          )) : <p>No hay tweets para mostrar</p>}
          
          <div>
            {currentPage > 1 && <Button onClick={() => handlePageChange("prev")}>Previous</Button>}
            {currentPage * itemsPerPage < posts.length && <Button onClick={() => handlePageChange("next")}>Next</Button>}
          </div>
        </>
      )}

      {/* Mostrar lista de usuarios seguidos cuando se hace clic en Following */}
      {showFollowingUsers && (
        <>
          {currentUsers.length > 0 ? currentUsers.map((user, index) => (
            <div key={index}>
              <Posts
                name={<span onClick={() => onUserClick(user)}>{user.fullName || user.username}</span>}
                username={user.username}
                verified={true}
                text=""
                avatar={user.avatar}
                imagePost={null}
              />
              <Button variant="contained" onClick={() => handleFollowToggle(user.username)}>
                Dejar de Seguir
              </Button>
            </div>
          )) : <p>Sin usuarios para mostrar</p>}
          <div>
            {currentPage > 1 && <Button onClick={() => handlePageChange("prev")}>Previous</Button>}
            {currentPage * itemsPerPage < userList.length && <Button onClick={() => handlePageChange("next")}>Next</Button>}
          </div>
        </>
      )}

      {/* Mostrar lista de seguidores cuando se hace clic en Followers */}
      {showFollowersUsers && (
        <>
          {currentUsers.length > 0 ? currentUsers.map((user, index) => (
            <div key={index}>
              <Posts
                name={<span onClick={() => onUserClick(user)}>{user.fullName || user.username}</span>}
                username={user.username}
                verified={true}
                text=""
                avatar={user.avatar}
                imagePost={null}
              />
              <Button variant="contained" onClick={() => handleFollowToggle(user.username)}>
                Seguir
              </Button>
            </div>
          )) : <p>Sin usuarios para mostrar</p>}
          <div>
            {currentPage > 1 && <Button onClick={() => handlePageChange("prev")}>Previous</Button>}
            {currentPage * itemsPerPage < userList.length && <Button onClick={() => handlePageChange("next")}>Next</Button>}
          </div>
        </>
      )}
    </Container>
  );
};
