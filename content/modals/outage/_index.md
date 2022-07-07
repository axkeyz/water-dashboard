---
title: "#${ variables.modal_outage.outage_id }"
date: 2022-07-08T00:34:38+12:00
draft: false
headless: true
---

Outage #${ variables.modal_outage.outage_id } is a ${ variables.modal_outage.outage_type.toLowerCase() } water outage at ${ variables.modal_outage.street }, ${ variables.modal_outage.suburb }.

It is ${ variables.modal_outage.status == true ? 'expected to complete' : 'completed on' }