/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

const createStore = initial_state => {
  const [state, setState] = useState(initial_state);
  let onUpdate;

  const update = {
    tree: props => {
      setState(prevState => ({
        ...prevState,
        tree: calcTree(),
      }));
      if (onUpdate) onUpdate(props);
    },
    mainId: main_id => setState(prevState => ({...prevState, main_id})),
    data: data => setState(prevState => ({...prevState, data})),
  };

  const getData = () => state.data;
  const getTree = () => state.tree;

  const setOnUpdate = f => {
    onUpdate = f;
  };

  const methods = {};

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      tree: calcTree(),
    }));
  }, [
    state.data,
    state.main_id,
    state.node_separation,
    state.level_separation,
    calcTree,
  ]);

  function calcTree() {
    // Assuming CalculateTree is a function available in your code
    return CalculateTree({
      data_stash: state.data,
      main_id: state.main_id,
      node_separation: state.node_separation,
      level_separation: state.level_separation,
    });
  }

  return {
    state,
    update,
    getData,
    getTree,
    setOnUpdate,
    methods,
  };
};

export default createStore;
