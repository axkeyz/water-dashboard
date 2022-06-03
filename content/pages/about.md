---
title: "About this site"
date: 2022-06-03T14:59:58+12:00
draft: true
---

## Disclaimer

First and foremost, this is not official! 

The views and opinions of the author expressed on this website do not reflect official agencies and organisations in any manner. As such, the content of this website should not be used as a substitute for official sources.

## About this site

This started off as a silly project that hopes to prove some regions in Auckland get more water outages than others. (I swear I don't live that rurally!)

Unfortunately there is no public API for previous water outages (at least not to my knowledge), so the data collected by this is largely incomplete. The Watercare Outage API also seems to have some inaccurate data entry, leading to some funky results at times. I started collecting data around November 2021.

But anyway, someday, I'll prove that we get too many water outages! Maybe!

## Build notes & credits

I always like to make a note of all the frameworks and references I use to build my websites.

The code is hosted at: https://github.com/axkeyz/water-dashboard

### Frameworks
- Hugo (static site generator)
- VueJS (CDN)

### UI
- Overall design heavily inspired by: https://betterprogramming.pub/build-a-responsive-modern-dashboard-layout-with-css-grid-and-flexbox-bd343776a97e
- SVG logos: https://heroicons.com/
- Lato as a font: https://fonts.google.com/specimen/Lato
- Colour palette: https://coolors.co/141b41-306bac-6f9ceb-98b9f2-918ef4


### APIs
- My Water API (extracting data from Watercare Outage API, built with Go): https://github.com/axkeyz/water-api