const { ipcRenderer } = require('electron')

const style = document.createElement('style');
style.textContent = CSS_CONTENT;
document.head.appendChild(style);

let light = null;

setInterval(() => {
    const theme = document.querySelector('html').getAttribute('theme');

    if (theme == 'dark' && light !== false) {
        light = false;
        ipcRenderer.send('theme', 1);
    }

    else if (theme == 'light' && light !== true) {
        light = true;
        ipcRenderer.send('theme', 0);
    }

    else if(theme != 'dark' && theme != 'light') {
        light = null;
        ipcRenderer.send('theme', 0);
    }


    const footer = document.querySelector('.footer');

    if (footer)
        footer.parentNode.removeChild(footer);

}, 60);