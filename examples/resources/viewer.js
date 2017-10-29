class Viewer {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.render = this.render.bind(this);
  }
  render(brain) {
    renderBrain(brain, this.context, this.canvas);
  }
}

function renderBrain(brain, ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var width = canvas.width;
  var height = canvas.height;
  var layers = brain.layers;
  var heightDiv = height / layers;
  var layerList = [];
  var effectiveLayerList = [];
  var effectiveLinkList = [];
  for (var i1 = 0; i1 < brain.layers; i1++) {
    layerList.push([]);
    for (var prop1 in brain.globalReferenceNeurons) {
      if (brain.globalReferenceNeurons[prop1].layer === i1) {
        layerList[i1].push(brain.globalReferenceNeurons[prop1]);
      }
    }
  }
  for (var i1 = 0; i1 < brain.layers; i1++) {
    effectiveLayerList.push([]);
  }
  var coord; // to hold node coordinates defined here to prevent pointless memory allocation dealocation cycle
  // Gets the node position based on its ID and layer position

  function nodePosition(node, coord = {}) {
    var pos;
    var pos = effectiveLayerList[node.layer].findIndex(item => item.id == node.id);
    var widthDiv = width / effectiveLayerList[node.layer].length;
    coord.x = (widthDiv * pos) + (0.5 * widthDiv);
    coord.y = (heightDiv * node.layer) + (0.5 * heightDiv);
    return coord;
  }

  function drawNode(node) {
    if (node.layer == 0) {
      ctx.strokeStyle = '#4747f3';
      ctx.fillStyle = '#4040b3';
    } else {
      ctx.strokeStyle = '#56cc41';
      ctx.fillStyle = '#adf442';
    }
    ctx.lineWidth = 2;
    coord = nodePosition(node, coord);
    ctx.beginPath();
    ctx.arc(coord.x, coord.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }

  function drawLink(node1, node2) {
    ctx.strokeStyle = '#56cc41';
    ctx.lineWidth = 1;
    coord = nodePosition(node1, coord);
    ctx.beginPath();
    ctx.moveTo(coord.x, coord.y);
    coord = nodePosition(node2, coord);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
  }

  function isPathActive(node) {
    var paths, i, nextNode;
    if (node.active) {
      if (node.layer === 2) {
        return true;
      }
      paths = Object.keys(node.connections).map(key => node.connections[key]);
      for (i = 0; i < paths.length; i++) {
        nextNode = paths[i].target;
        if (nextNode.active) {
          if (nextNode.layer === 2) {
            return true;
          }
          if (isPathActive(nextNode)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  function renderPath(node) {
      var paths = Object.keys(node.connections).map(key => node.connections[key]);
      for (var i = 0; i < paths.length; i++) {
        nextNode = paths[i].target;
        if (isPathActive(nextNode)) {
          var duplicate = effectiveLinkList.findIndex(function(item) {
            if (item.node1.id === node.id) {
              if (item.node2.id === nextNode.id) {
                return true;
              }
            }
          });
          if (duplicate == -1) {
            effectiveLinkList.push({
              node1: node,
              node2: nextNode
            });
          }
          renderPath(nextNode);
        }
      }
    }

    function renderActivePaths(brain) {
      for (let prop in brain.globalReferenceNeurons) {
        if (isPathActive(brain.globalReferenceNeurons[prop])) {
          renderPath(brain.globalReferenceNeurons[prop])
        }
      }
    }

  renderActivePaths(layerList[0]);
  for (var i1 = 0; i1 < effectiveLinkList.length; i1++) {
    drawLink(effectiveLinkList[i1].node1, effectiveLinkList[i1].node2);
  }
  for (var i1 = 0; i1 < effectiveLayerList.length; i1++) {
    for (var i2 = 0; i2 < effectiveLayerList[i1].length; i2++) {
      drawNode(effectiveLayerList[i1][i2]);
    }
  }
}

module.exports = Viewer;
