import React, { useState, useEffect } from 'react';
import { Contenedor, UserInfoContainer, UserStats, UserHeader } from './styles';
import XIcon from '@mui/icons-material/X';
import { IconOption } from './IconOption';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import BrowserNotSupportedRoundedIcon from '@mui/icons-material/BrowserNotSupportedRounded';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import BoltIcon from '@mui/icons-material/Bolt';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Button } from '@mui/material';
import { signOut, onAuthStateChanged } from 'firebase/auth'; 
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

export const Sidebar = ({ onFollowingClick, onFollowersClick }) => {
  const [followingCount, setFollowingCount] = useState(13);
  const [followersCount, setFollowersCount] = useState(15);
  const [user, setUser] = useState(null); 

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Obtener los datos del usuario desde Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            FullName: userData.fullName || "Nombre Completo", // Ajuste para nombres cuando no estaba fiuncionalidad
            Username: userData.username,
          });
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

 
  useEffect(() => {
    setFollowingCount(13);
    setFollowersCount(15);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Contenedor>
      <XIcon className='XLogo' />

      {/* Muestra el nombre completo y el username del usuario */}
      {user && (
        <UserHeader>
          <h2>{user.FullName}</h2>
          <p>@{user.Username}</p>
        </UserHeader>
      )}

      <UserInfoContainer>
        {/* Sección de "Following" */}
        <UserStats>
          <h4>Following</h4>
          <p onClick={onFollowingClick} style={{ cursor: 'pointer' }}>{followingCount}</p>
        </UserStats>

        {/* Sección de "Followers" */}
        <UserStats>
          <h4>Followers</h4>
          <p onClick={onFollowersClick} style={{ cursor: 'pointer' }}>{followersCount}</p>
        </UserStats>
      </UserInfoContainer>

      <br />

      {/* Opciones del menú */}
      <IconOption active text="Home" Icon={HomeRoundedIcon} />
      <IconOption text="Explore" Icon={SearchRoundedIcon} />
      <IconOption text="Notifications" Icon={NotificationsNoneRoundedIcon} />
      <IconOption text="Messages" Icon={MailOutlineRoundedIcon} />
      <IconOption text="Grok" Icon={BrowserNotSupportedRoundedIcon} />
      <IconOption text="Communities" Icon={PeopleOutlineIcon} />
      <IconOption primary text="Premium" Icon={XIcon} />
      <IconOption primary text="Business" Icon={BoltIcon} />
      <IconOption primary text="Profile" Icon={PermIdentityOutlinedIcon} />
      <IconOption primary text="More" Icon={MoreHorizOutlinedIcon} />

      <br />
      <br />

      {/* Botón para cerrar sesión */}
      <Button variant='outlined' fullWidth onClick={handleLogout}>Cerrar sesión</Button>
    </Contenedor>
  );
};
