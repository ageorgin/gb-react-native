import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, Image } from 'react-native';
import { Camera, Permissions } from 'expo';
import Loader from './Loader.js';

export default class ScanScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    loading: false,
    pictureUri: null,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = async () => {
    console.log('take picture');
    if (this.camera) {
      this.camera.takePictureAsync(
          {quality:0.5}
      ).then(async (data) => {
        this.setState({
          loading: true,
          pictureUri: data.uri
        });
        console.log('picture taken');

        let formData = new FormData();
        formData.append('file', {uri: data.uri, name: 'image.jpg', type: 'image/jpeg'});
        formData.append('language', 'fre');
        formData.append('isOverlayRequired', false);
        fetch('https://api.ocr.space/Parse/Image', {
          method: 'POST',
          headers: {
            apikey: 'CHANGEME',
            'Content-Type': 'multipart/form-data'
          },
          body: formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
          let parsedText = responseJson.ParsedResults[0].ParsedText.replace(/[\r\n]+/g, "");
          console.log(parsedText);
          const { navigate } = this.props.navigation;
          navigate('Search', {searchText: parsedText})
          this.setState({
            loading: false,
            pictureUri: null
          });
        })
        .catch((error) => console.log(error));
      });
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { loading } = this.state;

    if (loading) {
      return (
        <View  style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
          <Image
            style={{ flex: 0.9}}
            source={{ uri: this.state.pictureUri }}
          />
          <Button
            onPress={this.takePicture}
            title="Recherche"
            style={{flex: 0.1}}
          />
          <Loader
            loading={loading}
            message="Analyse de la photo. Veuillez patienter"
          />
        </View>
      );
    }

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View  style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
          <Camera style={{ flex: 0.9 }} type={this.state.type} ref={ref => { this.camera = ref; }}/>
          <Button
            onPress={this.takePicture}
            title="Recherche"
            style={{flex: 0.1}}
            />
        </View>
      );
    }
  }
}
