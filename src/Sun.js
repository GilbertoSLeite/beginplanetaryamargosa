import * as React from 'react';
import { Easing } from 'react-native';
import { 
	Animated, 
	Sphere, 
	PointLight, 
	View, 
	asset 
	} from 'react-vr'
import AnimatedMath from 'react-native-animated-math';

import { 
	SUN_RADIUS, 
	SUN_DAY, 
	SUN_YEAR, 
	SUN_AXIS, 
	SUN_INCLINATION 
	} from './constants'

const SunSphere = Animated.createAnimatedComponent(Sphere);

class Sun extends React.Component {
	spin = new Animated.Value(0);
  rotation = new Animated.Value(0);

  componentDidMount() {
    this.startSpinning();
    this.startRotation();
  }

  startSpinning = () => {
    Animated.loop(
      Animated.timing(this.spin, {
        toValue: 360,
        easing: Easing.linear,
        duration: SUN_DAY,
      })
    ).start();
  };

  startRotation = () => {
    Animated.loop(
      Animated.timing(this.rotation, {
        toValue: 2 * Math.PI,
        easing: Easing.linear,
        duration: SUN_YEAR,
      })
    ).start();
  };

	render() {
		return (
			<View>
				<SunSphere
				  style={{
						transform: [
							{
								translateX: Animated.multiply(
                  AnimatedMath.sin(this.rotation),
                  -SUN_AXIS
                ),
							},
              {
                translateZ: Animated.multiply(
                  AnimatedMath.cos(this.rotation),
                  SUN_AXIS
                ),
              },
              {
                translateY: Animated.multiply(
                  AnimatedMath.sin(this.rotation),
                  SUN_AXIS * Math.sin(SUN_INCLINATION)
                ),
              },
              { 
								rotateY: this.spin 
							},
						]
					}}
					radius={SUN_RADIUS}
					widthSegments={30}
					heightSegments={30}
					texture={asset('sun.jpeg')}
				/>
				<PointLight intensity={3} />
			</View>
		)
	}
}

export default Sun
