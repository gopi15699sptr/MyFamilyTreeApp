// import React, {useEffect, useRef, useState} from 'react';
// import {View,Text,UIManager} from 'react-native';
// // import f3 from 'family-chart';
// // import createStore from './components/familyTree/createStore';
// import createStore from './components/familyTree/createStore';
// import d3AnimationView from './components/familyTree/animatedView';
// // function data() {
// //   return [];
// // }

// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }


// export default function App() {

//   const svgRef = useRef(null);

//   const [refVal, setRefVal] = useState(null);

//   useEffect(() => {
//     const store = createStore({
//       data: [],
//       node_separation: 250,
//       level_separation: 150,
//     });

//     // console.log(store)

//     if (svgRef.current) {
//       svgRef.current.measure((x, y, width, height, pageX, pageY) => {
//         console.log(x)
//         setRefVal({x, y, width, height, pageX, pageY});
//       });
//     }
//     // const view = d3AnimationView({
//     //   store,
//     //   refVal,
//     // });

//   //   // const Card = f3.elements.Card({
//   //   //   store,
//   //   //   svg: view.svg,
//   //   //   card_dim: {
//   //   //     w: 220,
//   //   //     h: 70,
//   //   //     text_x: 75,
//   //   //     text_y: 15,
//   //   //     img_w: 60,
//   //   //     img_h: 60,
//   //   //     img_x: 5,
//   //   //     img_y: 5,
//   //   //   },
//   //   //   card_display: [
//   //   //     d => `${d.data['first name'] || ''} ${d.data['last name'] || ''}`,
//   //   //     d => `${d.data['birthday'] || ''}`,
//   //   //   ],
//   //   //   mini_tree: true,
//   //   //   link_break: false,
//   //   // });

//   //   // view.setCard(Card);
//   //   // store.setOnUpdate(props => view.update(props || {}));
//   //   // store.update.tree({initial: true});
//    }, []); // Only run once on mount

//   //  useEffect(() => {console.log(svgRef.current)},[svgRef.current])
//   return <View ref={svgRef} style={{flex: 1}} ></View>;
// }



import React, {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import createStore from './components/familyTree/createStore';
import d3AnimationView from './components/familyTree/animatedView';

const App = () => {
  const textContainerRef = useRef(null);
  const textRef = useRef(null);
  const [measure, setMeasure] = useState(null);
  const [TreeView,setTreeView] = useState(null);


    const svgRef = useRef(null);

  const [refVal, setRefVal] = useState(null);

  useEffect(() => {






  }, []); 

  useEffect(() => {
    console.log(measure)
    if (textRef.current && textContainerRef.current) {
      textRef.current.measureLayout(
        textContainerRef.current,
        (left, top, width, height) => {
          setMeasure({left, top, width, height});
        },
      );
    }
    if(measure){

      const store = createStore({
        data: [],
        node_separation: 250,
        level_separation: 150,
      });
  

      if(measure){
        const view = d3AnimationView({
          store,
          svgRef:measure,
        });
        setTreeView(view);
      }
      console.log('aaaaa',store)
    }

  }, [measure?.width]);

  return (
    <>
      <View ref={textContainerRef} style={styles.textContainer}>
        <View ref={textRef}></View>
      </View>
      {/* <Text style={styles.measure}>{JSON.stringify(measure)}</Text> */}
      {TreeView && (
        <TreeView/>
      )}
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: '#61dafb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  measure: {
    textAlign: 'center',
    padding: 12,
  },
});

export default App;