const form = document.querySelector("#contactForm");

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const payload = {
            fullName: form.fullName.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            serviceType: form.serviceType.value,
            message: form.message.value.trim(),
            submittedAt: new Date().toISOString()
        };

        localStorage.setItem("pavi-last-inquiry", JSON.stringify(payload));

        const params = new URLSearchParams(payload);
        window.location.href = `thanks.html?${params.toString()}`;
    });
}
