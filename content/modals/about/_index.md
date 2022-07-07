---
title: "Details about this water outage project"
date: 2022-06-19T22:04:38+12:00
draft: false
---

#### Disclaimer

First and foremost, this is not official! 

The views and opinions of the author expressed on this website do not reflect official agencies and organisations in any manner. As such, the content of this website should not be used as a substitute for official sources.

#### About this site and data inconsistencies

This started off as a silly project that hopes to prove some regions in Auckland get more water outages than others. (I swear I don't live that rurally!)

Unfortunately there is no public API for previous water outages (at least not to my knowledge), so the data collected by this is largely incomplete. The Watercare Outage API also seems to have some inaccurate data entry, leading to some funky results at times.

Total estimated hours of worked is generally assumed to be the hour difference between the start and end dated times. For long "planned outages", the hour formula used is `time difference in days * 2.85`, i.e. assuming an average of 2.85 hours are worked every day during a planned outage. This is certainly not an accurate formula, but it is hard to factor in non-working weekends/public holidays, planned outages that are only active during the morning/certain time frame and actual productivity hours.

I started collecting data around November 9, 2021 and data is automatically collected every 1 hour.

But anyway, someday, I'll prove that we get too many water outages! Maybe!

#### Build notes & credits

I always like to make a note of all the frameworks and references I use to build my websites.

The code is hosted at: https://github.com/axkeyz/water-dashboard

##### Frameworks
- Hugo: Static site generator/headless/CMS @ https://gohugo.io/
- VueJS (CDN): Javascript framework @ https://v2.vuejs.org/
- ApexCharts: Javascript charts @ https://apexcharts.com/

##### UI/Design
- SVG logos: https://heroicons.com/
- Lato as a font: https://fonts.google.com/specimen/Lato
- Colour palette: https://coolors.co/141b41-306bac-6f9ceb-98b9f2-918ef4

##### APIs
- My Water API: This extracts data from Watercare Outage API and basically saves a copy of every outage every hour, is built with Go and hosted in a Docker container on a free Oracle server. The code base is @ https://github.com/axkeyz/water-api
- Watercare Outage API (indirectly used by my water API): This is a non-advertised API that only shows current water outages (though you can find it from the outage network activity of their website), so I won't be putting it here.
- Watercare Pipe API: This is an API that shows some of the water pipes of the Auckland water network. Explore it @ https://data-watercare.opendata.arcgis.com/datasets/Watercare::water-pipe/explore
- Google Maps Javascript API: Locations are always easy to see with a good map! Documentation @ https://developers.google.com/maps/documentation/javascript