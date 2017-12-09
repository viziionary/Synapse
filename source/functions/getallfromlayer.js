function getAllFromLayer(brain, layer) {
	var neurons = Object.keys(brain.globalReferenceNeurons).filter(k => brain.globalReferenceNeurons[k].layer === layer);
	return neurons;
}
export default getAllFromLayer;
