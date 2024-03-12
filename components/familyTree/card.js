
import React from 'react';
import { View, Text, Svg, Rect } from 'react-native-svg';

const Card = ({ d, is_main }) => {
  const { x, y } = d;
  const [w, h] = is_main ? [160, 60] : [160, 40];

  const CardBody = () => {
    const color_class =
      d.data.data.gender === 'M'
        ? 'card-male'
        : d.data.data.gender === 'F'
        ? 'card-female'
        : 'card-genderless';

    return (
      <Svg width={w} height={h}>
        <Rect
          width={w}
          height={h}
          fill="#fff"
          rx={10}
          stroke={d.data.main ? '#000' : 'transparent'}
          className={color_class}
        />
        <Text x={10} dy={14} transform={`translate(0, ${h / 4})`} fill="#000">
          {d.data.data.label}
        </Text>
      </Svg>
    );
  };

  return (
    <View style={{ transform: [{ translateX: x }, { translateY: y }] }}>
      <View style={{ transform: [{ translateX: -w / 2 }, { translateY: -h / 2 }] }}>
        <CardBody />
      </View>
    </View>
  );
};

export default Card;
