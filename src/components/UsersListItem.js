import React from 'react';
import { GoTrashcan } from 'react-icons/go';
import { useThunk } from '../hooks/useThunk';
import { removeUser } from '../store';
import AlbumsList from './AlbumsList';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';

function UsersListItem({ user }) {
  const [doRemoveUser, isRemovingUser, removingUserError] =
    useThunk(removeUser);

  const handleClick = () => {
    doRemoveUser(user);
  };

  const header = (
    <>
      <Button className='mr-3' loading={isRemovingUser} onClick={handleClick}>
        <GoTrashcan />
      </Button>
      {removingUserError && <div>Error deleting user.</div>}
      {user.name}
    </>
  );
  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
