// /* eslint-disable prettier/prettier */
// import React, { useEffect, useRef } from 'react';
// import { View, Text } from 'react-native';
// import Svg, { Path, Rect, G } from 'react-native-svg';
// import * as d3 from 'd3-hierarchy';

// const FamilyTree = ({ data }) => {
//   const svgRef = useRef(null);

//   useEffect(() => {
//     if (data) {
//       const root = d3.hierarchy(data);
//       const treeLayout = d3.tree().size([700, 1000]);
//       const treeData = treeLayout(root);

//       renderTree(treeData);
//     }
//   }, [data]);

//   const renderTree = (treeData) => {
//     const links = treeData.links();
//     const nodes = treeData.descendants();

//     const paths = links.map((link, index) => (
//       <Path
//         key={index}
//         d={`M${link.source.x},${link.source.y}V${link.target.y}H${link.target.x}`}
//         fill="none"
//         stroke="orange"
//       />
//     ));

//     const rectangles = nodes.map((node, index) => (
//       <G key={index} transform={{ translateY: 20 }}>
//         <Rect
//           x={node.x - 40}
//           y={node.y - 20}
//           fill="#4d4d4d"
//           width={80}
//           height={40}
//           strokeWidth={1}
//           stroke="silver"
//         />
//         <Text
//           x={node.x}
//           y={node.y}
//           dy={4}
//           textAnchor="middle"
//           fontSize={12}
//           fill="white"
//         >
//           {node.data.id}
//         </Text>
//         {Array.isArray(node.data.spouses) &&
//           node.data.spouses.map((spouse, spouseIndex) => (
//             <Rect
//               key={spouseIndex}
//               x={node.x + 40 + spouseIndex * 80}
//               y={node.y - 40}
//               fill="#4d4d4d"
//               width={80}
//               height={40}
//               strokeWidth={1}
//               stroke="silver"
//             />
//           ))}
//       </G>
//     ));

//     const svgContent = (
//       <Svg width={700} height={1000}>
//         <G transform="translate(-100, 200)">
//           {paths}
//           {rectangles}
//         </G>
//       </Svg>
//     );

//     // Update the SVG content
//     svgRef.current.setNativeProps(svgContent);
//   };

//   return (
//     <View>
//      <Text>{JSON.stringify(data)}</Text>
//       <Svg width={700} height={1000} ref={svgRef}>
//         {/* Initial empty SVG */}
//       </Svg>
//     </View>
//   );
// };

// export default FamilyTree;

