interface ElementAttributes {
    [key: string]: string;
}

interface ElementObject {
    tag: string;
    attr?: ElementAttributes;
    children?: string | ElementObject | (string | ElementObject)[] | any[];
}
export function createElement(element : ElementObject) {
    const { tag, attr, children } = element;
    const el = document.createElement(tag);

    if (attr) {
        for (const [key, value] of Object.entries(attr)) {
            el.setAttribute(key, value);
        }
    }


    if (children) {
        if (Array.isArray(children)) {
            children.forEach(child => {
                const childElement = createElement(child);
                el.appendChild(childElement);
            });
        } else {
            const childElement = createElement(<ElementObject>children);
            el.appendChild(childElement);
        }
    }

    return el;
}


