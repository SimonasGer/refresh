chrome.storage.local.get(["autoRefresh", "time"], (data) => {
    if (data.autoRefresh === "true" && data.time) {
        setTimeout(() => {
            location.reload()
        }, data.time * 1000)
    }
})

document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("time", (data) => {
        if (data.time) {
            document.getElementById("time").value = data.time
        }
    })
})

