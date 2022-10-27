import React, { memo, useContext } from "react";

import { FlowContext } from "../contexts/flow";

import "./nodeList.css";

// 默认节点类型
const NODE_LIST = [
  {
    name: "开始节点",
    type: "circle",
    size: [160],
    color: "#5B8FF9",
    style: {
      fill: "#9EC9FF",
      lineWidth: 3
    },
    labelCfg: {
      style: {
        fill: "#1890ff",
        fontSize: 24
      },
      position: "bottom"
    },
    // 节点上左右上下四个方向上的链接circle配置
    linkPoints: {
      top: true,
      right: true,
      bottom: true,
      left: true,
      // circle的大小
      size: 5,
      lineWidth: 1,
      fill: "#fff",
      stroke: "#1890FF"
    },
    // 节点中icon配置
    icon: {
      // 是否显示icon，值为 false 则不渲染icon
      show: true,
      // icon的地址，字符串类型
      img:
        "https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg",
      width: 60,
      height: 60
    }
  },
  {
    name: "模型节点",
    type: "ellipse",
    size: [180, 100],
    style: {
      fill: "#9EC9FF",
      stroke: "#5B8FF9",
      lineWidth: 3
    },
    labelCfg: {
      style: {
        fill: "#1890ff",
        fontSize: 18
      },
      position: "bottom"
    },
    // 节点上左右上下四个方向上的链接circle配置
    linkPoints: {
      top: true,
      right: false,
      bottom: true,
      left: false,
      // circle的大小
      size: 5,
      lineWidth: 1,
      fill: "#fff",
      stroke: "#1890FF"
    },
    // 节点中icon配置
    icon: {
      // 是否显示icon，值为 false 则不渲染icon
      show: false,
      // icon的地址，字符串类型
      img:
        "https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg",
      width: 60,
      height: 60
    }
  },
  {
    name: "常规节点",
    type: "rect",
    size: [160, 80],
    style: {
      fill: "#9EC9FF",
      stroke: "#5B8FF9",
      lineWidth: 3
    },
    labelCfg: {
      style: {
        fill: "#fff",
        fontSize: 18
      }
    },
    linkPoints: {
      top: true,
      bottom: true,
      left: true,
      right: true,
      size: 5,
      fill: "#fff",
      lineWidth: 1,
      stroke: "#1890FF"
    }
  },
  {
    name: "判断节点",
    type: "diamond",
    size: [150, 100],
    style: {
      fill: "#9EC9FF",
      stroke: "#5B8FF9",
      lineWidth: 3
    },
    labelCfg: {
      style: {
        fill: "#1890ff",
        fontSize: 18
      },
      position: "bottom"
    },
    // 节点上左右上下四个方向上的链接circle配置
    linkPoints: {
      top: false,
      bottom: false,
      left: true,
      right: true,
      size: 5,
      fill: "#fff",
      lineWidth: 1,
      stroke: "#1890FF"
    },
    // 节点中icon配置
    icon: {
      // 是否显示icon，值为 false 则不渲染icon
      show: true,
      // icon的地址，字符串类型
      img:
        "https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg",
      width: 60,
      height: 60
    }
  },
  {
    name: "流转节点",
    type: "triangle",
    size: [60],
    // 可取值：down、up
    direction: "up",
    style: {
      fill: "#9EC9FF",
      stroke: "#5B8FF9",
      lineWidth: 3
    },
    labelCfg: {
      style: {
        fill: "#1890ff",
        fontSize: 18
      },
      position: "bottom",
      offset: 30
    },
    // 节点上各个方向上的链接circle配置
    linkPoints: {
      top: true,
      right: true,
      bottom: true,
      left: true,
      // circle的大小
      size: 5,
      lineWidth: 1,
      fill: "#fff",
      stroke: "#1890FF"
    },
    // 节点中icon配置
    icon: {
      // 是否显示icon，值为 false 则不渲染icon
      show: true,
      // icon的地址，字符串类型
      img:
        "https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg",
      width: 40,
      height: 40
    }
  }
];

const NodeItem = memo(function NodeItem(props) {
  const { data } = props;

  const { onDragStart, draggable } = useContext(FlowContext);

  return (
    <div
      draggable={draggable}
      className={data.type}
      onDragStart={e => onDragStart(e, data)}
    >
      {data.type === "diamond" ? <span>{data.name}</span> : data.name}
    </div>
  );
});

const NodeList = memo(function NodeList() {
  return (
    <div className="nodeList">
      {NODE_LIST.map(node => (
        <NodeItem key={node.type} data={node} />
      ))}
    </div>
  );
});

export default NodeList;
