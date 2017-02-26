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
  TouchableHighlight,
  DeviceEventEmitter,
  View
} from 'react-native';
import { SensorManager } from 'NativeModules';

const MAX_ACCELERATION = 11.0;

export default class testapp extends Component {
    state = {
        sensing: false,
        x: 100,
        y: 50,
        z: 0
    }

    checkAcceleration = (data) => {
        const {x, y, z} = data;
        const oldState = [
            this.state.x,
            this.state.y,
            this.state.z
        ];
        const highValues = oldState.filter(i => i > MAX_ACCELERATION);

        if (highValues.length > 0) {
            return {x,y,z,tooMuch: true};
        }
        return {x,y,z,tooMuch: false};
    }

    toggleSensor = () => {
        const {sensing} = this.state;
        if (!sensing) {
            // Start the accelerometer with a minimum delay of 100ms between events.
            SensorManager.startAccelerometer(100);
            DeviceEventEmitter.addListener('Accelerometer', (data) => {
                const {x ,y ,z, tooMuch} = this.checkAcceleration(data);
                this.setState({x, y, z, tooMuch});
            });
            this.setState({sensing: true});
        } else {
            SensorManager.stopAccelerometer();
            this.setState({sensing: false});
        }
    };

    render() {
        const {sensing, x, y, z, tooMuch} = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Hello this is a test
                </Text>
                <TouchableHighlight onPress={this.toggleSensor} style={styles.button}>
                    <Text style={styles.buttonText}>
                        {sensing ? 'Stop' : 'Start'}
                    </Text>
                </TouchableHighlight>
                {sensing && (
                    <View style={{backgroundColor: tooMuch ? 'red' : 'white'}}>
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
                )}
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
    button: {
        margin: 10,
        padding: 20,
        backgroundColor: 'green',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('testapp', () => testapp);
