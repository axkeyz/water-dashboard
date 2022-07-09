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

Outage #${ variables.modal_outage.outage_id } is a ${ variables.modal_outage.outage_type.toLowerCase() } water outage at ${ variables.modal_outage.street }, ${ variables.modal_outage.suburb }.

The outage began on ${ createLongJSONDate(variables.modal_outage.start_date) }. It ${ variables.modal_outage.status == true ? 'is expected to be fixed' : 'was fixed' } on ${ createLongJSONDate(variables.modal_outage.end_date) }.

${ Math.abs( (new Date(variables.modal_outage.end_date)) - (new Date(variables.modal_outage.start_date))) / 36e5 }