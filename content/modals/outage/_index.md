---
title: "#${ variables.modal_outage.outage_id }"
date: 2022-07-08T00:34:38+12:00
draft: false
---
{{< raw_html >}}

<div class="map-wrapper">
 <div id="map" ref="map"></div>
</div>
{{< /raw_html >}}

Outage #${ variables.modal_outage.outage_id } is a ${ variables.modal_outage.outage_type.toLowerCase() } water outage at ${ variables.modal_outage.street }, ${ variables.modal_outage.suburb }, that ${ variables.modal_outage.status == true ? 'will last' : 'lasted' } about ${ variables.modal_outage.hours = getTotalHours(variables.modal_outage) } hour${ variables.modal_outage.hours > 0 ? 's' : '' }. It began on ${ createLongJSONDate(variables.modal_outage.start_date) } and ${ variables.modal_outage.status == true ? 'is expected to be fixed' : 'was fixed' } on ${ createLongJSONDate(variables.modal_outage.end_date) }.

| Key | Description |
| ----------- | ----------- |
| Outage ID | ${ variables.modal_outage.outage_id } |
| Street | ${ variables.modal_outage.street } |
| Suburb | ${ variables.modal_outage.suburb } |
| Status | ${ variables.modal_outage.status ? 'Active' : 'Inactive' } |
| Type | ${ variables.modal_outage.outage_type } |
| Start Date | ${ shortenJSONDate(variables.modal_outage.start_date) } |
| Start Time | ${ findJSONDateTime(variables.modal_outage.start_date) } |
| End Date | ${ shortenJSONDate(variables.modal_outage.end_date) } |
| End Time | ${ findJSONDateTime(variables.modal_outage.end_date) } |
| Total Hours | ${ variables.modal_outage.hours } |