document.getElementById("start").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    let time = document.getElementById("time").value
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: startRefreshing,
        args: [time]
    })
})

document.getElementById("stop").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: stopRefreshing
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
    localStorage.removeItem("autoRefresh")
    localStorage.removeItem("time")
    clearInterval(window.refreshInterval)
    window.refreshInterval = null
}
