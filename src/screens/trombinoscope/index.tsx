import React, {useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
import {Character} from '../../components';
import type {characterType} from '../../components';

function Trombinoscope(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<characterType[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<characterType[]> => {
      const response = await fetch(
        'https://hp-api.onrender.com/api/characters/students',
      );
      const fetchedData = await response.json();
      return fetchedData;
    };

    fetchData()
      .then(result => setData(result))
      .catch(error => console.log('Error', error.message));
    setLoading(false);

    return () => {
      setLoading(true);
    };
  }, []);

  return loading ? (
    <Text>Loading...</Text>
  ) : (
    <FlatList
      data={data}
      renderItem={({item}) => <Character key={item.id} {...item} />}
      keyExtractor={item => item.id}
    />
  );
}

export default Trombinoscope;
