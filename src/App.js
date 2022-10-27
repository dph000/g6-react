/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";

import G6 from "@antv/g6";

import NodeList from "./components/nodeList";
import DrawArea from "./components/drawArea";

import { FlowContext } from "./contexts/flow";

import initData from "./data";

const { Graph, Grid, Minimap } = G6;

export default function App() {
  const g6Ref = useRef();
  let g6Graph = null;

  // 初始数据
  const [data, changeData] = useState(initData);

  useEffect(() => {
    // 相当于componentDidmount 执行一次
    if (!g6Graph) {
      console.log(g6Ref.current.offsetWidth, g6Ref.current.offsetHeight);
      const width = g6Ref.current.offsetWidth || 600;
      const height = g6Ref.current.offsetHeight || 800;

      g6Graph = new Graph({
        container: g6Ref.current,
        width,
        height,
        fitView: true,
        // https://g6.antv.vision/zh/docs/manual/middle/states/defaultBehavior
        modes: {
          default: [
            "drag-canvas",
            "zoom-canvas",
            "drag-node",
            "click-select",
            "tooltip",
            "edge-tooltip",
            "activate-relations"
          ],
          edit: ["click-select"]
        },

        // defaultNode: {
        //   shape: "node",
        //   // 标签文本
        //   labelCfg: {
        //     style: {
        //       fill: "#0000A6",
        //       fontSize: 10
        //     }
        //   },
        //   // 节点样式
        //   style: {
        //     stroke: "#72CC4A",
        //     width: 150
        //   }
        // },
        defaultEdge: {
          shape: "polyline"
        },
        layout: {
          type: "dagre",
          rankdir: "LR",
          nodesep: 30,
          ranksep: 100
        },

        // 插件列表
        plugins: [new Grid(), new Minimap()]
      });

      g6Graph.data(data);
      g6Graph.render();
    }

    return () => {
      g6Graph = null;
    };
  }, []);

  const onDragStartHandle = (e, data) => {
    e.persist();
    e.dataTransfer.setData("nodeInfo", JSON.stringify(data));
    console.log(e, data);
  };

  const onDropHandle = e => {
    e.persist();
    const data = JSON.parse(e.dataTransfer.getData("nodeInfo"));
    Object.assign(data, {
      x: e.clientX,
      y: e.clientY,
      id: e.timeStamp
    });
    console.log(e, data);
    g6Graph.addItem("node", data);
    g6Graph.refresh();
    // console.log(, "hhhh");
  };

  return (
    <>
      <FlowContext.Provider
        value={{
          draggable: true,
          onDragStart: onDragStartHandle
        }}
      >
        <NodeList />
      </FlowContext.Provider>
      <DrawArea ref={g6Ref} onDrop={onDropHandle} />
    </>
  );
}
