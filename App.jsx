import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import f3 from 'family-chart';
import createStore from './components/familyTree/createStore';

export default function FamilyTree() {
  const svgRef = useRef(null);

  const [refVal, setRefVal] = useState(null);

  useEffect(() => {
    const store = createStore({
      data: data(),
      node_separation: 250,
      level_separation: 150,
    });

    if (svgRef.current) {
      svgRef.current.measure((x, y, width, height, pageX, pageY) => {
        setRefVal({x, y, width, height, pageX, pageY});
      });
    }

    const view = f3.d3AnimationView({
      store,
      refVal,
    });

    const Card = f3.elements.Card({
      store,
      svg: view.svg,
      card_dim: {
        w: 220,
        h: 70,
        text_x: 75,
        text_y: 15,
        img_w: 60,
        img_h: 60,
        img_x: 5,
        img_y: 5,
      },
      card_display: [
        d => `${d.data['first name'] || ''} ${d.data['last name'] || ''}`,
        d => `${d.data['birthday'] || ''}`,
      ],
      mini_tree: true,
      link_break: false,
    });

    view.setCard(Card);
    store.setOnUpdate(props => view.update(props || {}));
    store.update.tree({initial: true});
  }, []); // Only run once on mount

  return <View style={{flex: 1}} />;
}

function data() {
  return [];
}
