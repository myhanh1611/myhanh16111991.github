import pagination from "./pagination.js";

let url = new URL(window.location.href);
let studentPerPage = Number(url.searchParams.get("_limit")) || 5;
let page = Number(url.searchParams.get("_page")) || 1;

const tbody = document.querySelector(".data");
const nav = document.querySelector(".nav");

export default function ({ link, total, data }) {
    let html = data
        .map((s) => {
            return `
            <tr>
                <td>${s.id}</td>
                <td>${s.first_name}</td>
                <td>${s.last_name}</td>
                <td>
                    <a href="mailto:${s.email}">
                        ${s.email}
                    </a>
                </td>
                <td>
                    <a href="tel:${s.phone}">
                        ${s.phone}
                    </a>
                </td>
                <td>
                    <a href="student.html?studentId=${s.id}">
                        <i class="bi bi-info-circle"></i>
                    </a>
                </td>
            </tr>
        `;
        })
        .join("");

    tbody.innerHTML = html;

    let totalPage = Math.ceil(total / studentPerPage);
    let pg = pagination(link, page, totalPage);
    nav.innerHTML = pg;
}

export function renderStudent({ first_name, last_name, email, phone }) {
    let html = `
            <p>Họ: ${last_name}</p>
            <p>Tên: ${first_name}</p>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
        `;

    document.title = first_name + " " + last_name;
    document.getElementById("info").innerHTML = html;
}

export { studentPerPage, page, url };
