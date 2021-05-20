import React, {useState, useEffect} from 'react';
import {Searchbar, List, Appbar} from 'react-native-paper';
import {StyleSheet, ScrollView, Dimensions, View} from 'react-native';
import wordCloud from './wordCloud.js';

const screenWidth = Dimensions.get('window').width;

const AppComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [wordList, setWordList] = useState([]);

  //generates random word from give word cloud
  const getRandomItem = () => {
    return wordCloud[Math.floor(Math.random() * wordCloud.length)];
  };

  useEffect(() => {
    //set initial wordlist with size of 5
    let initialCount = 5;
    let initialWordList = [];
    while (initialWordList.length < initialCount) {
      let randomItem = getRandomItem();
      if (!initialWordList.includes(randomItem)) {
        initialWordList.push(randomItem);
      }
    }
    setWordList(initialWordList);
  }, []);

  /**
   *
   * @param {string} query set querykey for the list
   */
  const onChangeSearch = query => {
    setSearchQuery(query);
  };

  //set a random item to existing wordList
  const addRandomItem = () => {
    while (1) {
      let randomItem = getRandomItem();
      if (!wordList.includes(randomItem)) {
        setWordList([...wordList, randomItem]);
        return;
      }
    }
  };

  //filter words to display based on query
  let searchKey = searchQuery.toLowerCase();
  let filteredWordList = wordList.filter(word => word.startsWith(searchKey));

  return (
    <View>
      <Appbar style={styles.bottom}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        <Appbar.Action
          icon="plus"
          onPress={() => addRandomItem()}
          style={styles.addIcon}
        />
      </Appbar>
      <ScrollView style={{marginBottom: 80}}>
        <List.Section>
          <List.Subheader style={styles.listHeading}>ToDo List</List.Subheader>

          {filteredWordList.map((item, i) => (
            <List.Item style={styles.listItem} key={i} title={item} />
          ))}
        </List.Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: screenWidth - 45,
  },
  bottom: {
    display: 'flex',
  },
  addIcon: {
    width: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  listHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItem: {
    borderBottomColor: '#00000010',
    borderBottomWidth: 1,
  },
});

export default AppComponent;
