document.getElementById("generateBtn").addEventListener("click", async () => {
    const prompt = document.getElementById("prompt").value;
    if (prompt.trim() === "") {
        alert("Please enter an image description.");
        return;
    }

    const imageContainer = document.getElementById("imageContainer");
    const loadingSpinner = document.getElementById("loadingSpinner");

    imageContainer.innerHTML = "";
    loadingSpinner.style.display = "block";

    try {
        const response = await fetch("https://dall-t.azurewebsites.net/api/httpTrigger0", {  // Replace with your Azure Function URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        });

        if (response.ok) {
            const { imageUrls } = await response.json();
            loadingSpinner.style.display = "none";
            imageUrls.forEach(url => {
                const img = document.createElement("img");
                img.src = url;
                img.alt = prompt;
                img.style.width = "100%";
                img.style.maxWidth = "256px";
                img.style.borderRadius = "10px";
                imageContainer.appendChild(img);
            });
        } else {
            loadingSpinner.style.display = "none";
            imageContainer.innerHTML = "Failed to generate image. Please try again.";
        }
    } catch (error) {
        console.error("Error:", error);
        loadingSpinner.style.display = "none";
        imageContainer.innerHTML = "Failed to generate image. Please try again.";
    }
});
