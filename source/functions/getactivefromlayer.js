function getActiveFromLayer(brain, layer) {
    var neurons = Object.keys(brain.globalReferenceNeurons).filter(k => brain.globalReferenceNeurons[k].active && brain.globalReferenceNeurons[k].layer === layer);
    return neurons;
}