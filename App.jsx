import React, {useRef, useState} from 'react';
import {View, StyleSheet,Text} from 'react-native';
import * as d3 from 'd3-hierarchy';
import {Path, G, Circle, Rect, Text as SvgText, Svg} from 'react-native-svg';

const App = () => {
  const data = [
    {name: 'Grandparent', parent: ''},
    {name: 'Parent 1', parent: 'Grandparent', spouses: ['Wife 1']},
    {name: 'Child 1', parent: 'Parent 1'},
    {name: 'Child 2', parent: 'Parent 1'},
    {name: 'Parent 2', parent: 'Grandparent', spouses: ['Wife 2']},
    {name: 'Child 3', parent: 'Parent 2'},
    {name: 'Child 4', parent: 'Parent 2', spouses: ['Wife 3']},
    {name: 'Child 5', parent: 'Child 4'},
    {name: 'Child 6', parent: 'Child 4'},
  ];

  const treeData = d3
    .stratify()
    .id(d => d.name)
    .parentId(d => d.parent)(data);

  const treeLayout = d3.tree().size([650, 200]);
  const nodes = treeLayout(treeData);

  return (
    <View style={{backgroundColor: '#4d4d4d', flex: 1}}>
      <View>
        <Svg width={900} height={900} transform="translate(-100, 200)">
          {nodes.links().map((link, index) => (
            <Path
              transform={{translateY: 5}}
              key={index}
              d={
                'M' +
                link.source.x +
                ',' +
                link.source.y +
                'v 50 H' +
                link.target.x +
                'V' +
                link.target.y
              }
              fill="none"
              stroke="orange"
            />
          ))}
          {nodes.descendants().map((node, index) => (
            <G key={index} transform={{translateY: 20}}>
              <Rect
                x={node.x - 40}
                y={node.y - 20}
                fill="#4d4d4d"
                width={80}
                height={40}
                strokeWidth={1}
                stroke="silver"
              />

              {Array.isArray(node.data.spouses) && (
                <>
                  {nodes.links().map((link, index) => (
                    !link.source.data['spouses']  ? (
                      <>
                      <Path
                        transform={{translateX: 40}}
                        key={index}
                        d={
                          'M' +
                          link.target.x +
                          ',' +
                          link.target.y + 'h 20'
                        }
                        fill="none"
                        stroke="orange"
                      />
                      {/* <Path
                        transform={{translateX: 50 ,translateY:36}}
                        key={index+1}
                        d={
                          'M' +
                          link.target.x +
                          ',' +
                          link.target.y + 'V 30'
                        }
                        fill="none"
                        stroke="orange"
                      /> */}
                      </>
                    ) : null
                  ))}
                  {node.data.spouses.map((spouse, spouseIndex) => (
                    <G
                      key={spouseIndex}
                      transform={{translateY: 20, translateX: 20}}>
                      <Rect
                        x={node.x + 40}
                        y={node.y - 40}
                        fill="#4d4d4d"
                        width={80}
                        height={40}
                        strokeWidth={1}
                        stroke="silver"
                      />
                    </G>
                  ))}
                </>
              )}
            </G>
          ))}
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pinchableImage: {
    width: 250,
    height: 250,
    backgroundColor: '#28b5b5',
    marginTop: 22,
    marginBottom: 22,
  },
});

export default App;
