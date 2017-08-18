/*
 * View model for OctoPrint-WebcamTab
 *
 * Author: Sven Lohrmann
 * License: AGPLv3
 */
$(function() {
    function WebcamTabViewModel(parameters) {
        var self = this;

        self.control = parameters[0];

        self.control.onTabChange = function (current, previous) {
            // replaced #control with #tab_plugin_webcamtab
            if (current == "#tab_plugin_webcamtab") {
                self.control._enableWebcam();
            } else if (previous == "#tab_plugin_webcamtab") {
                self.control._disableWebcam();
            }
        };

        self.control._enableWebcam = function() {
            // replaced #control with #tab_plugin_webcamtab
            if (OctoPrint.coreui.selectedTab != "#tab_plugin_webcamtab" || !OctoPrint.coreui.browserTabVisible) {
                return;
            }

            if (self.control.webcamDisableTimeout != undefined) {
                clearTimeout(self.control.webcamDisableTimeout);
            }
            var webcamImage = $("#webcam_image");
            var currentSrc = webcamImage.attr("src");

            // safari bug doesn't release the mjpeg stream, so we just set it up the once
            if (self.control._isSafari() && currentSrc != undefined) {
                return;
            }

            var newSrc = self.control.settings.webcam_streamUrl();
            if (currentSrc != newSrc) {
                if (newSrc.lastIndexOf("?") > -1) {
                    newSrc += "&";
                } else {
                    newSrc += "?";
                }
                newSrc += new Date().getTime();

                self.control.webcamLoaded(false);
                self.control.webcamError(false);
                webcamImage.attr("src", newSrc);
            }
        };

        self.onStartup = function() {
            var container = $("#control #webcam_container");
            if (container.length) {
                var hint = container.next();
                if (hint.attr("data-bind") === "visible: keycontrolPossible") {
                    hint.remove();
                }
                container.remove();
            }
        };
    };

    OCTOPRINT_VIEWMODELS.push({
        construct: WebcamTabViewModel,
        dependencies: ["controlViewModel"],
        elements: ["#tab_plugin_webcamtab"]
    });
});
