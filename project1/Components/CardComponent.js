import React, {Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert
} from "react-native";
import { Card, CardItem, Thumbnail,Body,Left,Right,Button, Icon} from 'native-base'

var jwtDecode = require('jwt-decode');
class CardComponent extends Component{
    state = {
        data :[],
    }
    UpVote = async () => {
        fetch(`https://fix-this.herokuapp.com/vote/${this.props.post_id}/${this.props.user_id}`, {
              method: 'post',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
              },
            })
            .then((res) => {
          if(res.status == 200){
            Alert.alert("upvoted", " upvoted");
          }
          else{
            Alert.alert("Error", "Error: "+ res.message);
            console.log("it not work")
            }
         })
         .catch((error) => {
             console.error(error);
            });
      }

    async componentDidMount()  {
        const response = await fetch(`https://fix-this.herokuapp.com/user/info?_id=${this.props.user_id}`, {
            method: 'GET',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.props.token}`
             },
        })
        const data =  await response.json();
        console.log(data);
        this.setState({data : data})
    }
    render(){
        const url = this.props.url
        console.log(url)
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source = {require('../assets/avatar.png')}/>
                        <Body>
                            <Text >{this.state.data.username} </Text>
                            <Text>{this.props.title}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source = {{uri: url}}
                    style = {{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem style = {{height: 45}}>
                    <Left>
                    <TouchableOpacity onPress={this.UpVote}>
                            <Icon name = "thumbs-up" style = {{color: 'black'}}/>
                    </TouchableOpacity>
                        <Text>   {this.props.upvote} </Text>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>Zone: UCF</Text>
                        <Text style = {{fontWeight: "900"}}>Description: </Text>
                        <Text>
                            {this.props.caption}
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }

}
export default CardComponent;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});