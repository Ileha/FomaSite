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

const heroIconFirebasePath = "heroIcon";
const heroIconElementID = "#heroIcon";

var sidebarElementTask = ajaxAsync({
    url: "../templates/sidebar.html"
});

async function initSideBar(activeItem, firebaseData)
{
    let sidebarElementText = await sidebarElementTask;

    let sidebarElement = htmlToElement(sidebarElementText);
    
    const heroIconElement = sidebarElement.querySelector(heroIconElementID);


    let heroIconRef = firebaseData.rtdbRef(firebaseData.database, heroIconFirebasePath);
    firebaseData.rtdbOnValue(heroIconRef, async (snapshot) => {
        let data = snapshot.val();
        const spaceRef = firebaseData.storageRef(firebaseData.storage, data);

        let url = await firebaseData.getDownloadURL(spaceRef);
        heroIconElement.src = url;
    });


    let item = sidebarElement.querySelector("#"+activeItem);
    item.classList.add("active");

    return sidebarElement;
}

export { initSideBar }