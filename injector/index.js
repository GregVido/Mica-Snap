const { ipcRenderer } = require('electron')

const style = document.createElement('style');
style.textContent = CSS_CONTENT;
document.body.appendChild(style);

let light = null;
let addPopup = false;

let child = null;
let div = null;
let title = null;

window.effect = ipcRenderer.sendSync('getBackground');

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

    else if (theme != 'dark' && theme != 'light') {
        light = null;
        ipcRenderer.send('theme', 0);
    }


    const footer = document.querySelector('.footer');

    if (footer)
        footer.parentNode.removeChild(footer);

    const popup = document.getElementById('downshift-1-menu');

    if (popup) {
        child = popup.querySelector('.VoxbS');

        if (child) {
            let elem = document.getElementById('downshift-1-item-0');

            if (!addPopup && elem.innerText.includes('Syst')) {
                addPopup = true;

                div = document.createElement('div');
                div.classList.add('CeO6L');
                div.setAttribute('role', 'option');
                div.setAttribute('aria-selected', 'false');
                div.id = 'downshift-1-item-9';

                div.innerHTML = '<div class="KT6b1"><div class="PXgY2">Effet</div><div class="tvg6i">Mica</div></div>';

                div.addEventListener('mouseover', () => {

                    let actives = Object.values(child.querySelectorAll('.DlRhy'));

                    for (let active of actives) {
                        active.classList.remove('DlRhy');
                        active.setAttribute('aria-selected', 'false');
                    }

                    popup.setAttribute('aria-activedescendant', 'downshift-1-item-9');
                    div.setAttribute('aria-selected', 'true');
                    div.classList.add('DlRhy');

                });

                div.addEventListener('click', () => {
                    let actives = child.childNodes;


                    for (let active of actives)
                        active.style.display = 'none';


                    title = document.createElement('div');
                    title.classList.add('CeO6L');
                    title.setAttribute('role', 'option');
                    title.setAttribute('aria-selected', 'false');
                    title.id = 'downshift-1-item-10';


                    title.innerHTML = `<a class="pktQ3 S8hz_"><span class="ro3J7"><span class="iZPwa"><svg width="10" height="14" viewBox="0 0 10 14" fill="none"
                    xmlns="http://www.w3.org/2000/svg" class="iV9DP">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M8.686 13.31a1.5 1.5 0 0 0 0-2.12L4.496 7l4.19-4.19A1.5 1.5 0 1 0 6.564.69l-5.25 5.25a1.5 1.5 0 0 0 0 2.12l5.25 5.25a1.5 1.5 0 0 0 2.122 0Z"
                        fill="#212121"></path>
                </svg></span></span><span class="lmyVJ">Effet</span></a>`;

                    child.appendChild(title);

                    let choice1 = document.createElement('div');

                    choice1.classList.add('CeO6L');
                    choice1.setAttribute('role', 'option');
                    choice1.setAttribute('aria-selected', 'false');
                    choice1.id = 'downshift-1-item-11';

                    choice1.innerHTML = `<a class="pktQ3 hQMCs"><span
                    class="ro3J7">
                    <div class="xJ3Bc Xf4WU xJ3Bc"></div>
                </span><span class="lmyVJ">Mica</span></a>`;

                    child.appendChild(choice1);

                    let choice2 = document.createElement('div');

                    choice2.classList.add('CeO6L');
                    choice2.setAttribute('role', 'option');
                    choice2.setAttribute('aria-selected', 'false');
                    choice2.id = 'downshift-1-item-12';

                    choice2.innerHTML = `<a class="pktQ3 hQMCs"><span
                    class="ro3J7">
                    <div class="xJ3Bc Xf4WU xJ3Bc"></div>
                </span><span class="lmyVJ">Mica Alt</span></a>`;

                    child.appendChild(choice2);

                    let choice3 = document.createElement('div');

                    choice3.classList.add('CeO6L');
                    choice3.setAttribute('role', 'option');
                    choice3.setAttribute('aria-selected', 'false');
                    choice3.id = 'downshift-1-item-12';

                    choice3.innerHTML = `<a class="pktQ3 hQMCs"><span
                    class="ro3J7">
                    <div class="xJ3Bc Xf4WU xJ3Bc"></div>
                </span><span class="lmyVJ">Acrylic</span></a>`;

                    child.appendChild(choice3);

                    let clearRadio = () => {
                        choice1.innerHTML = `<a class="pktQ3 hQMCs"><span
                        class="ro3J7">
                        <div class="xJ3Bc Xf4WU xJ3Bc"></div>
                    </span><span class="lmyVJ">Mica</span></a>`;
                        choice2.innerHTML = `<a class="pktQ3 hQMCs"><span
                        class="ro3J7">
                        <div class="xJ3Bc Xf4WU xJ3Bc"></div>
                    </span><span class="lmyVJ">Mica Alt</span></a>`;
                        choice3.innerHTML = `<a class="pktQ3 hQMCs"><span
                        class="ro3J7">
                        <div class="xJ3Bc Xf4WU xJ3Bc"></div>
                    </span><span class="lmyVJ">Acrylic</span></a>`;
                    }

                    choice1.addEventListener('click', () => {
                        clearRadio();
                        choice1.innerHTML = `<a class="pktQ3 hQMCs"><span
                    class="ro3J7">
                    <div class="xJ3Bc MCwe7"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.465 5.14 7.893.712a.937.937 0 1 1 1.325 1.326l-5.09 5.09a.937.937 0 0 1-1.326 0L.587 4.913a.937.937 0 1 1 1.326-1.325L3.465 5.14Z"
                                fill="#fff"></path>
                        </svg></div>
                </span><span class="lmyVJ">Mica</span></a>`;
                        window.effect = 2;
                        ipcRenderer.send('effect', effect);
                    });

                    choice2.addEventListener('click', () => {
                        clearRadio();
                        choice2.innerHTML = `<a class="pktQ3 hQMCs"><span
                    class="ro3J7">
                    <div class="xJ3Bc MCwe7"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.465 5.14 7.893.712a.937.937 0 1 1 1.325 1.326l-5.09 5.09a.937.937 0 0 1-1.326 0L.587 4.913a.937.937 0 1 1 1.326-1.325L3.465 5.14Z"
                                fill="#fff"></path>
                        </svg></div>
                </span><span class="lmyVJ">Mica Alt</span></a>`;
                        window.effect = 4;
                        ipcRenderer.send('effect', effect);

                    });

                    choice3.addEventListener('click', () => {
                        clearRadio();
                        choice3.innerHTML = `<a class="pktQ3 hQMCs"><span
                    class="ro3J7">
                    <div class="xJ3Bc MCwe7"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.465 5.14 7.893.712a.937.937 0 1 1 1.325 1.326l-5.09 5.09a.937.937 0 0 1-1.326 0L.587 4.913a.937.937 0 1 1 1.326-1.325L3.465 5.14Z"
                                fill="#fff"></path>
                        </svg></div>
                </span><span class="lmyVJ">Acrylic</span></a>`;
                        window.effect = 3;
                        ipcRenderer.send('effect', effect);
                    });

                    if (window.effect == 2)
                        choice1.click();

                    else if (window.effect == 4)
                        choice2.click();

                    else if (window.effect == 3)
                        choice3.click();

                    title.addEventListener('click', () => {
                        child.removeChild(title);
                        for (let active of actives)
                            active.style.display = '';

                        child.removeChild(div);
                        child.removeChild(choice1);
                        child.removeChild(choice2);
                        child.removeChild(choice3);
                        addPopup = false;
                    });

                });

                div.addEventListener('mouseout', () => {
                    div.setAttribute('aria-selected', 'false');
                    div.classList.remove('DlRhy');
                });

                child.insertBefore(div, document.getElementById('downshift-1-item-1'));
            }
        }
        else {
            child = null;
            div = null;
            title = null;
            addPopup = false;
        }
    }
    else {
        child = null;
        div = null;
        title = null;
        addPopup = false;
    }

    if (addPopup) {
        let elem = document.getElementById('downshift-1-item-0');

        if (!elem.innerText.includes('Syst')) {
            if (title)
                child.removeChild(title);
            child.removeChild(div);
            addPopup = false;
            child = null;
            div = null;
            title = null;
        }
    }

}, 60);