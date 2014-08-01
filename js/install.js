var installModule = (function () {
    "use strict";

    function setUpInstallButton() {
        if (navigator.mozApps) {
            var checkIfInstalled = navigator.mozApps.getSelf();
            checkIfInstalled.onsuccess = function () {
                if (!checkIfInstalled.result) {
                    var install = document.querySelector("#btn-add"),
                        packageURL = location.href.substring(0, location.href.lastIndexOf("/")) + "/allolaplanete.zip";
                    install.style.display = "block";
                    install.onclick = function () {
                        var installApp = navigator.mozApps.installPackage(packageURL);
                        installApp.onsuccess = function() {
                            install.style.display = "none";
                        };
                        installApp.onerror = function() {
                            alert("Install failed\n\n:" + installApp.error.name);
                        };
                    };
                }
            };
        } else {
            console.log("Open Web Apps not supported");
        }
    }
    
    return {
        setUpInstallButton: setUpInstallButton
    };

})();
