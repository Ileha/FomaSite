const imageElementID = "#collageItemImage";
const textElementID = "#collageItemText";

async function initCollageItem(collageItem, data, firebaseData) {
    let imageElement = collageItem.querySelector(imageElementID);
    let textElement = collageItem.querySelector(textElementID);

    textElement.innerHTML = data.title;
    const spaceRef = firebaseData.storageRef(firebaseData.storage, data.image);
    let url = await firebaseData.getDownloadURL(spaceRef);
    imageElement.src = url;
}

function ajaxAsync(data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: data.url,
            success: function (data) {
                resolve(data)
            },
            error: function (err) {
                reject(err)
            }
        });
    });
}

function appendClassesList(element, classes) {
    for (let i = 0; i < classes.length; i++) {
        element.classList.add(classes[i]);
    }
}

/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList} 
 */
function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

var context = {};

var loadtemplate = ajaxAsync({
    url: "../templates/collageItem.html"
})

const contentHandler = {
    "paragraph": async (content, data, firebaseData) => {
        let para = document.createElement("p");
        let node = document.createTextNode(data.text);
        para.appendChild(node);
        content.appendChild(para);
    },
    "header": async (content, data, firebaseData) => {
        let header = document.createElement("h1");
        header.className = "page-header";
        let node = document.createTextNode(data.text);
        header.appendChild(node);
        content.appendChild(header);
    },
    "subHeader": async (content, data, firebaseData) => {
        let header = document.createElement("h2");
        header.className = "page-subHeader";
        let node = document.createTextNode(data.text);
        header.appendChild(node);
        content.appendChild(header);
    },
    "collage": async (content, data, firebaseData) => {
        let contentDiv = document.createElement("div");
        contentDiv.classList.add("container");

        let contentDiv2 = document.createElement("div");
        appendClassesList(contentDiv2, ["row", "row-cols-1", "row-cols-sm-2", "row-cols-md-3", "g-3"]);
        contentDiv.appendChild(contentDiv2);

        await Promise.all(
            data.items.map(async item => {
                var collageItem = htmlToElement(context.collageItem);
                await initCollageItem(collageItem, item, firebaseData);
                contentDiv2.appendChild(collageItem);
            })
        );


        content.appendChild(contentDiv);
    }

}

async function handleContent(contentElement, data, firebaseData) {
    context.collageItem = await loadtemplate;

    contentElement.innerHTML = "";

    await Promise.all(
        data
            .map(async item =>
                await contentHandler[item.type](contentElement, item, firebaseData)));

}

export { handleContent }