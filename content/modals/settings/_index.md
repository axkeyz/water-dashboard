---
title: "Settings"
date: 2022-07-26T22:38:25+12:00
draft: false
---

Number of items per list
{{< input/dropdown 
    class = "settings-dropdown" 
    id = "items-per-list"
    click = `resetPageAndOffsets('all_outages'),
    UpdateVariableNumber('all_outages', 'limit', XITEM),
    getAllOutages('&search=' + variables.all_outages.search)`
    items = "10, 25, 50, 100"
>}}