function elt(name, attributes) {
    let node = document.createElement(name);

    if(attributes) {
        for(let attr in attributes)
            if(attributes.hasOwnProperty(attr))
                node.setAttribute(attr, attributes[attr]);
    }
    for(var i = 2; i < arguments.length; i += 1) {
        let child = arguments[i];

        if(typeof child == "string")
            child = document.createTextNode(child);

        node.appendChild(child);
    }

    return node;
}