// return [
//     {
//       id: "0",
//       rels: {
//         spouses: ["8c92765f-92d3-4120-90dd-85a28302504c"],
//         father: "0c09cfa0-5e7c-4073-8beb-94f6c69ada19",
//         mother: "0fa5c6bc-5b58-40f5-a07e-d787e26d8b56",
//         children: [
//           "ce2fcb9a-6058-4326-b56a-aced35168561",
//           "f626d086-e2d6-4722-b4f3-ca4f15b109ab"
//         ]
//       },
//       data: {
//         "first name": "Agnus",
//         "last name": "",
//         birthday: "1970",
//         avatar:
//           "https://static8.depositphotos.com/1009634/988/v/950/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg",
//         gender: "M"
//       }
//     },
//     {
//       id: "8c92765f-92d3-4120-90dd-85a28302504c",
//       data: {
//         gender: "F",
//         "first name": "Andrea",
//         "last name": "",
//         birthday: "",
//         avatar: ""
//       },
//       rels: {
//         spouses: ["0"],
//         children: [
//           "ce2fcb9a-6058-4326-b56a-aced35168561",
//           "f626d086-e2d6-4722-b4f3-ca4f15b109ab"
//         ]
//       }
//     },
//     {
//       id: "0c09cfa0-5e7c-4073-8beb-94f6c69ada19",
//       data: {
//         gender: "M",
//         "first name": "Zen",
//         "last name": "",
//         birthday: "",
//         avatar: ""
//       },
//       rels: {
//         children: ["0"],
//         spouses: ["0fa5c6bc-5b58-40f5-a07e-d787e26d8b56"]
//       }
//     },
//     {
//       id: "0fa5c6bc-5b58-40f5-a07e-d787e26d8b56",
//       data: {
//         gender: "F",
//         "first name": "Zebra",
//         "last name": "",
//         birthday: "",
//         avatar: ""
//       },
//       rels: {
//         spouses: ["0c09cfa0-5e7c-4073-8beb-94f6c69ada19"],
//         children: ["0"],
//         father: "12a9bddf-855a-4583-a695-c73fa8c0e9b2",
//         mother: "bd56a527-b613-474d-9f38-fcac0aae218b"
//       }
//     },
//     {
//       id: "ce2fcb9a-6058-4326-b56a-aced35168561",
//       data: {
//         gender: "M",
//         "first name": "Ben",
//         "last name": "",
//         birthday: "",
//         avatar: ""
//       },
//       rels: {
//         mother: "8c92765f-92d3-4120-90dd-85a28302504c",
//         father: "0",
//         spouses: ["b4e33c68-20a7-47ba-9dcc-1168a07d5b52"],
//         children: [
//           "eabd40c9-4518-4485-af5e-e4bc3ffd27fb",
//           "240a3f71-c921-42d7-8a13-dec5e1acc4fd"
//         ]
//       }
//     },
//     {
//       id: "f626d086-e2d6-4722-b4f3-ca4f15b109ab",
//       data: {
//         gender: "F",
//         "first name": "Becky",
//         "last name": "",
//         birthday: "",
//         avatar: ""
//       },
//       rels: {
//         mother: "8c92765f-92d3-4120-90dd-85a28302504c",
//         father: "0"
//       }
//     },
//     {
//       id: "eabd40c9-4518-4485-af5e-e4bc3ffd27fb",
//       data: {
//         gender: "M",
//         "first name": "Carlos",
//         "last name": "",
//         birthday: "",
//         avatar: ""
//       },
//       rels: {
//         mother: "b4e33c68-20a7-47ba-9dcc-1168a07d5b52",
//         father: "ce2fcb9a-6058-4326-b56a-aced35168561"
//       }
//     },
//     {
//       id: "b4e33c68-20a7-47ba-9dcc-1168a07d5b52",
//       data: {
//         gender: "F",
//         "first name": "Branka",
//         "last name": "",
//         birthday: "",
//         avatar: ""
//       },
//       rels: {
//         spouses: ["ce2fcb9a-6058-4326-b56a-aced35168561"],
//         children: [
//           "eabd40c9-4518-4485-af5e-e4bc3ffd27fb",
//           "240a3f71-c921-42d7-8a13-dec5e1acc4fd"
//         ]
//       }
//     },
//     {
//       id: "240a3f71-c921-42d7-8a13-dec5e1acc4fd",
//       data: {
//         gender: "F",
//         "first name": "Carla",
//         "last name": "",
//         birthday: "",
//         avatar: ""
//       },
//       rels: {
//         mother: "b4e33c68-20a7-47ba-9dcc-1168a07d5b52",
//         father: "ce2fcb9a-6058-4326-b56a-aced35168561"
//       }
//     },
//     {
//       id: "12a9bddf-855a-4583-a695-c73fa8c0e9b2",
//       data: {
//         gender: "M",
//         "first name": "Yvo",
//         "last name": "",
//         birthday: "",
//         avatar: ""
//       },
//       rels: {
//         children: ["0fa5c6bc-5b58-40f5-a07e-d787e26d8b56"],
//         spouses: ["bd56a527-b613-474d-9f38-fcac0aae218b"]
//       }
//     },
//     {
//       id: "bd56a527-b613-474d-9f38-fcac0aae218b",
//       data: {
//         gender: "F",
//         "first name": "Yva",
//         "last name": "",
//         birthday: "",
//         avatar: ""
//       },
//       rels: {
//         spouses: ["12a9bddf-855a-4583-a695-c73fa8c0e9b2"],
//         children: ["0fa5c6bc-5b58-40f5-a07e-d787e26d8b56"]
//       }
//     }
//   ];