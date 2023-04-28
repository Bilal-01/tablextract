import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function LogoutButton ( {navigation} ) {

  

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};

