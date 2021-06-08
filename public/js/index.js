import ajax from "./ajax.js";
import validate, { form } from "./validate.js";
import render, { studentPerPage, page } from "./render.js";

ajax({
    method: "GET",
    uri: `/students?_page=${page}&_limit=${studentPerPage}`,
    body: null,
    onsuccess: render,
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let data = validate();

    if (data) {
        ajax({
            method: "POST",
            uri: "/students",
            body: JSON.stringify(data),
            onsuccess: () => {
                ajax({
                    method: "GET",
                    uri: `/students?_page=${page}&_limit=${studentPerPage}`,
                    body: null,
                    onsuccess: render,
                });
                form.reset();
                document.getElementById("close").click();
            },
        });
    }
});

document.forms.searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let search = this.elements.search;

    if (search.value.trim() != "") {
        ajax({
            method: "GET",
            uri: `/students?_page=1&_limit=${studentPerPage}&q=${search.value.trim()}`,
            body: null,
            onsuccess: render,
        });
    }
});
