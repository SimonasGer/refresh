if (localStorage.getItem("autoRefresh") === "true") {
    setTimeout(() => {
        location.reload();
    }, localStorage.getItem("time") * 1000);
}
