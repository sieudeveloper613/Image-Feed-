import React from 'react'
import { View, 
         Platform, 
         StatusBar, 
         Modal, 
         StyleSheet, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


// import screens
import Feed from './screens/Feed'
import Comments from './screens/Comments'

const ASYNC_STORAGE_COMMENTS_KEY = 'ASYNC_STORAGE_COMMENTS_KEY';

export default class App extends React.Component{
  state = {
    commentsForItem: {},
    showModal: false,
    selectedItemId: null,
  };

  onpenCommentScreen = id => {
    this.setState({
      showModal: true,
      selectedItemId: id,
    });
  }

  closeCommentScreen = () => {
    this.setState({
      showModal: false,
      selectedItemId: null,
    })
  };

  onSubmitComment = (text) => {
    const { selectedItemId, commentsForItem } = this.state;
    const comments = commentsForItem[selectedItemId] || [];

    const updated = {
      ...commentsForItem, [selectedItemId]: [...comments, text],
    };
    
    this.setState({
      commentsForItem: updated,
    });

    try {
      AsyncStorage.setItem(ASYNC_STORAGE_COMMENTS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.log('Failed to save comment', text, 'for', selectedItemId);
    }
  };

  async componentDidMount(){
    try {
      const commentsForItem = await AsyncStorage.getItem(
        ASYNC_STORAGE_COMMENTS_KEY,
      );

      this.setState({
        commentsForItem: commentsForItem ? JSON.parse(commentsForItem) : {},
      });
    } catch (error) {
      console.log('Failed to load comments');
    }
  }

  render(){
    const { commentsForItem, showModal, selectedItemId } = this.state;

    return(
      <View style={styles.container}>
        <Feed 
          style={styles.feed}
          commentsForItem={commentsForItem}
          onPressComments={this.onpenCommentScreen}
        />
        <Modal
          visible={showModal} //enable or disable modal
          animationType='slide' // type of animation 'slide, none, fade'
          onRequestClose={this.closeCommentScreen} // enable or disable closing modal
        >
          <Comments
            style={styles.comments}
            comments={commentsForItem[selectedItemId] || []}
            onClose={this.closeCommentScreen}
            onSubmitComment={this.onSubmitComment}
          />
        </Modal>


      </View>
    )
  }
}

const platformVersion = 
  Platform.OS === 'ios' ? parseInt(Platform.Version, 10) : Platform.Version;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feed: {
    flex: 1,
    marginTop: 
      Platform.OS === 'android' || platformVersion < 11
        ? StatusBar.currentHeight : 0,
  },
  comments: {
    flex: 1,
    marginTop:
    Platform.OS === 'ios' && platformVersion < 11
      ? StatusBar.currentHeight : 0,
  },
  
})