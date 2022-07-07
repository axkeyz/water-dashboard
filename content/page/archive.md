---
title: "Archive"
date: 2022-06-19T22:05:57+12:00
draft: false
type: archive

tables:
    All outages:
        pagination: variables.all_outages.count
        template: cards/table.html
        variable: all_outages
        variable_params: "&sort=end_date desc"
        key_renaming: true
        item_limit: 50
        data:
            - id:
                mapping: outage_id
            - street:
                mapping: street
            - suburb:
                mapping: suburb
            - status:
                mapping: status
                class: rounded-label
                boolean_class:
                    true:
                        mapping: active
                        value: true
                        class: light-orange-bg
                    false:
                        mapping: inactive
                        value: false
                        class: light-gray-bg
            - type:
                mapping: outage_type
                class: rounded-label
                boolean_class:
                    true:
                        mapping: planned
                        value: planned
                        class: light-green-bg
                    false:
                        mapping: unplanned
                        value: unplanned
                        class: light-pink-bg
            - start_date:
                mapping: start_date
                function: shortenJSONDate
            - start_time:
                mapping: start_date
                function: findJSONDateTime
            - end_date:
                mapping: end_date
                function: shortenJSONDate
            - end_time:
                mapping: end_date
                function: findJSONDateTime
        enable_search:
            placeholder: Search by ID, street or suburb...
            function: getAllOutages

---