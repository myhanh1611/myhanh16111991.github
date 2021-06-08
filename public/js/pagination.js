let firstPage = (link, current) => {
    return `
        <li class="page-item ${current == 1 ? "disabled" : ""}">
            <a class="page-link" href="${link}">First</a>
        </li>    
    `;
};

let lastPage = (link, current, totalPage) => {
    return `
        <li class="page-item ${current == totalPage ? "disabled" : ""}">
            <a class="page-link" href="${link}">Last</a>
        </li>    
    `;
};

let currentPage = (current) => {
    return `
        <li class="page-item active">
            <a class="page-link">${current}</a>
        </li>
    `;
};

let prevPage = (link, page) => {
    return link
        ? `
            <li class="page-item">
                <a class="page-link" href="${link}">${page}</a>
            </li>
        `
        : "";
};

let nextPage = (link, page) => {
    return link
        ? `
            <li class="page-item">
                <a class="page-link" href="${link}">${page}</a>
            </li>
        `
        : "";
};

export default function ({ first, prev, next, last }, current, totalPage) {
    return `
        <ul class="pagination justify-content-center">
            ${firstPage(first, current)}

            ${prevPage(prev, current - 1)}

            ${currentPage(current)}

            ${nextPage(next, current + 1)}

            ${lastPage(last, current, totalPage)}
        </ul>
    `;
}
