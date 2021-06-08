import ajax from "./ajax.js";
import validate from "./validate.js";
import render, { renderStudent, url } from "./render.js";
import { form, firstname, lastname, email, phone } from "./validate.js";

let studentId = url.searchParams.get("studentId");
let student;

ajax({
    method: "GET",
    uri: "/students/" + studentId,
    body: null,
    onsuccess: ({ data }) => {
        student = data;
        renderStudent(data);
    },
});

document.getElementById("delete").addEventListener("click", (e) => {
    let isConfirm = confirm(`Có chắc muốn xóa ${document.title}???`);

    if (isConfirm) {
        ajax({
            method: "DELETE",
            uri: "/students/" + studentId,
            body: null,
            onsuccess: () => {
                window.location.href = "/";
            },
        });
    }
});

const modal = document.getElementById("modal");

modal.addEventListener("show.bs.modal", (e) => {
    firstname.value = student.first_name;
    lastname.value = student.last_name;
    email.value = student.email;
    phone.value = student.phone;
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let data = validate();

    if (data) {
        ajax({
            method: "PUT",
            uri: "/students/" + studentId,
            body: JSON.stringify(data),
            onsuccess: ({ data }) => {
                student = data;
                renderStudent(data);
                form.reset();
                document.getElementById("close").click();
            },
        });
    }
});
