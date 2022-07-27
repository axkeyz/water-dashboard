---
title: "Settings"
date: 2022-07-26T22:38:25+12:00
draft: false
button_text: Close
contains_closable: true
---
|  |  |
| ----------- | ----------- |
| Number of items per page | {{< input/dropdown 
    class = "settings-dropdown" 
    id = "ipp"
    click = `resetPageAndOffsets('all_outages'),
    UpdateVariableNumber('all_outages', 'limit', XITEM),
    getAllOutages(),
    this.$cookies.set('ipp', XITEM)`
    items = "10, 25, 50, 100"
    button = "all_outages"
>}} |