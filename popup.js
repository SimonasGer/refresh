document.getElementById("start").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    let time = document.getElementById("time").value

    if (time > 0) {
        alert("Refreshing Started")
        chrome.storage.local.set({ autoRefresh: "true", time: time })
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: startRefreshing,
            args: [time]
        })
    } else {
        alert("Refresh time cannot be zero, negative, or null")
    }
})

document.getElementById("stop").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.storage.local.remove(["autoRefresh", "time"])
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: stopRefreshing
    })
})

document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("time", (data) => {
        if (data.time) {
            document.getElementById("time").value = data.time
        }
    })
})

function startRefreshing(time){
    localStorage.setItem("autoRefresh", "true")
    localStorage.setItem("time", time)

    if (!window.refreshInterval) {
        window.refreshInterval = setInterval(() => {
            location.reload()
        }, time * 1000)
    }
}

function stopRefreshing(){
    alert("Refreshing Stopped")
    localStorage.removeItem("autoRefresh")
    localStorage.removeItem("time")
    clearInterval(window.refreshInterval)
    window.refreshInterval = null
    location.reload()
}
