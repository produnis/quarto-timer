quarto.doc.add_html_dependency({
  name = "quarto-timer",
  version = "1.0.0",
  scripts = {"timer.js"}
})

function Div(div)
    if div.classes[1] == "timer" then
        local containerId = div.identifier
        local timeLimit = tonumber(div.attributes["seconds"]) or 300  -- Default: 300 Sekunden

        local htmlSnippet = string.format([[
            <div id="%s"></div>
            <script>
                document.addEventListener("DOMContentLoaded", function () {
                    initializeTimer("%s", %d);
                });
            </script>
        ]], containerId, containerId, timeLimit)

        return pandoc.RawBlock("html", htmlSnippet)
    end
    return div
end

-- Füge den Filter zu Pandoc hinzu
return {
    { Div = Div }
}
