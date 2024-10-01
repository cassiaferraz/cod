
import React, { useState } from 'react';
import avatar1 from '/public/avatar/Avatar1.png'
import avatar2 from '/public/avatar/Avatar2.png'
import avatar3 from '/public/avatar/Avatar3.png'
import avatar4 from '/public/avatar/Avatar4.png'
import avatar5 from '/public/avatar/Avatar5.png'
import avatar6 from '/public/avatar/Avatar6.png'
import avatar7 from '/public/avatar/Avatar7.png'
import avatar8 from '/public/avatar/Avatar8.png'
import avatar9 from '/public/avatar/Avatar9.png'
import avatar10 from '/public/avatar/Avatar10.png'
import avatar11 from '/public/avatar/Avatar11.png'
import avatar12 from '/public/avatar/Avatar12.png'
import avatar13 from '/public/avatar/Avatar13.png'
import avatar14 from '/public/avatar/Avatar14.png'
import avatar15 from '/public/avatar/Avatar15.png'
import avatar16 from '/public/avatar/Avatar16.png'
import avatar17 from '/public/avatar/Avatar17.png'
import avatar18 from '/public/avatar/Avatar18.png'
import avatar19 from '/public/avatar/Avatar19.png'
import avatar20 from '/public/avatar/Avatar20.png'

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
  avatar15,
  avatar16,
  avatar17,
  avatar18,
  avatar19,
  avatar20
];

function AvatarSelector({ onSelect }) {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleSelect = (avatar) => {
    setSelectedAvatar(avatar);
    onSelect(avatar);
    console.log('avatars:', avatars)
  };

  return (
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {avatars.map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`Avatar ${index + 1}`}
          onClick={() => handleSelect(avatar)}
          style={{
            cursor: 'pointer',
            border: selectedAvatar === avatar ? '4px solid rgb(102, 0, 153)' : 'none',
            borderRadius: '50%',
            width: '100px',
            height: '100px',
          }}
        />
      ))}
    </div>
  );
}

export default AvatarSelector;