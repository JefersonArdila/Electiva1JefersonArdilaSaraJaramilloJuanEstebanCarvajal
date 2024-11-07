import React, { useState, useEffect } from "react";
import { Container, Header, TabsContainer, Tab } from "./styles";
import { TweetBox } from "./TweetBox";
import { Posts } from "./Posts";
import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Button } from "@mui/material";

export const Home = ({
  selectedTab,
  setSelectedTab,
  showFollowingUsers,
  showFollowersUsers,
  username,
}) => {
  const [post, setPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Usuarios quemados, pend cambiar
  const followingUsersHardcoded = [
    {
      id: 1,
      name: "Armando Casas",
      username: "armando_casas",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Elsa Capunta",
      username: "elsa_capunta",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Estela Nada",
      username: "estela_nada",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: 4,
      name: "Deborah Mente",
      username: "deborah_mente",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "Tomas Tono",
      username: "tomas_tono",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 6,
      name: "Benito Camela",
      username: "benito_camela",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      id: 7,
      name: "Susana Oria",
      username: "susana_oria",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      id: 8,
      name: "Dolores Fuertes",
      username: "dolores_fuertes",
      avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      id: 9,
      name: "Elba Surita",
      username: "elba_surita",
      avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    },
    {
      id: 10,
      name: "Rosa Melano",
      username: "rosa_melano",
      avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
      id: 11,
      name: "Luz Rallo",
      username: "luz_rallo",
      avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    },
    {
      id: 12,
      name: "Ana Conda",
      username: "ana_conda",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      id: 13,
      name: "Juan Dicion",
      username: "juan_dicion",
      avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    },
  ];

  const [followingStatus, setFollowingStatus] = useState({});
  const toggleFollowing = (userId) => {
    setFollowingStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: !prevStatus[userId], // Cambia entre seguir y dejar de seguir quemado
    }));
  };

  //Seguidores quemados

  const followersUsersHardcoded = [
    {
      id: 1,
      name: "Roberto Tuerca",
      username: "roberto_tuerca",
      avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    },
    {
      id: 2,
      name: "Paco Tilla",
      username: "paco_tilla",
      avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    },
    {
      id: 3,
      name: "Alma Madero",
      username: "alma_madero",
      avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    },
    {
      id: 4,
      name: "Aitor Tilla",
      username: "aitor_tilla",
      avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    },
    {
      id: 5,
      name: "Margarita Flores",
      username: "margarita_flores",
      avatar: "https://randomuser.me/api/portraits/women/18.jpg",
    },
    {
      id: 6,
      name: "Pepe Roni",
      username: "pepe_roni",
      avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    },
    {
      id: 7,
      name: "Mónica Galindo",
      username: "monica_galindo",
      avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    },
    {
      id: 8,
      name: "Justo Nacimiento",
      username: "justo_nacimiento",
      avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    },
    {
      id: 9,
      name: "Carlos Romero",
      username: "carlos_romero",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      id: 10,
      name: "Amparo Salas",
      username: "amparo_salas",
      avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    },
    {
      id: 11,
      name: "Eva Gélida",
      username: "eva_gelida",
      avatar: "https://randomuser.me/api/portraits/women/24.jpg",
    },
    {
      id: 12,
      name: "Óscar Terra",
      username: "oscar_terra",
      avatar: "https://randomuser.me/api/portraits/men/25.jpg",
    },
    {
      id: 13,
      name: "Elena Nito",
      username: "elena_nito",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    },
    {
      id: 14,
      name: "Pedro Nador",
      username: "pedro_nador",
      avatar: "https://randomuser.me/api/portraits/men/27.jpg",
    },
    {
      id: 15,
      name: "Lorenzo Melón",
      username: "lorenzo_melon",
      avatar: "https://randomuser.me/api/portraits/men/28.jpg",
    },
  ];

  // post desdr firebase
  const getPost = () => {
    const postsCollection = collection(db, "posts");
    const postsQuery = query(postsCollection, orderBy("timestamp", "desc"));

    onSnapshot(postsQuery, (res) => {
      const docs = [];
      res.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setPost(docs);
    });
  };

  useEffect(() => {
    if (
      selectedTab === "for-you" &&
      !showFollowingUsers &&
      !showFollowersUsers
    ) {
      getPost();
    }
  }, [selectedTab, showFollowingUsers, showFollowersUsers]);

  // paginacion de todo en gneral
  const paginate = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };

  const currentPosts = paginate(post, currentPage);
  const followingUsersPaginated = paginate(
    followingUsersHardcoded,
    currentPage
  );
  const followersUsersPaginated = paginate(
    followersUsersHardcoded,
    currentPage
  );

  // Manejador para saber hasta cuando aparece next
  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === "next") return prevPage + 1;
      if (direction === "prev" && prevPage > 1) return prevPage - 1;
      return prevPage;
    });
  };

  return (
    <Container>
      <Header>
        <TabsContainer>
          <Tab
            active={selectedTab === "for-you"}
            onClick={() => setSelectedTab("for-you")}
          >
            For you
          </Tab>
          <Tab
            active={selectedTab === "following"}
            onClick={() => setSelectedTab("following")}
          >
            Following
          </Tab>
        </TabsContainer>
      </Header>

      {/* Mostrar tweets desde Firebase cuando la pestaña es "For you" */}
      {!showFollowingUsers &&
        !showFollowersUsers &&
        selectedTab === "for-you" && (
          <>
            <TweetBox />
            {currentPosts.map((post) => (
              <Posts
                key={post.id}
                name={post.name}
                username={post.username}
                verified={post.verified}
                text={post.text}
                avatar={post.avatar}
                imagePost={post.imagePost}
              />
            ))}

            <div>
              {currentPage > 1 && (
                <Button onClick={() => handlePageChange("prev")}>
                  Previous
                </Button>
              )}
              {currentPage * itemsPerPage < post.length && (
                <Button onClick={() => handlePageChange("next")}>Next</Button>
              )}
            </div>
          </>
        )}

      {/* Mostrar lista de usuarios seguidos cuando se hace clic en Following */}
      {showFollowingUsers && (
        <>
          {followingUsersPaginated.map((user) => (
            <Posts
              key={user.id}
              name={user.name}
              username={user.username}
              verified={true}
              text=""
              avatar={user.avatar}
              imagePost={null}
            />
          ))}

          <div>
            {currentPage > 1 && (
              <Button onClick={() => handlePageChange("prev")}>Previous</Button>
            )}
            {currentPage * itemsPerPage < followingUsersHardcoded.length && (
              <Button onClick={() => handlePageChange("next")}>Next</Button>
            )}
          </div>
        </>
      )}

      {/* Mostrar lista de usuarios seguidores cuando se hace clic en Followers */}
      {showFollowersUsers && (
        <>
          {followersUsersPaginated.map((user, index) => (
            <>
              <Posts
                key={index}
                name={user.name}
                username={user.username}
                verified={true}
                text=""
                avatar={user.avatar}
                imagePost={null}
              />
              <button
                onClick={() => toggleFollowing(user.username)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: followingStatus[user.username]
                    ? "#ccc"
                    : "#1da1f2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {followingStatus[user.username] ? "Siguiendo" : "Seguir"}
              </button>
            </>
          ))}

          <div>
            {currentPage > 1 && (
              <Button onClick={() => handlePageChange("prev")}>Previous</Button>
            )}
            {currentPage * itemsPerPage < followersUsersHardcoded.length && (
              <Button onClick={() => handlePageChange("next")}>Next</Button>
            )}
          </div>
        </>
      )}
    </Container>
  );
};
