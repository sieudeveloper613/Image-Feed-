import React from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'

// import other components 
import Card from './Card'

// import handle files
import { getImageFromId } from './../utils/api'

const keyExtractor = ({ id }) => id.toString();


export default class CardList extends React.Component{
    static propTypes = {
        items: PropTypes.arrayOf(
            PropTypes.shape({ // validate an object, 
                              // passing the keys of the values want to validate
                id: PropTypes.number.isRequired,
                author: PropTypes.string.isRequired,
            }),
        ).isRequired,
        commentsForItem: PropTypes.objectOf(PropTypes.arrayOf(
            PropTypes.string)).isRequired,
        onPressComments: PropTypes.func.isRequired,
    };

    renderItem = ({ item: { id, author }}) => {
        const { commentsForItem, onPressComments } = this.props;
        const comments = commentsForItem[id];

        return(
            <Card
                fullname={author}
                image={{
                    uri: getImageFromId(id),
                }}
                linkText={`${comments ? comments.length : 0} Comments`}
                onPressLinkText = { () => onPressComments(id)}
            />
        );
    }
    
        

    render(){
        const { items, commentsForItem } = this.props;
        return(
            <FlatList
                data={items}
                renderItem={this.renderItem}
                keyExtractor={keyExtractor}
                extraData={commentsForItem} /* extraData ...
                it should monitor another source of input data for changes. */
            />
        )
    }
}