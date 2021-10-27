(function () {
    'use strict';

    class WebcamTabPlugin {
        /* eslint-disable no-underscore-dangle */

        constructor(dependencies) {
            [this.control] = dependencies;
            this.control.onTabChange = this.onTabChangeOverride();
            this.control._enableWebcam = this.enableWebcamOverride();
        }

        onTabChangeOverride() {
            return (current, previous) => {
                if (current === '#tab_plugin_webcamtab') {
                    this.control._enableWebcam();
                } else if (previous === '#tab_plugin_webcamtab') {
                    this.control._disableWebcam();
                }
            };
        }

        enableWebcamOverride() {
            const originalEnableWebcam = this.control._enableWebcam;

            return () => {
                if (OctoPrint.coreui.selectedTab !== '#tab_plugin_webcamtab' || !OctoPrint.coreui.browserTabVisible) {
                    return;
                }

                OctoPrint.coreui.selectedTab = '#control';
                originalEnableWebcam();
                OctoPrint.coreui.selectedTab = '#tab_plugin_webcamtab';
            };
        }

        /* eslint-disable-next-line class-methods-use-this */
        onAllBound() {
            const webcamTab = document.getElementById('tab_plugin_webcamtab');
            const webcamContainer = document.getElementById('webcam_container');
            if (webcamContainer) {
                const hintText = webcamContainer.nextElementSibling;
                webcamTab.appendChild(webcamContainer);
                if (hintText && hintText.getAttribute('data-bind')?.includes('keycontrolPossible')) {
                    webcamTab.appendChild(hintText);
                }
            }
        }
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: WebcamTabPlugin,
        dependencies: ['controlViewModel'],
        elements: ['#tab_plugin_webcamtab'],
    });

})();
