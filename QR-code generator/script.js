const wrapper = document.querySelector(".wrapper"),
qrInput = wrapper.querySelector(".form input"),
generateBtn = wrapper.querySelector("#generate-btn"),
qrImg = wrapper.querySelector(".qr-code img"),
downloadBtn = wrapper.querySelector("#download-btn");

let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if(!qrValue || preValue === qrValue) return;

    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    
    // Using the QR Server API
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
        downloadBtn.style.display = "block";
    });
});

// Download Logic
downloadBtn.addEventListener("click", async () => {
    try {
        const response = await fetch(qrImg.src);
        const file = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = "qrcode.png";
        link.click();
    } catch (error) {
        alert("Failed to download image. Please try again.");
    }
});

// Remove active class if input is empty
qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
        downloadBtn.style.display = "none";
    }
});