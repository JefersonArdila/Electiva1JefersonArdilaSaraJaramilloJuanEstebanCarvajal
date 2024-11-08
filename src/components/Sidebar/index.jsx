import React, { useState, useEffect } from 'react';
import { Contenedor, UserInfoContainer, UserStats, UserHeader } from './styles';
import XIcon from '@mui/icons-material/X';
import { IconOption } from './IconOption';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

export const Sidebar = ({
  onFollowingClick,
  onFollowersClick,
  selectedUser,
  onLogoClick,
}) => {
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = selectedUser ? selectedUser.username : auth.currentUser?.uid;
      if (userId) {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            FullName: userData.fullName || 'Nombre Completo',
            Username: userData.username,
          });
          setFollowingCount(userData.usersFollowing ? userData.usersFollowing.length : 0);
          setFollowersCount(userData.usersFollowers ? userData.usersFollowers.length : 0);
        } else {
          setUser({
            FullName: 'Nombre Completo',
            Username: 'Username',
          });
          setFollowingCount(0);
          setFollowersCount(0);
        }
      }
    };
    fetchUserData();
  }, [selectedUser]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Contenedor>
      <XIcon className="XLogo" onClick={onLogoClick} style={{ cursor: 'pointer' }} />

      {user && (
        <UserHeader>
          <h2>{user.FullName}</h2>
          <p>@{user.Username}</p>
        </UserHeader>
      )}

      <UserInfoContainer>
        <UserStats>
          <h4>Following</h4>
          <p onClick={onFollowingClick} style={{ cursor: 'pointer' }}>{followingCount}</p>
        </UserStats>
        <UserStats>
          <h4>Followers</h4>
          <p onClick={onFollowersClick} style={{ cursor: 'pointer' }}>{followersCount}</p>
        </UserStats>
      </UserInfoContainer>

      <br />

      <IconOption active text="Home" Icon={HomeRoundedIcon} onClick={onLogoClick} />
      <IconOption text="Explore" Icon={SearchRoundedIcon} />
      <IconOption text="Notifications" Icon={NotificationsNoneRoundedIcon} />
      <IconOption text="Messages" Icon={MailOutlineRoundedIcon} />

      <Button variant="outlined" fullWidth onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </Contenedor>
  );
};
