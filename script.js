async function anyNPromises(n, promises) {
    var resolved = []
    var rejected = []
    
    var go = true
    while (go) {
        var current = promises.next()
        if(!current.done) {
            var promise = current.value;
            try {
                var result = await promise
                resolved.push(result)
            } catch (error) {
                rejected.push(error)
            }

            if (resolved.length === n) {
                go = false
            }
        }
        go = !current.done
    }

    if (resolved.length < n) {
        throw new AggregateError(rejected, `Less than ${n} promises resolved`)
    }

    return Promise.resolve(resolved)
}
