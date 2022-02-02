var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let showMenu = false;
let baseHeight = 360;
let baseWidth = 400;
let changelog = false;
const currentVersion = 'update-35';
// const currentVersion = 'beta'
if (figma.command == 'openMenu' || !figma.command) {
    figma.clientStorage.getAsync(currentVersion).then((e) => {
        if (!e) {
            figma.clientStorage.setAsync(currentVersion, true);
            const currentWidth = baseWidth / figma.viewport.zoom;
            const currentHeight = baseHeight / figma.viewport.zoom;
            figma.showUI(__uiFiles__['changelog'], {
                width: baseWidth,
                height: baseHeight,
                visible: true,
                position: {
                    x: figma.viewport.center.x - currentWidth / 2,
                    y: figma.viewport.center.y - currentHeight / 2,
                },
            });
            changelog = true;
        }
        else {
            showMenu = true;
            figma.showUI(__uiFiles__['ui'], {
                width: baseWidth,
                height: baseHeight,
                visible: true,
            });
        }
    });
}
figma.parameters.on('input', ({ parameters, key, query, result }) => {
    switch (key) {
        case 'layoutWidth':
        case 'columns':
        case 'margin':
        case 'gutter':
            if (/^\d+$/.test(query)) {
                result.setSuggestions([query]);
            }
            else {
                result.setError('Please enter a valid numerical value!');
            }
            break;
        default:
            return;
    }
});
let fontCount = 0;
let styleErrors = {};
let errorNodes = [];
let t = 0;
let elementRunning = 0;
let defaultColours = {
    '#fff7ee': {
        r: 255,
        g: 247,
        b: 238,
        id: '8c9617de544390c653142eede2ea41c2751af22b',
    },
    '#fcf0e4': {
        r: 252,
        g: 240,
        b: 228,
        id: '213c961fa90c496ac415e76b45142d41f358accb',
    },
    '#fcbd8f': {
        r: 252,
        g: 189,
        b: 143,
        id: 'bbf78f75801ea0d2d0f3050be951285782b3ca5e',
    },
    '#dd720': {
        r: 221,
        g: 114,
        b: 0,
        id: '267145593dfb6ad0d14933f8f37765d258904846',
    },
    '#d34e15': {
        r: 211,
        g: 78,
        b: 21,
        id: '72813218dd2feba1cf4976d9d3550425cc1e4e8c',
    },
    '#fef4f6': {
        r: 254,
        g: 244,
        b: 246,
        id: '51f94aaf197dd45a3dfaddb292f28890be933e2e',
    },
    '#feeef0': {
        r: 254,
        g: 238,
        b: 240,
        id: '38521f75b36674f6a32ac1b8fcbcd04d592e3440',
    },
    '#ff8b8b': {
        r: 255,
        g: 139,
        b: 139,
        id: '1193678ece42966c93f3961a8b76f214fed44734',
    },
    '#ff6b6b': {
        r: 255,
        g: 107,
        b: 107,
        id: 'e3e6b3307daa9473e71ba5a9c48aa703fc013e51',
    },
    '#f22a42': {
        r: 242,
        g: 42,
        b: 66,
        id: '84922f004566dcbdbdff0289eefb8681599d610a',
    },
    '#fef8ed': {
        r: 254,
        g: 248,
        b: 237,
        id: '99ebc3b6016d19406a419f73a8eb6dbaeb1eb39e',
    },
    '#fcf2de': {
        r: 252,
        g: 242,
        b: 222,
        id: 'cc1253e78ae85d9b9407461c71b68f750bc162fb',
    },
    '#f3c55d': {
        r: 243,
        g: 197,
        b: 93,
        id: '9ae4b67659bdd52950f997e2f316c5904e8bae82',
    },
    '#eab02f': {
        r: 234,
        g: 176,
        b: 47,
        id: 'c055361374ac99ecf8f2fb4d71ec2bbcd55ba907',
    },
    '#c08c17': {
        r: 192,
        g: 140,
        b: 23,
        id: 'cb820862a7ad4336a3386a188e1876ef34e8f32b',
    },
    '#effbf6': {
        r: 239,
        g: 251,
        b: 246,
        id: '2549c56fb2f6b41cd3c7912abd12c28b265b2ea8',
    },
    '#e0f6ed': {
        r: 224,
        g: 246,
        b: 237,
        id: 'c4490a4ecd4153b55d0dfcb6fa930011c98ce4b9',
    },
    '#82dca1': {
        r: 130,
        g: 220,
        b: 161,
        id: 'deb0825054f5b4c125b597c9b49a430b5edc8dc2',
    },
    '#0b16a': {
        r: 0,
        g: 177,
        b: 106,
        id: '7b20e26e6ea6bb7dd73b10b16ecdb80127e2c073',
    },
    '#0995c': {
        r: 0,
        g: 153,
        b: 92,
        id: '987fd7201639fef60d639ea53d69a8c94c7c82d7',
    },
    '#f7f8f9': {
        r: 247,
        g: 248,
        b: 249,
        id: '56b2f171bb2babec15fd88588a918b23d41cf9ff',
    },
    '#f1f3f4': {
        r: 241,
        g: 243,
        b: 244,
        id: 'b972c3ba950cecf310ee2d5abf86eb5c06b210cb',
    },
    '#dbe1e5': {
        r: 219,
        g: 225,
        b: 229,
        id: '917bc4f4ee86952ac117af1cf6a9c2099ebc6aaa',
    },
    '#b8c4cb': {
        r: 184,
        g: 196,
        b: 203,
        id: '08a1bf75dc9925e8d293a97bf47feb9f567bcf30',
    },
    '#89959c': {
        r: 137,
        g: 149,
        b: 156,
        id: 'a42defd6689a8ddd9bd48ec167746e60fa4c0318',
    },
    '#5b6971': {
        r: 91,
        g: 105,
        b: 113,
        id: 'e73776afef2832a1b28b07910fb15b4b3070d20a',
    },
    '#3a4850': {
        r: 58,
        g: 72,
        b: 80,
        id: 'f0da759f2aae8420bfd72c2a210aaa9959e9b509',
    },
    '#2621': {
        r: 2,
        g: 6,
        b: 33,
        id: 'b23234a48c8a51990333ec468ab8515f6d33c4dc',
    },
    '#f8f8f8': {
        r: 248,
        g: 248,
        b: 248,
        id: '4244e6465386e330161a3fe9270021fb83c9c458',
    },
    '#f1f1f1': {
        r: 241,
        g: 241,
        b: 241,
        id: '266be9272b733993024cfb1d2058f311675a0103',
    },
    '#dedede': {
        r: 222,
        g: 222,
        b: 222,
        id: '2b2d3456b159d1a9a6eea90908e157642bf09832',
    },
    '#b4b4b4': {
        r: 180,
        g: 180,
        b: 180,
        id: 'f963652214e77f9da21ae07dc5e0fec23b7cb5d8',
    },
    '#898989': {
        r: 137,
        g: 137,
        b: 137,
        id: '9237ac161793c09f522a7c72aeef276c94a15bca',
    },
    '#4d4d4d': {
        r: 77,
        g: 77,
        b: 77,
        id: '275e0d9c159a7e823b0b6bbade6342ddc69ba541',
    },
    '#393939': {
        r: 57,
        g: 57,
        b: 57,
        id: '8fc696c1b41a169cb10f4ee060c9beea1b5ea2ff',
    },
    '#fff': {
        r: 15,
        g: 15,
        b: 15,
        id: '34619fe859d5177feb045211c265910299b0b711',
    },
    '#f4fafe': {
        r: 244,
        g: 250,
        b: 254,
        id: 'a2348c1962ae98770fdeeed5fd34fcac577fbd49',
    },
    '#e7f4fe': {
        r: 231,
        g: 244,
        b: 254,
        id: '46016db48f92ccd9cc1192eecf69c54857625068',
    },
    '#2196f3': {
        r: 33,
        g: 150,
        b: 243,
        id: '97d7b45b073c5a3f42a1517718bcb42896438333',
    },
    '#117dd2': {
        r: 17,
        g: 125,
        b: 210,
        id: '7a05b1835ccc152c32af10c59bb34cc41277990f',
    },
    '#1262a2': {
        r: 18,
        g: 98,
        b: 162,
        id: '7b6683b09d356b6f55f36ad5fadfe0adc6eead2f',
    },
    '#fff0e5': {
        r: 255,
        g: 240,
        b: 229,
        id: '30b1b347e77f519b20a2fe285632734c4eb2f610',
    },
    '#ffe8d2': {
        r: 255,
        g: 232,
        b: 210,
        id: 'fd2274b098a4eb3b77b54ba39e60b5d9da6d81ce',
    },
    '#ff6c0': {
        r: 255,
        g: 108,
        b: 0,
        id: '914d3ab23706f83a502ee32286e1c412dda6201f',
    },
    '#cc560': {
        r: 204,
        g: 86,
        b: 0,
        id: 'efe29b4aacc46a0081455cfb1b48e5177aa01898',
    },
    '#ac490': {
        r: 172,
        g: 73,
        b: 0,
        id: 'cbc2d9f83550a4228c520d52261bdaabd1a6a65f',
    },
};
let exportElements = [];
if (figma.command == 'generateAssets') {
    organiseAssets();
    if (t > 0) {
        setTimeout(() => {
            figma.closePlugin('Generated assets!');
        }, t);
    }
    else {
        figma.closePlugin('Generated assets!');
    }
}
if (figma.command == 'convertText') {
    if (figma.currentPage.selection.length == 0) {
        figma.ui.postMessage({
            type: 'error',
            data: 'Please select an element!',
        });
    }
    else {
        errorNodes = [];
        getElements(figma.currentPage.selection, 'convert');
        if (fontCount > 0) {
            figma.closePlugin(`Converted ${fontCount} text elements!`);
        }
        else {
            figma.closePlugin('There were no fonts to convert!');
        }
    }
}
addMenu(figma.root);
figma.currentPage
    .findAll((a) => a.type == 'FRAME')
    .forEach((t) => {
    addMenu(t);
});
function addMenu(e) {
    try {
        e.setRelaunchData({
            openMenu: '',
            generateAssets: '',
            createGrid: '',
            convertText: '',
        });
    }
    catch (err) {
        console.log(err);
    }
}
function organiseAssets() {
    exportElements = [];
    let assetsPage = figma.currentPage.findChildren((n) => n.getPluginData('key') == 'assets');
    if (assetsPage) {
        assetsPage.forEach((r) => r.remove());
    }
    let frames = figma.currentPage.findAll((t) => t.exportSettings != null &&
        t.exportSettings.length > 0 &&
        t.type !== 'FRAME');
    if (frames.length > 0) {
        let svgFrame, imageFrame;
        let imageNodes = frames.filter((r) => r.exportSettings[0].format != 'SVG');
        let svgNodes = frames.filter((r) => r.exportSettings[0].format == 'SVG');
        if (svgNodes.length > 0) {
            svgFrame = positionFrame();
            svgFrame.setPluginData('key', 'assets');
            svgFrame.name = 'Assets - SVG';
            svgFrame.layoutMode = 'HORIZONTAL';
            svgFrame.paddingLeft = 10;
            svgFrame.paddingTop = 10;
            svgFrame.paddingBottom = 10;
            svgFrame.paddingRight = 10;
            svgFrame.counterAxisSizingMode = 'AUTO';
            svgFrame.primaryAxisSizingMode = 'AUTO';
            svgFrame.itemSpacing = 20;
            addMenu(svgFrame);
        }
        if (imageNodes.length > 0) {
            if (svgNodes.length > 0) {
                t = 300;
            }
            else {
                t = 0;
            }
            setTimeout(() => {
                imageFrame = positionFrame();
                imageFrame.setPluginData('key', 'assets');
                imageFrame.name = 'Assets - Images';
                imageFrame.layoutMode = 'HORIZONTAL';
                imageFrame.paddingLeft = 10;
                imageFrame.paddingTop = 10;
                imageFrame.paddingBottom = 10;
                imageFrame.paddingRight = 10;
                imageFrame.counterAxisSizingMode = 'AUTO';
                imageFrame.primaryAxisSizingMode = 'AUTO';
                imageFrame.itemSpacing = 20;
                addMenu(imageFrame);
            }, t);
        }
        frames.forEach((e) => {
            if (e.exportSettings[0].format == 'SVG') {
                svgFrame.appendChild(e.clone());
            }
            else {
                setTimeout(() => {
                    imageFrame.appendChild(e.clone());
                }, t);
            }
        });
        if (svgNodes.length > 0) {
            figma.viewport.scrollAndZoomIntoView([svgFrame]);
        }
        else {
            setTimeout(() => {
                figma.viewport.scrollAndZoomIntoView([imageFrame]);
            }, t);
        }
        try {
            figma.ui.postMessage({
                type: 'success',
                data: 'Successfully exported all the assets into a new frame',
            });
        }
        catch (_a) {
            console.log('No ui opened to send a message');
        }
    }
    else {
        try {
            figma.ui.postMessage({
                type: 'success',
                data: 'There are no assets on the current page!',
            });
        }
        catch (_b) {
            console.log('No ui opened to send a message');
        }
    }
}
if (figma.command == 'createGrid') {
    figma.showUI(__uiFiles__['grid'], {
        width: 400,
        height: 360,
        visible: true,
    });
}
function convertButtons() {
    figma.currentPage.selection.forEach((e) => {
        if (e.type == 'FRAME' ||
            e.type == 'INSTANCE' ||
            e.type == 'GROUP' ||
            e.type == 'COMPONENT_SET' ||
            e.type == 'COMPONENT' ||
            e.type == 'BOOLEAN_OPERATION') {
            let elements = [];
            if (e.name.includes('Components')) {
                elements.push(e);
            }
            else {
                e.findAll((r) => r.name.includes('Components')).forEach((r) => elements.push(r));
            }
            if (elements.length)
                elements.forEach((r) => __awaiter(this, void 0, void 0, function* () {
                    let path = r.name.split('/');
                    let type = 'desktop';
                    if (path[0].includes('[M]')) {
                        type = 'mobile';
                    }
                    if (path[2].includes('CTA') || path[1] == 'Buttons') {
                        let compSet;
                        if (path[2].includes('CTA')) {
                            compSet = figma.importComponentSetByKeyAsync('e7cd7d5df859f90a000c66e0cda84c6abe535bb2');
                        }
                        else {
                            compSet = figma.importComponentSetByKeyAsync('c918ee09c4bce3804100a8dc51a6aa3ff9dff40a');
                        }
                        let c = yield compSet;
                        let colour = path[3];
                        let style = path[4];
                        let size = path[5];
                        if (!size) {
                            size = path[4];
                            style = 'Regular';
                        }
                        if (colour == 'Multicolored')
                            colour = 'Black';
                        let filtered = c.children.filter((t) => {
                            let cName = t.name.split(',');
                            if (path[2] == 'CTA') {
                                if (cName[0].replace(/.+?=/g, '').toLowerCase() ==
                                    colour.toLowerCase().trim() &&
                                    cName[1].replace(/.+?=/g, '').toLowerCase() ==
                                        style.toLowerCase().trim() &&
                                    cName[2].replace(/.+?=/g, '').toLowerCase() ==
                                        size.toLowerCase().trim() &&
                                    cName[3].replace(/.+?=/g, '').toLowerCase() ==
                                        type.toLowerCase().trim()) {
                                    return t;
                                }
                            }
                            else {
                                if (style == 'Filled')
                                    style = 'Regular';
                                if (cName[0].replace(/.+?=/g, '').toLowerCase() ==
                                    type.toLowerCase() &&
                                    cName[1].replace(/.+?=/g, '').toLowerCase() ==
                                        colour.toLowerCase() &&
                                    cName[3].replace(/.+?=/g, '').toLowerCase() ==
                                        size.toLowerCase().trim()) {
                                    if (style && style.includes('Icon')) {
                                        if (cName[4].replace(/.+?=/g, '').toLowerCase() == 'true') {
                                            return t;
                                        }
                                    }
                                    else {
                                        if (cName[2].replace(/.+?=/g, '').toLowerCase() ==
                                            style.toLowerCase() &&
                                            cName[4].replace(/.+?=/g, '').toLowerCase() == 'false')
                                            return t;
                                    }
                                }
                            }
                        });
                        if (filtered.length == 1) {
                            conversionComplete = false;
                            let newButton = filtered[0];
                            if ('children' in newButton) {
                                if (r.type != 'INSTANCE') {
                                    let q = r.createInstance();
                                    r.parent.appendChild(q);
                                    q.x = r.x;
                                    q.y = r.y;
                                    r.remove();
                                    q.swapComponent(filtered[0]);
                                    replaceText(q, r);
                                    r.remove();
                                    figma.currentPage.selection = [q];
                                }
                                else {
                                    let ogEl = r.clone();
                                    r.swapComponent(filtered[0]);
                                    replaceText(r, ogEl);
                                    let i = setInterval(() => {
                                        if (conversionComplete) {
                                            clearInterval(i);
                                            ogEl.remove();
                                        }
                                    });
                                    figma.currentPage.selection = [r];
                                }
                            }
                        }
                    }
                }));
        }
    });
}
let conversionComplete = false;
function getElements(e, action) {
    elementRunning++;
    e.forEach((r) => __awaiter(this, void 0, void 0, function* () {
        let frame = getFrame(r.parent);
        if (r.type === 'FRAME')
            frame = r;
        if ('children' in r) {
            r.findAllWithCriteria({ types: ['TEXT'] }).forEach((text) => {
                if (action == 'check') {
                    if (frame) {
                        checkText(text, frame.width);
                    }
                }
                if (action == 'convert') {
                    if (frame) {
                        convertText(text, frame.width);
                    }
                }
            });
        }
        else if (r.type === 'TEXT') {
            if (action == 'check') {
                if (frame) {
                    checkText(r, frame.width);
                }
            }
            if (action == 'convert') {
                if (frame) {
                    convertText(r, frame.width);
                }
            }
        }
        if (action == 'check') {
            if ('fills' in r || 'strokes' in r) {
                checkColour(r);
            }
        }
    }));
    if (--elementRunning == 0) {
        if (action == 'check') {
            if (errorNodes.length > 0)
                figma.currentPage.selection = errorNodes;
            if (errorNodes.length > 0) {
                let errorMessage = '';
                for (let [key, value] of Object.entries(styleErrors)) {
                    let x = `<div class="styleTitle" onclick="selectNode('${key}')">${figma.getNodeById(key).name}</div>`;
                    // @ts-ignore
                    value.forEach((element) => {
                        x += `<div>${element}</div>`;
                    });
                    errorMessage += x;
                }
                figma.ui.postMessage({
                    type: 'style',
                    data: errorMessage,
                });
            }
            else {
                return figma.ui.postMessage({
                    type: 'success',
                    data: 'There are no styling errors in your selection!',
                });
            }
        }
        if (action == 'convert') {
            if (fontCount > 0) {
                figma.ui.postMessage({
                    type: 'success',
                    data: `Converted ${fontCount} text elements to the correct fonts!`,
                });
            }
            else {
                figma.ui.postMessage({
                    type: 'success',
                    data: `There are no fonts to convert!`,
                });
            }
        }
    }
}
function convertFrames() {
    const nodeProps = [
        'name',
        'visible',
        'locked',
        'x',
        'y',
        'rotation',
        'constrainProportions',
        'layoutAlign',
        'layoutGrow',
        'opacity',
        'blendMode',
        'isMask',
        'effects',
        'effectStyleId',
        'backgrounds',
        'backgroundStyleId',
        'fills',
        'strokes',
        'strokeWeight',
        'strokeMiterLimit',
        'strokeAlign',
        'strokeCap',
        'strokeJoin',
        'dashPattern',
        'fillStyleId',
        'strokeStyleId',
        'cornerRadius',
        'cornerSmoothing',
        'topLeftRadius',
        'topRightRadius',
        'bottomLeftRadius',
        'bottomRightRadius',
        'exportSettings',
        'overflowDirection',
        'numberOfFixedChildren',
        'layoutMode',
        'primaryAxisSizingMode',
        'counterAxisSizingMode',
        'primaryAxisAlignItems',
        'counterAxisAlignItems',
        'paddingLeft',
        'paddingRight',
        'paddingTop',
        'paddingBottom',
        'itemSpacing',
        'layoutGrids',
        'gridStyleId',
        'clipsContent',
        'guides',
    ];
    let e = figma.currentPage.selection.forEach((x) => {
        if (x.type != 'FRAME' &&
            x.type != 'GROUP' &&
            x.type != 'COMPONENT_SET' &&
            x.type != 'COMPONENT' &&
            x.type != 'BOOLEAN_OPERATION')
            return;
        x.findAll((r) => r.type == 'FRAME' && r.parent.type != 'INSTANCE').forEach((e) => {
            if (e.type == 'FRAME' && e.children.length > 1) {
                let group = figma.group(e.children, e.parent);
                group.name = e.name;
                nodeProps.forEach((i) => {
                    try {
                        group[i] = e[i];
                    }
                    catch (_a) { }
                });
                if (e['backgrounds'].length > 0) {
                    let r = figma.createRectangle();
                    nodeProps.forEach((i) => {
                        try {
                            r[i] = e[i];
                        }
                        catch (_a) { }
                    });
                    r.resize(e['width'], e['height']);
                    r.x = e.x;
                    r.y = e.y;
                    group.insertChild(0, r);
                }
                e.remove();
            }
            else if (e.type == 'FRAME') {
                if (e.children.length == 1) {
                    try {
                        const node = e.children[0];
                        let id = node.id;
                        let x = node.x;
                        let y = node.y;
                        e.parent.appendChild(e.children[0]);
                        let newEl = figma.getNodeById(id);
                        if (newEl && 'x' in newEl) {
                            newEl.x = x + e.x;
                            newEl.y = y + e.y;
                        }
                        e.remove();
                    }
                    catch (_a) { }
                }
                else {
                    e.remove();
                }
            }
        });
    });
}
function destackGroups() {
    figma.currentPage.selection.forEach((x) => {
        if (!('children' in x))
            return;
        if (x.type == 'GROUP' &&
            x.parent.type != 'INSTANCE' &&
            x.getPluginData('temp')) {
            if (x.type == 'GROUP' && x.children.length == 1) {
                try {
                    let id = x.children[0].id;
                    x.parent.appendChild(x.children[0]);
                    if ('expanded' in x.parent)
                        x.parent.expanded = true;
                    // @ts-ignore
                    figma.currentPage.selection = [figma.getNodeById(id)];
                }
                catch (_a) { }
            }
        }
        else
            x.findAll((r) => r.type == 'GROUP' && r.parent.type != 'INSTANCE').forEach((e) => {
                if (e.type == 'GROUP' && e.children.length == 1) {
                    try {
                        if ('expanded' in e.parent)
                            e.parent.expanded = true;
                        e.parent.insertChild(e.parent.children.indexOf(e), e.children[0]);
                        let id = e.children[0].id;
                        // @ts-ignore
                        figma.currentPage.selection = [figma.getNodeById(id)];
                    }
                    catch (_a) { }
                }
            });
    });
}
function replaceText(newEl, oldEl) {
    if (oldEl.type != 'TEXT' && 'children' in oldEl) {
        oldEl.children.forEach((r) => {
            if ('children' in r && r.children.length > 1) {
                r.children.forEach((j) => {
                    replaceText(newEl, j);
                });
                return;
            }
            if (r.type == 'TEXT') {
                return replaceText(newEl, r);
            }
            if (r.type == 'FRAME' ||
                r.type == 'GROUP' ||
                r.type == 'COMPONENT_SET' ||
                r.type == 'COMPONENT' ||
                r.type == 'BOOLEAN_OPERATION') {
                return replaceText(newEl, r);
            }
            return replaceText(newEl, r);
        });
    }
    if (newEl.type != 'TEXT') {
        if (newEl.length) {
            let filtered = newEl.filter((a) => a.type == 'TEXT');
            if (filtered.length > 0) {
                return replaceText(filtered[0], oldEl);
            }
            else {
                return replaceText(newEl[0].children, oldEl);
            }
        }
        else {
            return replaceText(newEl.children, oldEl);
        }
    }
    conversionComplete = false;
    if ('characters' in oldEl && 'characters' in newEl) {
        figma.loadFontAsync(newEl.fontName).then(() => {
            newEl.characters = oldEl.characters;
            conversionComplete = true;
        });
    }
}
function getFrame(e) {
    if (!e)
        return;
    if (e.type == 'PAGE')
        return;
    if (e.type != 'FRAME' || e.parent.type != 'PAGE') {
        return getFrame(e.parent);
    }
    return e;
}
function checkText(el, width) {
    let id = el.id;
    if (el.fontName === 'Symbol(figma.mixed')
        return;
    if (el.fontName['family'] != 'Roboto') {
        if (id in styleErrors == false) {
            styleErrors[id] = [];
        }
        errorNodes.push(el);
        styleErrors[el.id].push(`Incorrect font specified!`);
    }
    if (width < 720) {
        if (el.fontName['style'] != 'Bold' &&
            el.fontName['style'] != 'Regular' &&
            el.fontName['style'] != 'Light') {
            if (id in styleErrors == false) {
                styleErrors[id] = [];
            }
            errorNodes.push(el);
            styleErrors[el.id].push(`Incorrect font weight specified!`);
        }
    }
    else {
        if (el.fontName['style'] != 'Bold' &&
            el.fontName['style'] != 'Regular' &&
            el.fontName['style'] != 'Medium' &&
            el.fontName['style'] != 'Light') {
            if (id in styleErrors == false) {
                styleErrors[id] = [];
            }
            styleErrors[el.id].push(`Incorrect font weight specified!`);
            errorNodes.push(el);
        }
    }
    let allowedSized = [28, 24, 20, 18, 16, 14, 13, 12];
    if (!allowedSized.includes(el.fontSize)) {
        if (id in styleErrors == false) {
            styleErrors[id] = [];
        }
        errorNodes.push(el);
        styleErrors[el.id].push(`Incorrect font size specified!`);
    }
}
function convertText(el, width) {
    if (el.fontName === figma.mixed) {
        console.log(el);
        console.log(el.getStyledTextSegments(['fontName']));
        return;
    }
    let style = el.fontName['style'];
    if (el.fontName['family'] != 'Roboto') {
        if (width < 768 && style === 'Medium')
            style = 'Bold';
        fontCount++;
        figma
            .loadFontAsync({
            family: 'Roboto',
            style: `${style}`,
        })
            .then(() => {
            el.fontName = {
                family: 'Roboto',
                style: `${style}`,
            };
        });
    }
    if (width < 768 && style === 'Medium' && el.fontName['family'] === 'Roboto') {
        fontCount++;
        figma
            .loadFontAsync({
            family: 'Roboto',
            style: `Bold`,
        })
            .then(() => {
            el.fontName = {
                family: 'Roboto',
                style: `Bold`,
            };
        });
    }
}
function checkColour(e) {
    let id = e.id;
    if (e.fills.length == 1) {
        let convertedFill;
        let f = e.fills[0].color;
        if (!f)
            return;
        convertedFill = {
            r: Math.round(f.r * 255),
            g: Math.round(f.g * 255),
            b: Math.round(f.b * 255),
        };
        let matchFound = false;
        for (let x in defaultColours) {
            let currentColour = defaultColours[x];
            if (convertedFill.r == currentColour.r &&
                convertedFill.g == currentColour.g &&
                convertedFill.b == currentColour.b) {
                matchFound = true;
                if (!e.fillStyleId && e.fills[0].opacity == 1) {
                    figma.importStyleByKeyAsync(currentColour.id).then((s) => {
                        e.fillStyleId = s.id;
                    });
                }
            }
        }
        if (!matchFound) {
            if (id in styleErrors == false) {
                styleErrors[id] = [];
            }
            styleErrors[e.id].push(`The fill colour #${((1 << 24) +
                (convertedFill.r << 16) +
                (convertedFill.g << 8) +
                convertedFill.b)
                .toString(16)
                .slice(1)} is not a part of the design system!`);
            errorNodes.push(e);
        }
    }
    if (e.strokes.length == 1) {
        let convertedFill;
        let f = e.strokes[0].color;
        if (!f)
            return;
        convertedFill = {
            r: Math.round(f.r * 255),
            g: Math.round(f.g * 255),
            b: Math.round(f.b * 255),
        };
        let matchFound = false;
        for (let x in defaultColours) {
            let currentColour = defaultColours[x];
            if (convertedFill.r == currentColour.r &&
                convertedFill.g == currentColour.g &&
                convertedFill.b == currentColour.b) {
                matchFound = true;
                if (e.fillStyleId && e.fills[0].opacity == 1)
                    return;
                figma.importStyleByKeyAsync(currentColour.id).then((s) => {
                    e.strokeStyleId = s.id;
                });
            }
        }
        if (!matchFound) {
            if (id in styleErrors == false) {
                styleErrors[e.id] = [];
            }
            styleErrors[e.id].push(`The stroke colour #${((1 << 24) +
                (convertedFill.r << 16) +
                (convertedFill.g << 8) +
                convertedFill.b)
                .toString(16)
                .slice(1)} is not a part of the design system!`);
            errorNodes.push(e);
        }
    }
}
function positionFrame() {
    let currentX = -1;
    let currentWidth = 0;
    figma.currentPage.children.forEach((w) => {
        if (w.x + w.width > currentX + currentWidth) {
            currentX = w.x;
            currentWidth = w.width;
        }
    });
    let frame;
    frame = figma.createFrame();
    frame.x = currentX + currentWidth + 30;
    frame.y = figma.currentPage.children[0].y;
    return frame;
}
function resetConstraints() {
    figma.currentPage.selection.forEach((r) => {
        if (r.type == 'FRAME' ||
            r.type == 'GROUP' ||
            r.type == 'COMPONENT_SET' ||
            r.type == 'COMPONENT' ||
            r.type == 'BOOLEAN_OPERATION') {
            let el = r.findAll((t) => 'constraints' in t && t.type != 'INSTANCE');
            el.forEach((u) => {
                if ('constraints' in u) {
                    try {
                        u.constraints = {
                            horizontal: 'MIN',
                            vertical: 'MIN',
                        };
                    }
                    catch (e) { }
                }
            });
        }
        else {
            if ('constraints' in r) {
                r.constraints = {
                    horizontal: 'MIN',
                    vertical: 'MIN',
                };
            }
        }
    });
}
function addFrame(size) {
    return __awaiter(this, void 0, void 0, function* () {
        figma.ui.postMessage({ type: 'loading', data: 'Inserting grid...' });
        let s, width, height, name;
        switch (size) {
            case 1440:
                s = yield figma.importStyleByKeyAsync('138a91c709a4eebec70ea185f185647d49577de7');
                width = 1440;
                height = 900;
                name = 'Desktop - 1440px';
                break;
            case 1280:
                s = figma.importStyleByKeyAsync('1b06e2b9dc595a2693a141d2b4f2743b014c14f0');
                width = 1280;
                height = 720;
                name = 'Desktop - 1280px';
                break;
            case 1024:
                s = figma.importStyleByKeyAsync('03e795f5a654dab76a3d0d028685b04b63e1147d');
                width = 1024;
                height = 1399;
                name = 'Desktop - 1024px';
                break;
            case 375:
                s = figma.importStyleByKeyAsync('2005abbc6d1a00d728552a30e3caaec3e4cb3ea4');
                width = 375;
                height = 667;
                name = 'Mobile - 375px';
                break;
            default:
                return figma.ui.postMessage({
                    type: 'error',
                    data: 'Grid size is not available!',
                });
        }
        s = yield s;
        let frame = positionFrame();
        frame.gridStyleId = s.id;
        frame.resize(width, height);
        frame.name = name;
        figma.viewport.scrollAndZoomIntoView([frame]);
        figma.ui.postMessage({
            type: 'success',
            data: 'Grid successfully inserted!',
        });
    });
}
function convertComponents() {
    figma.currentPage.selection.forEach((u) => {
        if (u.type == 'INSTANCE' && u.parent.type != 'INSTANCE') {
            let f = figma.group([u], u.parent);
            f.setPluginData('temp', 'true');
            f.x = u.x;
            f.y = u.y;
            f.resize(u.width, u.height);
            figma.currentPage.selection = [f];
            return convertComponents();
        }
        if ('children' in u) {
            u.findAll((r) => r.type == 'INSTANCE').forEach((u) => {
                if ('mainComponent' in u) {
                    if (!figma.getNodeById(u.id)) {
                        return convertComponents();
                    }
                    if (u.mainComponent.remote)
                        return;
                    u.detachInstance();
                }
            });
        }
    });
}
function connectColour() {
    figma.currentPage.selection.forEach((e) => {
        if (e.type === 'STICKY' || e.type === 'CONNECTOR')
            return;
        if ('children' in e || 'fills' in e || 'strokes' in e) {
            let nodes = [];
            if ('children' in e) {
                e.findAll((r) => 'fills' in r || 'strokes' in r).forEach((e) => {
                    if (!('fills' in e || 'strokes' in e))
                        return;
                    if (e.type === 'STICKY' || e.type === 'CONNECTOR')
                        return;
                    // @ts-ignore
                    if (e.strokes && e.fills.length == 1 && e.strokes.length == 1) {
                        nodes.push({ node: e, color: e.strokes, type: 'stroke' });
                        nodes.push({ node: e, color: e.fills, type: 'fill' });
                    } // @ts-ignore
                    else if (e.fills.length == 1)
                        nodes.push({ node: e, color: e.fills, type: 'fill' });
                    else if (e.strokes.length == 1)
                        nodes.push({ node: e, color: e.strokes, type: 'stroke' });
                });
            }
            else {
                if (!('fills' in e || 'strokes' in e))
                    return;
                // @ts-ignore
                if (e.fills.length == 1 && e.strokes.length == 1) {
                    nodes.push({ node: e, color: e.strokes, type: 'stroke' });
                    nodes.push({ node: e, color: e.fills, type: 'fill' });
                } // @ts-ignore
                else if (e.fills.length == 1)
                    nodes.push({ node: e, color: e.fills, type: 'fill' });
                else if (e.strokes.length == 1)
                    nodes.push({ node: e, color: e.strokes, type: 'stroke' });
            }
            nodes.forEach((r) => {
                if (r.node.fillStyleId != '' && r.node.strokeStyleId != '')
                    return;
                let i = r.color[0];
                if (i.opacity != 1 || !i.visible)
                    return;
                let f = i.color;
                if (!f || f.type == 'IMAGE')
                    return;
                let c = {
                    r: Math.round(f.r * 255),
                    g: Math.round(f.g * 255),
                    b: Math.round(f.b * 255),
                };
                for (let x in defaultColours) {
                    let currentColour = defaultColours[x];
                    if (c.r == currentColour.r &&
                        c.g == currentColour.g &&
                        c.b == currentColour.b) {
                        figma.importStyleByKeyAsync(currentColour.id).then((s) => {
                            if (r.type == 'fill')
                                r.node.fillStyleId = s.id;
                            else
                                r.node.strokeStyleId = s.id;
                        });
                    }
                }
            });
        }
    });
    return true;
}
function runCleanup(args) {
    if (figma.currentPage.selection.length == 0) {
        return figma.ui.postMessage({
            type: 'error',
            data: 'Please select an element!',
        });
    }
    if (args == 'all') {
        // convertButtons()
        convertComponents();
        resetConstraints();
        convertFrames();
        connectColour();
        destackGroups();
    }
    else {
        args.forEach((a) => {
            switch (a) {
                case 'reset-constraints':
                    resetConstraints();
                    break;
                case 'convert-buttons':
                    convertButtons();
                    break;
                case 'connect-colours':
                    connectColour();
                    break;
                case 'detach-components':
                    convertComponents();
                    break;
                case 'cleanup-groups':
                    destackGroups();
                    break;
                case 'cleanup-frames':
                    convertFrames();
                    break;
                default:
                    break;
            }
        });
    }
    figma.ui.postMessage({
        type: 'success',
        data: 'Cleaned up the document!',
    });
}
function dropFrame(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        const { dropPosition, windowSize, offset, itemSize } = msg;
        const bounds = figma.viewport.bounds;
        const zoom = figma.viewport.zoom;
        const hasUI = Math.round(bounds.width * zoom) !== windowSize.width;
        const leftPaneWidth = windowSize.width - bounds.width * zoom - 240;
        const xFromCanvas = hasUI
            ? dropPosition.clientX - leftPaneWidth
            : dropPosition.clientX;
        const yFromCanvas = hasUI ? dropPosition.clientY - 40 : dropPosition.clientY;
        let s, width, height, name;
        switch (msg.size) {
            case 1440:
                s = yield figma.importStyleByKeyAsync('138a91c709a4eebec70ea185f185647d49577de7');
                width = 1440;
                height = 900;
                name = 'Desktop - 1440px';
                break;
            case 1280:
                s = figma.importStyleByKeyAsync('1b06e2b9dc595a2693a141d2b4f2743b014c14f0');
                width = 1280;
                height = 720;
                name = 'Desktop - 1280px';
                break;
            case 1024:
                s = figma.importStyleByKeyAsync('03e795f5a654dab76a3d0d028685b04b63e1147d');
                width = 1024;
                height = 1399;
                name = 'Desktop - 1024px';
                break;
            case 375:
                s = figma.importStyleByKeyAsync('2005abbc6d1a00d728552a30e3caaec3e4cb3ea4');
                width = 375;
                height = 667;
                name = 'Mobile - 375px';
                break;
            default:
                return figma.ui.postMessage({
                    type: 'error',
                    data: 'Grid size is not available!',
                });
        }
        s = yield s;
        let frame = figma.createFrame();
        frame.gridStyleId = s.id;
        frame.resize(width, height);
        frame.name = name;
        figma.ui.postMessage({
            type: 'success',
            data: 'Grid successfully inserted!',
        });
        figma.currentPage.appendChild(frame);
        frame.x = bounds.x + xFromCanvas / zoom - offset.x;
        frame.y = bounds.y + yFromCanvas / zoom - offset.y;
        figma.currentPage.selection = [frame];
    });
}
function resize(height) {
    figma.ui.resize(baseWidth, baseHeight + height + 5);
}
function commandGrid(msg) {
    let frame;
    if (grid && figma.getNodeById(grid)) {
        figma.getNodeById(grid).remove();
    }
    let boxSize = msg.layoutWidth / msg.columns -
        msg.margin * 2 -
        msg.gutter * (msg.columns - 1);
    if (boxSize > 0) {
        frame = positionFrame();
        frame.name = 'Grid';
        grid = frame.id;
        frame.resize(parseInt(msg.layoutWidth), 400);
        frame.layoutMode = 'HORIZONTAL';
        frame.paddingLeft = parseInt(msg.margin);
        frame.paddingRight = parseInt(msg.margin);
        frame.itemSpacing = parseInt(msg.gutter);
        for (let x = 0; x < parseInt(msg.columns); x++) {
            let rectangle = figma.createRectangle();
            rectangle.resize(boxSize, 400);
            frame.appendChild(rectangle);
        }
        figma.viewport.scrollAndZoomIntoView([frame]);
        figma.closePlugin();
    }
    else {
        return figma.closePlugin('This grid cannot be generated!');
    }
}
let grid;
let missingColours = [];
figma.ui.onmessage = (msg) => {
    if (msg.type === 'add-frame') {
        addFrame(msg.params);
    }
    if (msg.type === 'resize-box') {
        resize(msg.args);
    }
    if (msg.type == 'dropFrame') {
        dropFrame(msg.args);
    }
    if (msg.type == 'grid') {
        let frame;
        if (grid && figma.getNodeById(grid)) {
            figma.getNodeById(grid).remove();
        }
        frame = positionFrame();
        grid = frame.id;
        frame.name = 'Grid';
        frame.resize(parseInt(msg.width), 400);
        frame.layoutMode = 'HORIZONTAL';
        frame.paddingLeft = parseInt(msg.margin);
        frame.paddingRight = parseInt(msg.margin);
        frame.itemSpacing = parseInt(msg.gutter);
        for (let x = 0; x < parseInt(msg.columns); x++) {
            let rectangle = figma.createRectangle();
            rectangle.resize(parseInt(msg.boxWidth), 400);
            frame.appendChild(rectangle);
        }
        figma.viewport.scrollAndZoomIntoView([frame]);
    }
    if (msg.type == 'create-grid') {
        figma.showUI(__uiFiles__['grid'], {
            width: 400,
            height: 360,
            visible: true,
        });
    }
    if (msg.type == 'open-cleanup') {
        figma.showUI(__uiFiles__['cleanup'], {
            width: 400,
            height: 360,
            visible: true,
        });
        baseHeight = 360;
    }
    if (msg.type == 'open-menu') {
        figma.showUI(__uiFiles__['ui'], {
            width: 400,
            height: 360,
            visible: true,
        });
    }
    if (msg.type == 'check-styles') {
        if (figma.currentPage.selection.length == 0) {
            return figma.ui.postMessage({
                type: 'error',
                data: 'Please select an element!',
            });
        }
        errorNodes = [];
        styleErrors = {};
        getElements(figma.currentPage.selection, 'check');
    }
    if (msg.type == 'convert-text') {
        if (figma.currentPage.selection.length == 0) {
            return figma.ui.postMessage({
                type: 'error',
                data: 'Please select an element!',
            });
        }
        errorNodes = [];
        getElements(figma.currentPage.selection, 'convert');
    }
    if (msg.type == 'select-node') {
        let selection = figma.getNodeById(msg.params);
        if (selection) {
            if (selection.type != 'INSTANCE')
                // @ts-ignore
                figma.currentPage.selection = [selection];
            figma.viewport.scrollAndZoomIntoView([selection]);
        }
    }
    if (msg.type == 'generate-assets') {
        organiseAssets();
    }
    if (msg.type == 'run-cleanup') {
        runCleanup(msg.args);
    }
};
figma.on('run', ({ command, parameters }) => {
    switch (command) {
        case 'calculateGrid':
            commandGrid(parameters);
            break;
        case 'fixColours':
            if (!figma.currentPage.selection.length)
                return figma.closePlugin('Please select an element!');
            let sendColour = connectColour();
            let q = setInterval(() => {
                if (sendColour) {
                    clearInterval(q);
                    figma.closePlugin('Connected colours successfully.');
                }
            });
            break;
        case 'organiseAssets':
            organiseAssets();
            if (t > 0) {
                setTimeout(() => {
                    figma.closePlugin('Generated assets!');
                }, t);
            }
            else {
                figma.closePlugin('Generated assets!');
            }
            break;
        case 'cleanOut':
            cleanPage().then(() => {
                figma.closePlugin('Moved all elements outside frames into the Archive page');
            });
            break;
    }
});
function cleanPage() {
    return new Promise((res, rej) => {
        let i = figma.currentPage.findChildren((e) => e.type != 'FRAME');
        figma.currentPage.selection = i;
        // Move to archive
        let archivePage;
        if (!figma.root.findChildren((e) => e.name === 'Archive').length) {
            archivePage = figma.createPage();
            archivePage.name = 'Archive';
        }
        else {
            archivePage = figma.root.findChildren((e) => e.name === 'Archive')[0];
        }
        i.forEach((r) => archivePage.appendChild(r));
        figma.currentPage.selection = [];
        res('Complete!');
    });
}
function getColours() {
    if (figma.currentPage.selection.length == 0) {
        figma.closePlugin('Please select an element!');
    }
    else {
        let colourNodes = {};
        let selection = figma.currentPage.selection;
        selection.forEach((e) => {
            if ('fills' in e && 'fillStyleId' in e && e.fillStyleId != '') {
                const color = e.fills[0].color;
                const r = Math.round(color.r * 255).toString(16);
                const g = Math.round(color.g * 255).toString(16);
                const b = Math.round(color.b * 255).toString(16);
                const hex = '#' + r + g + b;
                colourNodes[hex] = {
                    r: Math.round(color.r * 255),
                    g: Math.round(color.g * 255),
                    b: Math.round(color.b * 255),
                    id: e.fillStyleId.toString().replace('S:', '').split(',')[0],
                };
            }
        });
        figma.closePlugin('Logged!');
    }
}
if (figma.command === 'getColour')
    getColours();
