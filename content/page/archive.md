---
title: "Archive"
date: 2022-06-19T22:05:57+12:00
draft: false
type: archive

tables:
    All outages:
        modal: /modals/outage
        pagination: variables.all_outages.count
        template: tables/table.html
        variable: all_outages
        variable_params: "&sort=end_date desc"
        key_renaming: true
        item_limit: 50
        data:
            - id:
                mapping: outage_id
                cell_class: desktop-only
                trigger_modal:
                    variable: modal_outage
                    click_function: ReinitaliseMapFromLocationString(variables.modal_outage.location)
            - street:
                mapping: street
                cell_class: desktop-only
            - suburb:
                mapping: suburb
                cell_class: desktop-only
            - status:
                mapping: status
                cell_class: desktop-only
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
                cell_class: desktop-only
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
                cell_class: desktop-only
            - start_time:
                mapping: start_date
                function: findJSONDateTime
                cell_class: larger-desktop-only
            - end_date:
                mapping: end_date
                function: shortenJSONDate
                cell_class: desktop-only
            - end_time:
                mapping: end_date
                function: findJSONDateTime
                cell_class: larger-desktop-only
            - outage:
                cell_class: mobile-only
                trigger_modal:
                    variable: modal_outage
                    click_function: ReinitaliseMapFromLocationString(variables.modal_outage.location)
                html:
                    - id:
                        mapping: outage_id
                        post_text: " — "
                        class: inline-outage-label font-bold 
                    - street:
                        mapping: street
                        post_text: " — "
                        class: inline-outage-label font-bold 
                    - suburb:
                        mapping: suburb
                        class: inline-outage-label font-bold 
                        force_line_break: true
                    - start_date:
                        mapping: start_date
                        function: shortenJSONDate
                        class: inline-outage-label
                    - start_time:
                        mapping: start_date
                        function: findJSONDateTime
                        class: inline-outage-label
                    - end_date:
                        pre_text: " — "
                        mapping: end_date
                        function: shortenJSONDate
                        class: inline-outage-label
                    - end_time:
                        mapping: end_date
                        function: findJSONDateTime
                        class: inline-outage-label
                        force_line_break: true
                    - status:
                        mapping: status
                        class: rounded-label inline-outage-label
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
                        class: rounded-label inline-outage-label
                        boolean_class:
                            true:
                                mapping: planned
                                value: planned
                                class: light-green-bg
                            false:
                                mapping: unplanned
                                value: unplanned
                                class: light-pink-bg

        enable_search:
            placeholder: Search by ID, street or suburb...
            function: getAllOutages

---