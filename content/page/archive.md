---
title: "Archive"
date: 2022-06-19T22:05:57+12:00
draft: false
type: archive

tables:
    All outages (since November 2021):
        pagination: variables.all_outages.count
        template: cards/table.html
        variable: all_outages
        variable_params: "&sort=end_date desc"
        key_renaming: true
        item_limit: 50
        keys:
            - id: outage_id
            - street: street
            - suburb: suburb
            - status:
                compare_array: current_outages
                id_array: current_outage_ids
                if_true: active
                if_false: inactive
                values:
                    true: light-orange-bg
                    false: light-gray-bg
            - type:
                mapping: outage_type
                values:
                    planned: light-green-bg
                    unplanned: light-pink-bg
            - start_date: start_date
            - start_time: start_date
            - end_date: end_date
            - end_time: end_date
            # - estimated_work:
            #     calculate: findTimeDifference
            #     params:
            #         - end_date
            #         - start_date
            #     max: end_date
            #     min: start_date
            # - estimated_work:
            #     calculate: roundHours
            #     params:
            #         - tablevalue['total_hours']
            #         - 2
        # enable_search:
        #     placeholder: Search by ID, street or suburb...
        #     function: getAllOutages
        #     modifier: 'limit='+{{ .TableValues.item_limit }}+'&sort=outage_id%20asc'
        enable_search:
            placeholder: Search by ID, street or suburb...
            function: getAllOutages
            reset_function: resetPageAndOffsets

---