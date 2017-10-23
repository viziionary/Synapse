function mutate(count, max, child) {
        var weights = Object.values(mutations).map(mutation=>{return mutation.frequency});
        var mutationList = Object.keys(mutations);
        var mutation = getRandomItem(mutationList, weights);
        //console.log('Mutation ' + count + ' of ' + max + ': ' + mutation);
        //console.time(mutation);
        mutations[mutation].mutate(child);
        //console.timeEnd(mutation);
        count++;
        if (count < max) {
            mutate(count, max, child);
        }
    }
