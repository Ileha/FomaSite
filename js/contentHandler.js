const contentHandler = {
    "paragraph": (content, data) => {
        let para = document.createElement("p");
        let node = document.createTextNode(data.text);
        para.appendChild(node);
        content.appendChild(para);
    },
    "header": (content, data) => {
        let header = document.createElement("h1");
        header.className = "page-header";
        let node = document.createTextNode(data.text);
        header.appendChild(node);
        content.appendChild(header);
    }
}

function handleContent(contentElement, data) {
    contentElement.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        contentHandler[data[i].type](contentElement, data[i]);
    }
}

export { handleContent }