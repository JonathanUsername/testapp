/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  DeviceEventEmitter,
  View
} from 'react-native';
import { SensorManager } from 'NativeModules';

function float2 (f) {
    return parseFloat(f.toFixed(2));
}

function roundCoordinates(data) {
    return {
        x: float2(data.x),
        y: float2(data.y),
        z: float2(data.z)
    };
}

export default class testapp extends Component {
    state = {
        x: 100,
        y: 50,
        z: 0
    }

    componentDidMount() {
         // Start the accelerometer with a minimum delay of 100ms between events.
        SensorManager.startAccelerometer(100);
        DeviceEventEmitter.addListener('Accelerometer', (data) => {
            const {x ,y ,z} = roundCoordinates(data);
            this.setState({x, y, z});
        });
    }

    componentWillUnmount() {
        SensorManager.stopAccelerometer();
    }

    render() {
        const {x, y, z} = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Hello this is a test
                </Text>
                <Text style={styles.welcome}>
                    {x}
                </Text>
                <Text style={styles.welcome}>
                    {y}
                </Text>
                <Text style={styles.welcome}>
                    {z}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('testapp', () => testapp);
