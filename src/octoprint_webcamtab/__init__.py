import octoprint.plugin


class WebcamTabPlugin(
    octoprint.plugin.AssetPlugin,
    octoprint.plugin.TemplatePlugin,
):

    # Assets

    def get_assets(self):
        return dict(
            js=["dist/webcamtab.js"]
        )

    def get_template_configs(self):
        return [
            dict(type="tab", name="Webcam", template=None)
        ]

    # Software Update

    def get_update_information(self):
        return {
            self._identifier: dict(
                displayName=self._plugin_name,
                displayVersion=self._plugin_version,

                # version check: github repository
                type="github_release",
                user="malnvenshorn",
                repo="OctoPrint-WebcamTab",
                current=self._plugin_version,

                # update method: pip
                pip="https://github.com/malnvenshorn/OctoPrint-WebcamTab/archive/{target_version}.zip"
            )
        }


__plugin_name__ = "Webcam Tab"

__plugin_pythoncompat__ = ">=3.7"

__plugin_implementation__ = WebcamTabPlugin()

__plugin_hooks__ = {
    "octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information,
}
