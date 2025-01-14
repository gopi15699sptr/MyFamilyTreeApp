import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as d3 from 'd3-hierarchy';
import { Path, G, Circle, Rect, Text as SvgText, Svg } from 'react-native-svg';
import { PanGestureHandler, State,GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const panRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onPanGestureEvent = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const scaledTranslationX = event.nativeEvent.translationX / 10; // Scale down translation X
      const scaledTranslationY = event.nativeEvent.translationY / 10; // Scale down translation Y
      setOffset({ x: offset.x + scaledTranslationX, y: offset.y + scaledTranslationY });
    }
  };

  const data = [
    { name: 'Grandparent', parent: '', spouses: ['Wife 1'], children: 2 },
    { name: 'Parent 1', parent: 'Grandparent', spouses: ['Wife 1'], children: null },
    { name: '', parent: 'Parent 1' },
    { name: 'Parent 2', parent: 'Grandparent', spouses: ['Wife 2'], children: 2 },
    { name: 'Child 3', parent: 'Parent 2' },
    { name: 'Child 4', parent: 'Parent 2', spouses: ['Wife 3'], children: 2 },
    { name: 'Child 5', parent: 'Child 4' },
    { name: 'Child 6', parent: 'Child 4' },
  ];

  const treeData = d3
    .stratify()
    .id(d => d.name)
    .parentId(d => d.parent)(data);

  const treeLayout = d3.tree().size([750, 200]);
  const nodes = treeLayout(treeData);

  return (
    <View style={{ backgroundColor: '#4d4d4d', flex: 1 }}>
      <GestureHandlerRootView>
        <PanGestureHandler
          ref={panRef}
          onGestureEvent={onPanGestureEvent}
          simultaneousHandlers={panRef}
          shouldCancelWhenOutside={false}
        >
          <View>
            <Svg width={1200} height={900} transform={`translate(${offset.x}, ${offset.y})`}>
              {nodes.links().map((link, index) => (
                <>
                {link.target.data.name && (
                  <Path
                    transform={{ translateY: 5 }}
                    key={index}
                    d={'M' + (link.source.x - 20) + ',' + link.source.y + 'h 60 v 50 H' + link.target.x + 'V' + link.target.y}
                    fill="none"
                    stroke="orange"
                  />
                )}
                </>
              ))}
              {nodes.descendants().map((node, index) => (
                <G key={index} transform={{ translateY: 20 }}>
                  {node.data.name && (
                    <Rect
                      x={node.x - 60}
                      y={node.y - 20}
                      fill="#4d4d4d"
                      width={80}
                      height={40}
                      strokeWidth={1}
                      stroke="silver"
                    />
                  )}

                  {/* below is spouse code */}
                  {Array.isArray(node.data.spouses) && (
                    <>
                      {/* spouse default connection when they have children */}
                      {node.data.children ? (
                        <Path
                          transform={{ translateY: 0 }}
                          key={index}
                          d={'M' + (node.x + 40) + ',' + (node.y - 15) + 'h 20 '}
                          fill="none"
                          stroke="orange"
                        />
                      ) : (
                        // spouse connection when they dont have children
                        <Path
                          transform={{ translateY: 0 }}
                          key={index}
                          d={'M' + (node.x + 20) + ',' + (node.y - 15) + 'h 40 '}
                          fill="none"
                          stroke="orange"
                        />
                      )}

                      {/* below is spouse boxes */}
                      <Rect
                        x={node.x + 60}
                        y={node.y - 20}
                        fill="#4d4d4d"
                        width={80}
                        height={40}
                        strokeWidth={1}
                        stroke="silver"
                      />
                    </>
                  )}
                </G>
              ))}
            </Svg>
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

export default App;
