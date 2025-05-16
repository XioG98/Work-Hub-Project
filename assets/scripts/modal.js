function changeModal() {
    const modalLogin = document.getElementById("modalLogin");
    const modalSignup = document.getElementById("modalSignUp");

    if (modalLogin.open) {
        console.log("tabierto");
        modalLogin.close();
        modalSignup.showModal();
    }
}