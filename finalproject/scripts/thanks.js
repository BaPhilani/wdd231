const output = document.querySelector("#submittedData");
const params = new URLSearchParams(window.location.search);

function row(label, value) {
    return `<p><strong>${label}:</strong> ${value || "Not provided"}</p>`;
}

if (output) {
    output.innerHTML = [
        row("Full Name", params.get("fullName")),
        row("Email", params.get("email")),
        row("Phone", params.get("phone")),
        row("Service", params.get("serviceType")),
        row("Message", params.get("message")),
        row("Submitted", params.get("submittedAt"))
    ].join("");
}
