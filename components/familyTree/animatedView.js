import React from 'react';
import { View, Svg, Rect, G, Circle } from 'react-native-svg';
export default function d3AnimationView({store, svgRef}) {
    console.log('svgref',svgRef)
    const svg = createSvg();
    // setupSvg(svg, store.state.zoom_polite);
  
    // return {update: updateView, svg, setCard: card => Card$1 = card}
    return {svg}
  
    function updateView(props) {
      if (!props) props = {};
      const tree = store.state.tree;
      const { tree_position = 'fit', transition_time = 2000 } = props || {};
      return (
        <View ref={svgRef}>
          {/* Your view content */}
        </View>
      );
        // view = d3.select(svg).select(".view"),
        // tree_position = props.tree_position || 'fit',
        // transition_time = props.hasOwnProperty('transition_time') ? props.transition_time : 2000;
  
      updateCards();
      updateLinks();
      if (props.initial) treeFit({svg, svg_dim: svgRef, tree_dim: tree.dim, transition_time: 0});
      else if (tree_position === 'fit') treeFit({svg, svg_dim: svgRef, tree_dim: tree.dim, transition_time});
      else if (tree_position === 'main_to_middle') mainToMiddle({datum: tree.data[0], svg, svg_dim: svgRef, scale: props.scale, transition_time});
      else ;
  
      return true
  
      function updateLinks() {
        const links_data = tree.data.reduce((acc, d) => acc.concat(createLinks({d, tree:tree.data})), []),
          link = view.select(".links_view").selectAll("path.link").data(links_data, d => d.id),
          link_exit = link.exit(),
          link_enter = link.enter().append("path").attr("class", "link"),
          link_update = link_enter.merge(link);
  
        link_exit.each(linkExit);
        link_enter.each(linkEnter);
        link_update.each(linkUpdate);
  
        function linkEnter(d) {
          d3.select(this).attr("fill", "none").attr("stroke", "#fff").style("opacity", 0)
            .attr("d", createPath(d, true));
        }
  
        function linkUpdate(d) {
          const path = d3.select(this);
          const delay = calculateDelay(d);
          path.transition('path').duration(transition_time).delay(delay).attr("d", createPath(d)).style("opacity", 1);
        }
  
        function linkExit(d) {
          const path = d3.select(this);
          path.transition('op').duration(800).style("opacity", 0);
          path.transition('path').duration(transition_time).attr("d", createPath(d, true))
            .on("end", () => path.remove());
        }
  
      }
  
      function updateCards() {
        const card = view.select(".cards_view").selectAll("g.card_cont").data(tree.data, d => d.data.id),
          card_exit = card.exit(),
          card_enter = card.enter().append("g").attr("class", "card_cont"),
          card_update = card_enter.merge(card);
  
        card_exit.each(d => calculateEnterAndExitPositions(d, false, true));
        card_enter.each(d => calculateEnterAndExitPositions(d, true, false));
  
        card_exit.each(cardExit);
        card.each(cardUpdateNoEnter);
        card_enter.each(cardEnter);
        card_update.each(cardUpdate);
  
        function cardEnter(d) {
          d3.select(this)
            .attr("transform", `translate(${d._x}, ${d._y})`)
            .style("opacity", 0)
            .node().appendChild(CardElement(this, d));
        }
  
        function cardUpdateNoEnter(d) {}
  
        function cardUpdate(d) {
          this.innerHTML = "";
          this.appendChild(CardElement(this, d));
          const delay = calculateDelay(d);
          d3.select(this).transition().duration(transition_time).delay(delay).attr("transform", `translate(${d.x}, ${d.y})`).style("opacity", 1);
        }
  
        function cardExit(d) {
          const g = d3.select(this);
          g.transition().duration(transition_time).style("opacity", 0).attr("transform", `translate(${d._x}, ${d._y})`)
            .on("end", () => g.remove());
        }
  
        function CardElement(node, d) {
          if (Card$1) return Card$1({node, d})
          else return Card({store, svg})({node, d})
        }
      }
  
      function calculateDelay(d) {
        if (!props.initial) return 0
        const delay_level = 800,
          ancestry_levels = Math.max(...tree.data.map(d=>d.is_ancestry ? d.depth : 0));
        let delay = d.depth*delay_level;
        if ((d.depth !== 0 || !!d.spouse) && !d.is_ancestry) {
          delay+=(ancestry_levels)*delay_level;  // after ancestry
          if (d.spouse) delay+=delay_level;  // spouse after bloodline
          delay+=(d.depth)*delay_level;  // double the delay for each level because of additional spouse delay
        }
        return delay
      }
  
    }
  
    function createSvg() {
        const svg_dim = svgRef;
         // You need to provide dimensions
        return (
          <Svg width={svg_dim.width} height={svg_dim.height} className="main_svg">
            <Rect width={svg_dim.width} height={svg_dim.height} fill="transparent" />
            <G className="view">
              <G className="links_view" />
              <G className="cards_view" />
            </G>
            <G transform="translate(100%, 100%)">
              <G className="fit_screen_icon cursor-pointer" transform="translate(-50px, -50px)" display="none">
                <Rect width={27} height={27} strokeDasharray={`${27/2}`} strokeDashoffset={`${27/4}`} 
                  stroke="#fff" strokeWidth={4} fill="transparent" />
                <Circle r={5} cx={27/2} cy={27/2} fill="#fff" />
              </G>
            </G>
          </Svg>
        );
      }
  }
  