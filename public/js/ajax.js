let parseLink = (link) => {
    let slash = link.lastIndexOf("?");
    let gte = link.lastIndexOf(">");

    let href = link.slice(slash, gte);

    let quote1 = Number(link.indexOf('"')) + 1;
    let quote2 = link.indexOf('"', quote1);
    let rel = link.slice(quote1, quote2);

    return { [rel]: href };
};

export default function ({ method, uri, body, onerror, onsuccess }) {
    const xhr = new XMLHttpRequest();

    xhr.responseType = "json";

    xhr.open(method, uri);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onerror = onerror ? onerror : () => console.log("Cannot send request");

    xhr.onload = () => {
        let link = xhr.getResponseHeader("link");

        if (link) {
            link = link.split(", ").map((l) => parseLink(l));
            link = Object.assign({}, ...link);
        }

        let total = xhr.getResponseHeader("x-total-count");

        onsuccess({
            link,
            total,
            data: xhr.response,
        });
    };

    xhr.send(body);
}
