# coding=utf-8
from __future__ import absolute_import

__author__ = "Sven Lohrmann <malnvenshorn@gmail.com>"
__license__ = "GNU Affero General Public License http://www.gnu.org/licenses/agpl.html"
__copyright__ = "Copyright (C) 2017 Sven Lohrmann - Released under terms of the AGPLv3 License"

import octoprint.plugin


class WebcamTabPlugin(octoprint.plugin.AssetPlugin,
                      octoprint.plugin.TemplatePlugin):

    # AssetPlugin mixin

    def get_assets(self):
        return dict(
            js=["js/webcamtab.js"]
        )

    # TemplatePlugin

    def get_template_configs(self):
        return [
            dict(type="tab", name="Webcam", template=None)
        ]

    # Softwareupdate hook

    def get_update_information(self):
        return dict(
            webcamtab=dict(
                displayName="Webcam Tab",
                displayVersion=self._plugin_version,

                # version check: github repository
                type="github_release",
                user="malnvenshorn",
                repo="OctoPrint-WebcamTab",
                current=self._plugin_version,

                # update method: pip
                pip="https://github.com/malnvenshorn/OctoPrint-WebcamTab/archive/{target_version}.zip"
            )
        )


__plugin_name__ = "Webcam Tab"
__plugin_pythoncompat__ = ">=2.7,<4"


def __plugin_load__():
    global __plugin_implementation__
    __plugin_implementation__ = WebcamTabPlugin()

    global __plugin_hooks__
    __plugin_hooks__ = {
        "octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
    }
