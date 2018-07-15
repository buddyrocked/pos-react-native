import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

export default class SectionLists extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <SectionList
          sections={[
            { key: 'A', title : 'A', data : ['Asni'] },
            { key: 'B', title : 'B', data : ['Budi', 'Bayu', 'Bambang'] },
            { key: 'C', title : 'C', data : ['Cita', 'Cucu'] },
          ]}
          renderItem={ ({item}) => <Text style={ styles.item }>{ item }</Text> }
          renderSectionHeader={ ({section}) => <Text style={ styles.sectionHeader }>{ section.title }</Text> }
          keyExtractor={ (item, index) => index }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    paddingTop : 22
  },
  sectionHeader : {
    paddingTop : 10,
    paddingLeft : 10,
    paddingRight : 10,
    paddingBottom : 10,
    fontWeight : 'bold',
    backgroundColor : 'rgba(225,225,225,1.0)'
  },
  item : {
    padding : 10,
    fontSize : 18,
    height : 44
  }
});
