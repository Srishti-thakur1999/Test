import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet,  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ApiCard from './ApiCard';

class ApiList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      sortDirection: 'asc',
      filteredApis: [],
    };
  }

  componentDidMount() {
    this.fetchApiData();
  }

  fetchApiData = () => {
    fetch('https://api.publicapis.org/entries')
      .then(response => response.json())
      .then(data => {
        this.setState({ filteredApis: data.entries });
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleSearch = query => {
    const { sortDirection } = this.state;
    const filteredApis = this.filterApis(query, sortDirection);
    this.setState({ searchQuery: query, filteredApis });
  };

  handleSort = direction => {
    const { searchQuery } = this.state;
    const filteredApis = this.filterApis(searchQuery, direction);
    this.setState({ sortDirection: direction, filteredApis });
  };

  filterApis = (query, direction) => {
    const { filteredApis } = this.state;
    let filtered = filteredApis;

    if (query) {
      filtered = filtered.filter(api => api.API.toLowerCase().includes(query.toLowerCase()));
    }

    if (direction === 'asc') {
      filtered.sort((a, b) => a.API.localeCompare(b.API));
    } else {
      filtered.sort((a, b) => b.API.localeCompare(a.API));
    }

    return filtered;
  };

  render() {
    const { searchQuery, sortDirection, filteredApis } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by API name"
          value={searchQuery}
          onChangeText={this.handleSearch}
          placeholderTextColor="blue"
        />
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by API name:</Text>
          <Picker
            style={styles.sortPicker}
            selectedValue={sortDirection}
            onValueChange={itemValue => this.handleSort(itemValue)}
          >
            <Picker.Item label="Ascending" value="asc" />
            <Picker.Item label="Descending" value="desc" />
          </Picker>
        </View>
        <FlatList
          data={filteredApis}
          renderItem={({ item }) => <ApiCard api={item} />}
          keyExtractor={item => item.API}
          numColumns={2}
          contentContainerStyle={styles.cardContainer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 40,
    borderColor: '#1e90ff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sortLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  sortPicker: {
    flex: 1,
    height: 40,
  },
  cardContainer: {
    justifyContent: 'space-between',
  },
});

export default ApiList;
