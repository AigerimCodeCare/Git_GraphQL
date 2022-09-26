import * as React from 'react';
import { StyleSheet, FlatList, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import {
  ActivityIndicator, Card, Paragraph, Button,
} from 'react-native-paper';
import { useState, useEffect } from 'react';
import { Route } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList, RepositoriesParamList } from '../../types';
import Repository from '../github-model/GithubRepo';
import Repositories from '../github-model/GithubRepos';
import getRepositories from '../github-model/repoQuery';
import getRepository from '../github-model/oneRepoQuery';


/**
 * @param param0 navigation function and route params
 * @returns the Repositories screen
 */
export default function RepositoriesScreen({ navigation, route }:
  {
    navigation: BottomTabNavigationProp<BottomTabParamList, 'Repositories'>,
    route: Route<'Repositories', RepositoriesParamList['RepositoriesScreen']>
  }): JSX.Element {
  const [repositories, setRepositories] = useState<null | Repositories>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [text, onChangeText] = React.useState("");
  /**
   * Initialize the Repositories data
   */
  useEffect(() => {
    getRepositories(route.params?.login).then(
      (response: Repositories) => { setRepositories(null); setRepositories(response); },
      (error: Error) => { setErrorMsg(error.message); },
    );
  }, [route.params?.login]);

  if (errorMsg !== null) {
    return <Text style={styles.container}>{errorMsg}</Text>;
  }

  const handleRepo =(a:string)=>{
    getRepository(route.params?.login, a).then(
      (response: any) => { console.log(response);
      },
      (error: Error) => { setErrorMsg(error.message); },
    );
  }
  return (
    <ScrollView >
      {repositories === null ? <View style={styles.container}><ActivityIndicator animating size="large" /></View>
        : (
          <View>
            <View style={styles.form}>
              <TextInput style={styles.input} onChangeText={onChangeText}
                value={text} />
              <TouchableOpacity style={styles.btn}
              onPress={()=>handleRepo(text)}><Text>Find</Text></TouchableOpacity>
            </View>
            {repositories?.repositories.map((item: Repository) => {
              return (
                <View style={{ margin: 10 }}>
                  <Card.Title title={item.name} />
                  <Card.Content>
                    <Button
                      style={{ width: 300 }}
                      icon="github"
                      mode="outlined"
                      onPress={() => navigation.navigate('Profile', { params: { login: item?.owner }, screen: 'ProfileScreen' })}
                    >
                      {item?.owner}
                    </Button>
                    <Paragraph>{item?.description}</Paragraph>
                  </Card.Content>
                </View>
              )
            })}
          </View>
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 35,
  },
  form: {
    width: '90%',
    height: 80,
    flexDirection: 'row',
    marginLeft: '5%',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    height: 55,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 15,
    alignItems: 'center',
    fontSize: 20
  },
  btn: {
    width: '20%',
    height: 55,
    backgroundColor: 'gray',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});